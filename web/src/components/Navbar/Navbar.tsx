import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components";
import { apolloClient } from "@/apollo-setup";
import { useLogoutMutation } from "@/generated/graphql";

import "./Navbar.scss"

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    apolloClient.clearStore();
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/ecs")}>ECS</Button>
        <Button onClick={() => navigate("/dialog")}>Dialog</Button>
        <Button onClick={() => navigate("/atlas")}>Atlas</Button>
        <Button onClick={() => navigate("/dice-roller")}>Dice Roller</Button>
        <Button onClick={() => navigate("/holo-news")}>Holo News</Button>
      </div>

      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};