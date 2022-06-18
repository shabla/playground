import React from "react";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";

import "./Link.scss";

export type LinkProps = Partial<RRDLinkProps>;

export const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  if (to) {
    return (
      <RRDLink to={to} {...props}>
        {children}
      </RRDLink>
    );
  } else {
    return <a {...props}>{children}</a>;
  }
};
