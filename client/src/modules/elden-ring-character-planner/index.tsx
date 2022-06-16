import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { PlannerPage } from "./pages/PlannerPage"

export const config: ModuleConfig = {
  name: 'elden-ring-planner',
  path: 'character-planner',
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={<PlannerPage />} />
  ))
  appConfig.registerNavbarItem('left', { to: '/character-planner', label: 'Character Planner' });
}