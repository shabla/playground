import React from "react";

export interface ItemsPerPageProps {
  value: number;
  items: number[];
  onChange: (value: number) => void;
}

export const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  value,
  items = [10, 50, 100],
  onChange
}) => {
  return (
    <div className="items-per-page">
      <select value={value} onChange={e => onChange(parseInt(e.currentTarget.value, 10))}>
        {items.map(item => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}