import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import appConfig from "./appConfig";
import { init as initDialogSystemModule } from "@/modules/dialog-system";
import { init as initDiceRollerModule } from "@/modules/dice-roller";
import { init as initAtlasModule } from "@/modules/atlas";
import { init as initECSModule } from "@/modules/ecs";
import { init as initUIShowcaseModule } from "@/modules/ui-showcase";
import { init as initAuthModule, TokenRefresher } from "@/modules/auth";
import { init as initHomeModule } from "@/modules/home";
import { init as initERPlannerModule } from "@/modules/elden-ring-character-planner";
import { init as initYahtzeeModule } from "@/modules/yahtzee";
import { isLoggedIn } from "@/store";
import { Navbar } from "./components";

import "./App.scss"

initAtlasModule();
initAuthModule();
initDialogSystemModule();
initDiceRollerModule();
initECSModule();
initERPlannerModule();
initHomeModule();
initUIShowcaseModule();
initYahtzeeModule();

export const App: React.FC = () => {
  return (
    <div className="App">
      <TokenRefresher />

      {appConfig.showNavbar && <Navbar />}

      <Routes>
        {appConfig.moduleRoutes.map(obj => (
          <React.Fragment key={obj.name}>{obj.routes}</React.Fragment>
        ))}

        {/* TODO: change this to redirect to login when logged out */}
        <Route path="*" element={<Navigate to={isLoggedIn() ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
};