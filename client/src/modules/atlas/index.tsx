import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { AtlasPage } from "./pages/AtlasPage"

export const config: ModuleConfig = {
  name: 'atlas',
  path: 'atlas',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/atlas', label: 'Atlas' });

export const routes = (
  <Route path={config.path} element={< AtlasPage />} />
)