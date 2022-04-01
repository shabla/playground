import React from "react";
import { Button } from "@/components"
import { useNavigate } from "react-router-dom";
import { apolloClient } from "@/apollo-setup";
import { useLogoutMutation } from "@/generated/graphql";

export interface NavbarLogoutButtonProps {
  redirectPath?: string;
}

export const NavbarLogoutButton: React.FC<NavbarLogoutButtonProps> = ({ redirectPath }) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    apolloClient.clearStore();

    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>
}