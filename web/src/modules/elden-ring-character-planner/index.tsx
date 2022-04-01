import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { PlannerPage } from "./pages/PlannerPage"

export const config: ModuleConfig = {
  name: 'elden-ring-planner',
  path: 'character-planner',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/character-planner', label: 'Character Planner' });

export const routes = (
  <Route
    path={config.path}
    element={<PlannerPage />}
  />
);