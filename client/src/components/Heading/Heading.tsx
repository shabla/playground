import React from "react";
import classnames from "classnames";

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  tag?: keyof JSX.IntrinsicElements;
  inline?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  tag = "div",
  children,
  className,
  inline,
  ...props
}) => {
  return React.createElement(tag, {
    className: classnames("heading", {
      "mb-3": !inline,
      "inline-block": inline
    }, className),
    ...props
  }, children);
};
