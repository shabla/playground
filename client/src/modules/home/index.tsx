import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { HomePage } from "./pages/HomePage"

export const config: ModuleConfig = {
  name: 'home',
  showNavbar: false,
  path: '/',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: config.path, label: 'Home' });

export const routes = (
  <Route path={config.path} element={< HomePage />} />
)