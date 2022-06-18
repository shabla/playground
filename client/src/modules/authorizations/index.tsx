import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { SummaryPage } from "./pages/SummaryPage"

export interface AuthModuleConfig extends ModuleConfig {

}

export const config: AuthModuleConfig = {
  name: 'auth',
  path: 'auth'
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <>
      <Route path={`${config.path}`} element={< SummaryPage />} />
    </>
  ))
  appConfig.registerNavbarItem('left', { to: config.path, label: 'Auth' });
}