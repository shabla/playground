import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { DiceRollerPage } from "./pages/DiceRollerPage"

interface DiceRollerModule extends ModuleConfig {
  // specific module settings here
}

export const config: DiceRollerModule = {
  name: 'dice-roller',
  path: 'dice-roller',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/dice-roller', label: 'Dice Roller' });

export const routes = (
  <Route path={config.path} element={< DiceRollerPage />} />
)