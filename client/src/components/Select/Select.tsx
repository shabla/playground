import React from "react";
import classNames from "classnames";

import "./Select.scss";

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: React.HTMLProps<HTMLOptionElement>[]
}

export const Select: React.FC<SelectProps> = ({ className, options, ...props }) => {
  return (
    <select className={classNames("select", className)} {...props}>
      {options.map((option, index) => (
        <option key={option.key || index} {...option} />
      ))}
    </select>
  )
};