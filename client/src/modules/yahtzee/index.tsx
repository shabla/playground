import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { YahtzeePage } from "./pages/YahtzeePage"

export const config: ModuleConfig = {
  name: 'yahtzee',
  path: '/yahtzee',
  enabled: false
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< YahtzeePage />} />
  ))
  appConfig.registerNavbarItem('left', { to: config.path, label: 'Yahtzee' });
}