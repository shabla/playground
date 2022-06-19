import React from "react";
import { useNavigate } from "react-router-dom";

import appConfig, { NavbarLink } from "@/appConfig";
import { Button, Row } from "@/components";

import "./Navbar.scss"

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const generateElements = (items: NavbarLink[], side: string): React.ReactNode => {
    return items.map((item, index) => {
      if (item.element) {
        return (
          <React.Fragment key={`${side}-${index}`}>
            {item.element}
          </React.Fragment>
        )
      }

      if (item.to) {
        return (
          <Button key={`${side}-${index}`} onClick={() => navigate(item.to as string)} disabled={item.disabled}>
            {item.label}
          </Button>
        )
      }

      return null;
    })
  }

  return (
    <Row className="navbar" align="space-between center">
      <Row gap={8}>
        {generateElements(appConfig.getNavbarItems('left'), 'left')}
      </Row>

      <Row gap={8}>
        {generateElements(appConfig.getNavbarItems('right'), 'right')}
      </Row>
    </Row>
  );
};