import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { DiceRollerPage } from "./pages/DiceRollerPage"

interface DiceRollerModule extends ModuleConfig {
  // specific module settings here
}

export const config: DiceRollerModule = {
  name: 'dice-roller',
  path: 'dice-roller',
  navbar: [
    { to: '/dice-roller', label: 'Dice Roller', side: 'left' }
  ]
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< DiceRollerPage />} />
  ))
}