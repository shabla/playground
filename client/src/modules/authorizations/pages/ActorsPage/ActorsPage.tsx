import React, { useState } from "react";
import classNames from "classnames";

import {
  Page,
  TextField,
  Table,
  Dialog
} from "@/components";
import { useDialogState } from "@/hooks";

import { columns } from "./actors-columns";
import { actors } from "./mock-data";

export const ActorsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const createFormDialog = useDialogState();

  return (
    <Page
      title="Actors"
      className="actors-page"
      showNavbar={false}
    >
      <Dialog
        isOpen={createFormDialog.isOpen}
        title="Create Actor"
        close={createFormDialog.close}
      >
        content be here
      </Dialog>

      <Table
        data={actors}
        columns={columns}
        rowKey="id"
        tableHeader={<TextField onChange={setFilter} placeholder="Filter" />}
        filterFn={row => row.name.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())}
      />
    </Page>
  )
}