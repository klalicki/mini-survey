import { getUID } from "@/utils/uid";
import { useState, useRef, ChangeEvent } from "react";

export const TextInputLabeled = ({
  placeholder,
  value,
  labelText,
  updateFn,
}) => {
  const inputID = useRef(getUID()).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFn(e.target.value);
  };
  return (
    <div className="text-input-labeled">
      <label htmlFor={inputID}>{labelText}</label>
      <input
        type="text"
        id={inputID}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
