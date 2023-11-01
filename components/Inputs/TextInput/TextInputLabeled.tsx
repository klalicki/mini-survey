import { getUID } from "@/utils/uid";
import { useState, useRef, ChangeEvent } from "react";

type TextInputLabeledProps = {
  placeholder: string;
  value: string;
  labelText: string;
  updateFn: (value: string) => void;
};

export const TextInputLabeled = ({
  placeholder,
  value,
  labelText,
  updateFn,
}: TextInputLabeledProps) => {
  const inputID = useRef(getUID()).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFn(e.target.value);
  };
  return (
    <div className="flex flex-col gap-0">
      <label className="text-sm" htmlFor={inputID}>
        {labelText}
      </label>
      <input
        type="text"
        className="p-2 border-2 border-accentA-300"
        id={inputID}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
