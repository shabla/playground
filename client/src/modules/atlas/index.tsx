import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { AtlasPage } from "./pages/AtlasPage"

export const config: ModuleConfig = {
  name: 'atlas',
  path: 'atlas',
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< AtlasPage />} />
  ))
  appConfig.registerNavbarItem('left', { to: '/atlas', label: 'Atlas' });
}