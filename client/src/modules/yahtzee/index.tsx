import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { YahtzeePage } from "./pages/YahtzeePage"

export const config: ModuleConfig = {
  name: 'yahtzee',
  path: '/yahtzee',
  enabled: false,
  navbar: [
    { to: '/yahtzee', label: 'Yahtzee', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< YahtzeePage />} />
  ))
}