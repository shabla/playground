import { Route, Navigate } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { AuthorizationsPage } from "./pages/AuthorizationsPage"
import { ActorsPage } from "./pages/ActorsPage/ActorsPage";
import { GroupsPage } from "./pages/GroupsPage/GroupsPage";
import { ActionsPage } from "./pages/ActionsPage/ActionsPage";
import { RolesPage } from "./pages/RolesPage/RolesPage";
import { PermissionsPage } from "./pages/PermissionsPage/PermissionsPage";

export interface AuthModuleConfig extends ModuleConfig {

}

export const config: AuthModuleConfig = {
  name: 'authorizations',
  path: '/authorizations',
  navbar: [
    { to: '/authorizations', label: 'Authorizations', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <>
      <Route path={config.path} element={<AuthorizationsPage />}>
        <Route index element={<Navigate to="actors" />} />
        <Route path="actors" element={<ActorsPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="actions" element={<ActionsPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="*" element={<Navigate to="actors" />} />
      </Route>
    </>
  ))
}