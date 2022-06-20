import React from "react";

export interface TableColumn<T> {
  key?: string;
  label?: string;
  sortable?: boolean;
  fitWidthToContent?: boolean;
  reducePadding?: boolean;
  sortFn?: (a: any, b: any) => number;
  data?: (row: T) => any;
  cellRenderer?: (row: T, data: any) => React.ReactNode;
}