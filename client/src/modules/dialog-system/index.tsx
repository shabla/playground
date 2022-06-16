import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { DialogSystemPage } from "./pages/DialogSystemPage"

interface DialogSystemModule extends ModuleConfig {
  // specific module settings here
}

export const config: DialogSystemModule = {
  name: 'dialog-system',
  path: 'dialog-system',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/dialog-system', label: 'Dialog System' });

export const routes = (
  <Route path={config.path} element={< DialogSystemPage />} />
)
