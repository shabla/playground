import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { SummaryPage } from "./pages/SummaryPage"

export interface AuthModuleConfig extends ModuleConfig {

}

export const config: AuthModuleConfig = {
  name: 'authorizations',
  path: '/authorizations',
  navbar: [
    { to: '/authorizations', label: 'Auth', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <>
      <Route path={`${config.path}`} element={< SummaryPage />} />
    </>
  ))
}