import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { ECSPage } from "./pages/ECSPage"

interface ECSModuleConfig extends ModuleConfig {
  // specific module settings here
}

export const config: ECSModuleConfig = {
  name: 'ecs',
  path: 'ecs',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/ecs', label: 'ECS' });

export const routes = (
  <Route path={config.path} element={< ECSPage />} />
)