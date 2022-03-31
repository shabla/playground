import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// import { LoginPage } from "@/pages/LoginPage";
// import { RegisterPage } from "@/pages/RegisterPage";
// import { ECSPage } from "@/pages/ECSPage";
// import { AtlasPage } from "@/modules/atlas";
// import { DiceRollerPage } from "@/modules/dice-roller";
// import { DialogViewerPage } from "@/modules/dialog-system/pages/DialogViewerPage";
// import { HoloNews } from "@/modules/holo-news"
import { routes as AuthModuleRoutes } from "@/modules/auth";
import { routes as HomeModuleRoutes } from "@/modules/home";
import { setAccessToken, isLoggedIn } from "@/store";

import "./App.scss"

// add all the solid icons
library.add(fas);

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:4444/refresh_token", {
      credentials: "include",
      method: "POST",
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.ok) {
          setAccessToken(json.accessToken);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        {AuthModuleRoutes}
        {HomeModuleRoutes}

        {/* TODO: change this to redirect to login when logged out */}
        <Route path="*" element={<Navigate to={isLoggedIn() ? "/" : "/login"} />} />
      </Routes>
      {/* <Route exact path="/ecs" component={ECSPage} />
        <Route exact path="/dialog" component={DialogViewerPage} />
        <Route exact path="/atlas" component={AtlasPage} />
        <Route exact path="/dice-roller" component={DiceRollerPage} />
        <Route exact path="/holo-news" component={HoloNews} /> */}
    </div>
  );
};

export default App;
