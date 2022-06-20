import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Column, Row, Pagination, ItemsPerPage } from "@/components";
import { TableColumn } from "./models/TableColumn";

import "./Table.scss";

export type SortDirection = 'asc' | 'desc';

export interface TableProps<T> {
  className?: string;
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  rowKey?: string | ((row: T) => string);
  itemsPerPageOptions?: number[];
  defaultSortColumnIndex?: number;
  defaultSortDirection?: SortDirection;
  filterFn?: (row: T) => boolean;
}

export const Table = <T extends {} = any>({
  className,
  data = [],
  columns = [],
  rowKey,
  loading,
  itemsPerPageOptions = [2, 5, 10, 25, 50],
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
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
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
    rows = rows.slice(currentPageIndex * itemsPerPage, currentPageIndex * itemsPerPage + itemsPerPage);

    setDisplayedRows(rows);
  }, [data, columns, sortColumnIndex, sortDirection, itemsPerPage, currentPageIndex]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const rowHeight = 40;

  return (
    <Column className={classNames("table-container", className)}>
      <Column className="table-content" style={{ height: `${itemsPerPage * rowHeight + rowHeight}px` }}>
        <table className="table">
          <thead>
            <tr style={{ height: `${rowHeight}px` }}>
              {columns.map((column, colIndex) => {
                const isSortedColumn = sortColumnIndex === colIndex;
                const isSortedAsc = sortDirection === 'asc';
                const isSortedDesc = sortDirection === 'desc';

                return (
                  <th
                    key={colIndex}
                    className={classNames({
                      sortable: column.sortable === true,
                      'fit-width-to-content': column.fitWidthToContent,
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
              const key = typeof rowKey === 'string' ? row?.[rowKey] : rowKey?.(row) || rowIndex;

              return (
                <tr key={key} style={{ height: `${rowHeight}px` }}>
                  {columns.map((column, colIndex) => {
                    const value = column.data?.(row);
                    const node = column.cellRenderer?.(row, value) || value;

                    return (
                      <td
                        key={colIndex}
                        className={classNames({
                          'fit-width-to-content': column.fitWidthToContent,
                          'reduce-padding': column.reducePadding,
                        })}
                      >
                        {node}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        {loading && (
          <Column className="table__loading-spinner" grow={1} align="center center">
            <FontAwesomeIcon icon="spinner" />
          </Column>
        )}

        {!loading && displayedRows.length === 0 && (
          <Column className="table__empty" align="center center" grow={1}>
            No items
          </Column>
        )}
      </Column>

      <Row align="space-between end" className="table-footer">
        <Row align="start center">
          <ItemsPerPage
            value={itemsPerPage}
            items={itemsPerPageOptions}
            disabled={loading}
            onChange={value => {
              setItemsPerPage(value);
              setCurrentPageIndex(0);
            }}
          />

          <div className="ml-10">
            Showing <b className="mx-5">{(currentPageIndex * itemsPerPage) + 1} to {Math.min((currentPageIndex * itemsPerPage) + itemsPerPage, data.length)}</b>of<b className="ml-5">{data.length}</b> rows
          </div>
        </Row>

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPageIndex}
            totalItems={data.length}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPageIndex}
          />
        )}
      </Row>
    </Column>
  )
}