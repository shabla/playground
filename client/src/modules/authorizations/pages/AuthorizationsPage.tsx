import React from "react";
import { Outlet } from "react-router-dom";

import {
  Page,
  PageNavigation,
} from "@/components";

export const AuthorizationsPage: React.FC = () => {
  return (
    <Page
      className="authorizations-page"
      withContainer={false}
      noPadding
    >
      <PageNavigation
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