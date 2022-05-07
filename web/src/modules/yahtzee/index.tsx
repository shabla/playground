import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { YahtzeePage } from "./pages/YahtzeePage"

export const config: ModuleConfig = {
  name: 'yahtzee',
  path: '/yahtzee',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: config.path, label: 'Yahtzee' });

export const routes = (
  <Route path={config.path} element={< YahtzeePage />} />
)