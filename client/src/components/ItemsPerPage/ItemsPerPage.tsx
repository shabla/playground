import React from "react";

import { Select } from "@/components";

export interface ItemsPerPageProps {
  value: number;
  items: number[];
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  value,
  disabled,
  items = [10, 50, 100],
  onChange
}) => {
  return (
    <div className="items-per-page">
      <Select
        value={value}
        disabled={disabled}
        onChange={e => onChange(parseInt(e.currentTarget.value, 10))}
        options={items.map(nb => ({ children: nb, value: nb }))}
      />
    </div>
  )
}