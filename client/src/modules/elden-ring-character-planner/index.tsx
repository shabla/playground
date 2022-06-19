import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { PlannerPage } from "./pages/PlannerPage"

export const config: ModuleConfig = {
  name: 'elden-ring-planner',
  path: 'character-planner',
  navbar: [
    { to: '/character-planner', label: 'Character Planner', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={<PlannerPage />} />
  ))
}