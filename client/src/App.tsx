import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import appConfig from "./appConfig";
import { routes as DialogSystemRoutes } from "@/modules/dialog-system";
import { routes as DiceRollerRoutes } from "@/modules/dice-roller";
import { routes as AtlasRoutes } from "@/modules/atlas";
import { routes as ECSRoutes } from "@/modules/ecs";
import { routes as HoloNewsRoutes } from "@/modules/holo-news"
import { routes as UIShowcaseRoutes } from "@/modules/ui-showcase";
import { routes as AuthModuleRoutes, TokenRefresher } from "@/modules/auth";
import { routes as HomeModuleRoutes } from "@/modules/home";
import { routes as ERPlannerRoutes } from "@/modules/elden-ring-character-planner";
import { routes as YahtzeeRoutes } from "@/modules/yahtzee";
import { isLoggedIn } from "@/store";
import { Navbar } from "./components";

import "./App.scss"

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <TokenRefresher onLoaded={() => setLoading(false)} />

      {appConfig.showNavbar && <Navbar />}

      {!loading && (
        <Routes>
          {AtlasRoutes}
          {AuthModuleRoutes}
          {HomeModuleRoutes}
          {UIShowcaseRoutes}
          {ERPlannerRoutes}
          {HoloNewsRoutes}
          {ECSRoutes}
          {DiceRollerRoutes}
          {DialogSystemRoutes}
          {YahtzeeRoutes}

          {/* TODO: change this to redirect to login when logged out */}
          <Route path="*" element={<Navigate to={isLoggedIn() ? "/" : "/login"} />} />
        </Routes>
      )}
    </div>
  );
};