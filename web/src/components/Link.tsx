import classnames from "classnames";
import React from "react";
import { Link as RRDLink, LinkProps as RRDLinkProps } from "react-router-dom";

export type LinkProps = Partial<RRDLinkProps>;

export const Link: React.FC<LinkProps> = ({ to, ...props }) => {
    props.className = classnames("Link", "text-indigo-500", props.className);

    if (to) {
        return <RRDLink to={to} {...props} />;
    } else {
        return <a {...props} />;
    }
};

export default Link;
