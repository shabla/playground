import React from "react";
import classNames from "classnames";

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
  items: PageNavigationItem[];
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  items = []
}) => {
  return (
    <div className="page-navigation">
      <Row className="container">
        {items.map((item, index) => {
          const itemElement = (
            <div
              key={item.key || index}
              className={classNames("page-navigation--item", {
                selected: item.selected
              })}
              onClick={item.onClick}
            >
              {item.label}
            </div>
          )

          return item.to ? (
            <Link key={item.key || index} to={item.to}>{itemElement}</Link>
          ) : itemElement;
        })}
      </Row>
    </div>
  )
}