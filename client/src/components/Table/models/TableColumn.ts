export interface TableColumn<T> {
  key?: string;
  label?: string;
  sortable?: boolean;
  sortFn?: (a: any, b: any) => number;
  data?: (row: T) => any;
}