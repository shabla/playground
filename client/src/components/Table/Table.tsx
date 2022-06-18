import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Column, Row, Pagination, ItemsPerPage } from "@/components";

import "./Table.scss";

export type SortDirection = 'asc' | 'desc';

export interface TableProps<T> {
  className?: string;
  data: T[];
  columns: TableColumn<T>[];
  rowKey?: string | ((row: T) => string);
  defaultSortColumnIndex?: number;
  defaultSortDirection?: SortDirection;
  filterFn?: (row: T) => boolean;
}

export interface TableColumn<T> {
  key?: string;
  label?: string;
  sortable?: boolean;
  sortFn?: (a: any, b: any) => number;
  data?: (row: T) => any;
}

export const Table = <T extends {} = any>({
  className,
  data = [],
  columns = [],
  rowKey,
  defaultSortColumnIndex,
  defaultSortDirection,
  filterFn,
}: TableProps<T>) => {
  const [sortColumnIndex, setSortColumnIndex] = useState<number | undefined>(defaultSortColumnIndex);
  const [sortDirection, setSortDirection] = useState<SortDirection | undefined>(
    defaultSortDirection ?? (
      defaultSortColumnIndex != null && defaultSortColumnIndex < columns?.length ? 'asc' : undefined
    )
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(2);
  const [displayedRows, setDisplayedRows] = useState<T[]>([]);

  useEffect(() => {
    let rows: T[] = data;

    // Filtering
    if (filterFn) {
      rows = rows.filter(filterFn);
    }

    // Sorting
    if (sortColumnIndex !== undefined) {
      const defaultSortFn = (a: any, b: any) => {
        const valueA = columns[sortColumnIndex].data?.(a);
        const valueB = columns[sortColumnIndex].data?.(b);

        let res;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          res = valueA.localeCompare(valueB);
        } else {
          res = valueA - valueB;
        }

        if (sortDirection === 'desc') {
          res = -res;
        }

        return res;
      };

      let colSortFn = columns[sortColumnIndex]?.sortFn || defaultSortFn;

      rows = rows.sort(colSortFn);
    }

    // Pagination
    rows = rows.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

    setDisplayedRows(rows);
  }, [data, columns, sortColumnIndex, sortDirection, itemsPerPage, currentPage]);

  return (
    <Column className={classNames("table-container", className)}>

      <div className="table-content">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, colIndex) => {
                const isSortedColumn = sortColumnIndex === colIndex;
                const isSortedAsc = sortDirection === 'asc';
                const isSortedDesc = sortDirection === 'asc';

                return (
                  <th
                    key={colIndex}
                    className={classNames({
                      sortable: column.sortable === true
                    })}
                    onClick={column.sortable ? () => {
                      const isNewSortColumn = colIndex !== sortColumnIndex;
                      setSortColumnIndex(colIndex);
                      setSortDirection(dir => dir === 'desc' || isNewSortColumn ? 'asc' : 'desc');
                    } : undefined}
                  >
                    <div>
                      {column.label}
                      {column.sortable === true && (
                        <FontAwesomeIcon icon={
                          isSortedColumn
                            ? (isSortedAsc ? "sort-up" : isSortedDesc ? 'sort-down' : 'sort')
                            : "sort"
                        }
                        />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {displayedRows.map((row: any, rowIndex) => {
              const key = typeof rowKey === 'string' ? row?.[rowKey] : rowKey?.(row);

              return (
                <tr key={key}>
                  {columns.map((column, colIndex) => {
                    return (
                      <td key={colIndex}>{column.data?.(row)}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Row align="space-between end" className="mt-10">
        <ItemsPerPage
          value={itemsPerPage}
          items={[2, 5, 10, 50]}
          onChange={setItemsPerPage}
        />

        <Pagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onSetPage={setCurrentPage}
        />
      </Row>
    </Column>
  )
}