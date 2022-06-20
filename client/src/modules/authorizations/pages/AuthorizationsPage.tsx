import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Page,
  PageHeader,
  PageNavigation,
} from "@/components";
import { config } from "../index"

export const AuthorizationsPage: React.FC = () => {
  const [pageHeader, setPageHeader] = useState<React.ReactNode>();

  return (
    <Page
      className="authorizations-page"
      withContainer={false}
      noPadding
      header={<PageHeader heading="Authorizations Summary" />}
    >
      <PageNavigation
        pathPrefix={config.path}
        items={[
          { label: 'Actors', to: 'actors' },
          { label: 'Groups', to: 'groups' },
          { label: 'Actions', to: 'actions' },
          { label: 'Roles', to: 'roles' },
          { label: 'Permissions', to: 'permissions' },
        ]}
      />
      <Outlet />
    </Page>
  )
}