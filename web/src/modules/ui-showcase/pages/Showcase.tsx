import React from "react";
import { Outlet } from "react-router-dom";

import { config } from ".."
import { Page } from "@/components";
import { SideBar } from "../components/SideBar/SideBar";

export const Showcase: React.FC = () => {
  return (
    <Page title="UI Showcase">
      <SideBar rootPath={config.path!} />
      <Outlet />
    </Page>
  );
};