import { Route } from "react-router-dom"

import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

export const routes = <>
  <Route path="/login" element={< LoginPage />} />
  <Route path="/register" element={< RegisterPage />} />
</>