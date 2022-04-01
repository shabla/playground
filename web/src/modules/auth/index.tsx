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

appConfig.registerModule(config)
appConfig.registerNavbarItem('right', {
  element: <NavbarLogoutButton redirectPath={config.paths?.login} />
})

export const routes = (
  <>
    <Route path={config.paths?.login} element={< LoginPage />} />
    <Route path={config.paths?.register} element={< RegisterPage />} />
  </>
)

export { TokenRefresher } from "./components/TokenRefresher"