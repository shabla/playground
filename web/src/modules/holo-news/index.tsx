import { Route } from "react-router-dom"

import appConfig, { ModuleConfig } from "@/appConfig"
import { HoloNewsPage } from "./pages/HoloNewsPage"

interface HoloNewsModule extends ModuleConfig {
  // specific module settings here
}

export const config: HoloNewsModule = {
  name: 'holo-news',
  path: 'holo-news',
};

appConfig.registerModule(config)
appConfig.registerNavbarItem('left', { to: '/holo-news', label: 'Holo News' });

export const routes = (
  <Route path={config.path} element={< HoloNewsPage />} />
)