import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { ECSPage } from "./pages/ECSPage"

interface ECSModuleConfig extends ModuleConfig {
  // specific module settings here
}

export const config: ECSModuleConfig = {
  name: 'ecs',
  path: 'ecs',
  navbar: [
    { to: '/ecs', label: 'ECS', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< ECSPage />} />
  ))
}