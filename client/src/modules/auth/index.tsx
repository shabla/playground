import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { NavbarLogoutButton } from "./components/NavbarLogoutButton"

export const config: ModuleConfig = {
  name: 'auth',
  paths: {
    login: '/login',
    register: '/register'
  }
};

export { TokenRefresher } from "./components/TokenRefresher"

export const init = (): void => {
  appConfig.registerModule(config, (
    <>
      <Route path={config.paths?.login} element={< LoginPage />} />
      <Route path={config.paths?.register} element={< RegisterPage />} />
    </>
  ))
  appConfig.registerNavbarItem('right', {
    element: <NavbarLogoutButton redirectPath={config.paths?.login} />
  })
}