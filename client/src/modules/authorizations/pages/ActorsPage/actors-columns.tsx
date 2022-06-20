import { TableColumn, Button } from "@/components";
import { Actor } from "../../models/Actor";

export const columns: TableColumn<Actor>[] = [
  {
    label: 'id',
    sortable: true,
    fitWidthToContent: true,
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
    fitWidthToContent: true,
    data: (row) => String(row.active)
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

export const getActionsColumn = (
  onEdit: (actor: Actor) => void,
  onDelete: (actor: Actor) => void,
): TableColumn<Actor> => {
  return {
    label: '',
    fitWidthToContent: true,
    reducePadding: true,
    cellRenderer: (actor: Actor) => {
      return (
        <>
          <Button simple size="sm" icon="edit" onClick={e => onEdit(actor)} className="mr-1" />
          <Button simple size="sm" icon="trash" onClick={e => onDelete(actor)} />
        </>
      )
    },
  }
}