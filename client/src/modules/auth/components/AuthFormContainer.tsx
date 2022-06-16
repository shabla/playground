import React from "react";

import { Column } from "@/components";

import "./AuthFormContainer.scss"

export const AuthFormContainer: React.FC = ({ children }) => {
  return (
    <Column className="auth-form-container">{children}</Column>
  )
}