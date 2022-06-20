import React from "react";
import classNames from "classnames";
import { useMatch, NavLink } from "react-router-dom";

import { Row, Link } from "@/components";

import "./PageNavigation.scss";

export interface PageNavigationItem {
  key?: string;
  label: React.ReactNode;
  to?: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface PageNavigationProps {
  pathPrefix?: string;
  items: PageNavigationItem[];
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  items = [],
  pathPrefix
}) => {
  const match = useMatch(window.location.pathname);

  return (
    <div className="page-navigation">
      <Row className="container">
        {items.map((item, index) => {
          const selected = pathPrefix + '/' + item.to === match?.pathname;

          const itemElement = (
            <div
              key={item.key || index}
              className={classNames("page-navigation--item", {
                selected
              })}
              onClick={item.onClick}
            >
              {item.label}
            </div>
          )

          return item.to ? (
            <NavLink key={item.key || index} to={item.to}>
              {itemElement}
            </NavLink>
          ) : itemElement;
        })}
      </Row>
    </div>
  )
}