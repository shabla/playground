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

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route path={config.path} element={< DialogSystemPage />} />
  ))
  appConfig.registerNavbarItem('left', { to: '/dialog-system', label: 'Dialog System' });
}