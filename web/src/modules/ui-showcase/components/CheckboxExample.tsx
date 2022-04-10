import React from "react";
import classNames from "classnames";

import { Page, Row, Column } from "@/components";

import "./Checkbox.scss"

export interface CheckboxProps {
  className?: string;
  label?: string;

  // controlled
  checked?: boolean;

  // uncontrolled
  defaultChecked?: boolean;

  onChange?: (value: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  checked,
  defaultChecked,
  onChange
}) => {
  // const [checked, setChecked] = React.useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e)
    // console.log(e.target.checked)
    // if (checked != null) {
    //   onChange
    // }
  }

  return (
    <label className={classNames("checkbox", className)} onClick={handleClick}>
      <input type="checkbox" checked={checked} />
      <span className="indicator"></span>
      {label}
    </label>
  )
}

export const CheckboxExample: React.FC = () => {
  return (
    <Column className="p-20" style={{ background: '#ccc', height: '80vh' }}>
      <Checkbox
        label="Hello"
      />
    </Column>
  )
}