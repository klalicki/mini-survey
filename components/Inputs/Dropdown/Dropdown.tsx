import { getUID } from "@/utils/uid";
import { useRef } from "react";

type DropdownProps<T> = {
  items: T[]; // replace `any` with the type of your items
  label: string;
  value: string | number;
  name: string;
  onChange: (value: string) => void;
  getIDFromItem: (item: T) => string; // replace `any` with the type of your items
  getLabelFromItem: (item: T) => string; // replace `any` with the type of your items
};

export const Dropdown = ({
  items,
  label,
  value,
  name,
  onChange,
  getIDFromItem,
  getLabelFromItem,
}: DropdownProps<any>) => {
  const formId = `${name}-${useRef(getUID()).current}`;
  return (
    <div className="dropdown-labeled">
      <label htmlFor={formId}>{label}</label>
      <select
        defaultValue={value}
        name={name}
        id={formId}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {items.map((item) => {
          return (
            <option key={getIDFromItem(item)} value={getIDFromItem(item)}>
              {getLabelFromItem(item)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
