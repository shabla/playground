import React from "react";

import { Column, Heading } from "@/components";

import "./PageHeader.scss";

export interface PageHeaderProps {
  heading?: React.ReactNode;
  custom?: React.ReactNode;
}

// TODO: add left/right side content
export const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  custom,
  children
}) => {
  return (
    <Column className="page-header p-10">
      {custom ? custom : (
        <Column className="container" align="center start">
          <Heading>{heading}</Heading>
          {children}
        </Column>
      )}
    </Column>
  )
}