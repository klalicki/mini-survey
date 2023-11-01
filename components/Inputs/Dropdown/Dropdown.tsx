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
    <div className="flex flex-col gap-0 items-start">
      <label className="text-sm" htmlFor={formId}>
        {label}
      </label>
      <select
        className="border border-accentA-300 border-2 p-1 min-w-[5rem]"
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
