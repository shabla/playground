import React from "react";

import { Row, Column, Heading } from "@/components";

import "./PageHeader.scss";

export interface PageHeaderProps {
  heading?: React.ReactNode;
  custom?: React.ReactNode;
  rightElement?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  custom,
  rightElement,
  children
}) => {
  return (
    <Column className="page-header p-10" align="center">
      {custom ? custom : (
        <Row className="container">
          <Column align="center start" basis={rightElement ? '50%' : undefined}>
            <Heading>{heading}</Heading>
            {children}
          </Column>

          {rightElement && <Column basis="50%" align="center end">{rightElement}</Column>}
        </Row>
      )}
    </Column>
  )
}