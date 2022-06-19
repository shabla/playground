import React from "react";
import classNames from "classnames";

import {
  Page,
  PageHeader,
  PageNavigation,
  Row,
  Column,
  Heading,
  Link,
  TextField,
  Table,
  TableColumn,
  Button,
} from "@/components";

import { Actor } from "../models/Actor"

export const SummaryPage: React.FC = () => {
  const columns: TableColumn<Actor>[] = [
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

  const data: Actor[] = [
    { id: 2, name: 'mary', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 4, name: 'sue', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 3, name: 'bob', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 1, name: 'shabla', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 5, name: 'jon', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 6, name: 'bob', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 7, name: 'shabla', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 8, name: 'jon', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 9, name: 'bob', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 10, name: 'shabla', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 11, name: 'jon', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 12, name: 'jon', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
    { id: 13, name: 'jon', active: true, created_at: new Date().toDateString(), created_by: 'admin', updated_at: '', updated_by: '', },
  ]

  const [filter, setFilter] = React.useState<string>('');

  return (
    <Page
      title="Auth Summary"
      className="summary-page"
      header={
        <PageHeader heading="Auth Summary">
          <Button className="mt-5">Create Actor</Button>
        </PageHeader>
      }
      navigation={(
        <PageNavigation items={[
          { label: 'Actors', onClick: () => console.log('actors') },
          { label: 'Groups' },
          { label: 'Actions', to: '/' },
          { label: 'Roles', selected: true },
          { label: 'Permissions' },
        ]} />
      )}
    >


      <Table
        className="mt-10"
        data={data}
        columns={columns}
        tableHeader={<TextField onChange={setFilter} placeholder="Filter" />}
        filterFn={row => row.name.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())}
      />
    </Page>
  )
}