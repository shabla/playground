import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { HomePage } from "./pages/HomePage"

export const config: ModuleConfig = {
  name: 'home',
  path: '/',
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< HomePage />} />
  ))
  appConfig.registerNavbarItem('left', { to: config.path, label: 'Home' });
}