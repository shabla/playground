import React from "react";
import classNames from "classnames";
import { useMatch, NavLink } from "react-router-dom";

import { Row, Link } from "@/components";

import "./PageNavigation.scss";

export interface PageNavigationItem {
  to: string;
  label: React.ReactNode;
  key?: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface PageNavigationProps {
  items: PageNavigationItem[];
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  items = []
}) => {
  return (
    <Row className="page-navigation" align="center">
      {items.map((item, index) => {
        return (
          <NavLink
            key={item.key || index}
            to={item.to}
            onClick={item.onClick}
            className={({ isActive }) =>
              classNames("page-navigation--item", {
                selected: isActive
              })
            }
          >
            {item.label}
          </NavLink>
        )
      })}
    </Row>
  )
}