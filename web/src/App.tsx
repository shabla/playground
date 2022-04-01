import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';

// import { LoginPage } from "@/pages/LoginPage";
// import { RegisterPage } from "@/pages/RegisterPage";
// import { ECSPage } from "@/pages/ECSPage";
// import { AtlasPage } from "@/modules/atlas";
// import { DiceRollerPage } from "@/modules/dice-roller";
// import { DialogViewerPage } from "@/modules/dialog-system/pages/DialogViewerPage";
// import { HoloNews } from "@/modules/holo-news"
import { routes as UIShowcaseRoutes } from "@/modules/ui-showcase";
import { routes as AuthModuleRoutes, TokenRefresher } from "@/modules/auth";
import { routes as HomeModuleRoutes } from "@/modules/home";
import { isLoggedIn } from "@/store";

import "./styles/index.scss";
import "./App.scss"

// add all the solid icons
library.add(fas);

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="App">
      <TokenRefresher onLoaded={() => setLoading(false)} />

      {!loading && (
        <Routes>
          {AuthModuleRoutes}
          {HomeModuleRoutes}
          {UIShowcaseRoutes}

          {/* TODO: change this to redirect to login when logged out */}
          <Route path="*" element={<Navigate to={isLoggedIn() ? "/" : "/login"} />} />
        </Routes>
      )}

      {/* <Route exact path="/ecs" component={ECSPage} />
      <Route exact path="/dialog" component={DialogViewerPage} />
      <Route exact path="/atlas" component={AtlasPage} />
      <Route exact path="/dice-roller" component={DiceRollerPage} />
      <Route exact path="/holo-news" component={HoloNews} /> */}
    </div>
  );
};