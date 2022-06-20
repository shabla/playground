import React, { useState } from "react";

import {
  Page,
  TextField,
  Table,
  Dialog,
  Button,
  PageHeader,
  FormTextField
} from "@/components";
import { useDialogState } from "@/hooks";

import { Actor } from "../../models/Actor";
import { columns, getActionsColumn } from "./actors-columns";
import { actors, } from "./mock-data";

export const ActorsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [data, setData] = useState<Actor[]>(actors);
  const [loading, setLoading] = useState<boolean>(false);
  const createFormDialog = useDialogState<Actor | undefined>();

  const reload = () => {
    setData([])
    setLoading(true)
    setTimeout(() => {
      setData(actors);
      setLoading(false)
    }, 1500)
  }

  const handleSaveActor = (actor: Partial<Actor>) => {
    console.log('save actor', actor)
    createFormDialog.close();
  }

  const handleEditActor = (actor: Actor) => {
    console.log('edit', actor);
  }

  const handleDeleteActor = (actor: Actor) => {
    console.log('delete', actor);
  }

  return (
    <Page
      title="Actors"
      className="actors-page"
      showNavbar={false}
      header={
        <PageHeader heading="Actors" rightElement={
          <Button onClick={createFormDialog.open}>Create Actor</Button>
        }>
          <Button onClick={reload}>Reload</Button>
        </PageHeader>
      }
    >
      <Dialog
        title="Create Actor"
        isOpen={createFormDialog.isOpen}
        close={createFormDialog.close}
        data={createFormDialog.data}
        actions={[
          { children: 'Cancel', intent: 'secondary', onClick: createFormDialog.close },
          { children: 'Create', intent: 'primary', onClick: e => handleSaveActor({}) },
        ]}
      >
        <FormTextField
          id="name"
          label="Name"
          required
        />
      </Dialog>

      <TextField onChange={setFilter} placeholder="Filter" className="mb-5" />

      <Table
        data={data}
        columns={[...columns, getActionsColumn(handleEditActor, handleDeleteActor)]}
        rowKey="id"
        loading={loading}
        filterFn={row => row.name.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())}
      />
    </Page>
  )
}