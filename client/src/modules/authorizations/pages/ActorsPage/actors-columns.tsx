import { TableColumn } from "@/components";
import { Actor } from "../../models/Actor";

export const columns: TableColumn<Actor>[] = [
  {
    label: 'id',
    sortable: true,
    data: (row) => row.id,
  },
  {
    label: 'name',
    sortable: true,
    data: (row) => row.name
  },
  {
    label: 'active',
    sortable: true,
    data: (row) => row.active
  },
  {
    label: 'created_at',
    sortable: true,
    data: (row) => row.created_at || '-'
  },
  {
    label: 'created_by',
    sortable: true,
    data: (row) => row.created_by || '-'
  },
  {
    label: 'updated_at',
    data: (row) => row.updated_at || '-'
  },
  {
    label: 'updated_by',
    sortable: true,
    data: (row) => row.updated_by || '-'
  },
];