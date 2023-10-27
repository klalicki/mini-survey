import { getUID } from "@/utils/uid";

import { useRef } from "react";

/**
 * The `Select` component is a reusable React component that renders a set of radio buttons with labels
 * and allows the user to select one option.
 * @param options: An array of objects representing the available options for the select input.
 * Each object should have a `labelText` property for the display text and a `value` property for the
 * corresponding value.
 * @param title: The text to be displayed at the top of the radio button list
 * @param value The item that should be selected (string)
 * @param fieldName: a unique identifier for this instance of the Select component
 * @param handleChange: a function that is called every time the selection changes. It takes one argument: a string representing the currently selected item
 * @returns The `Select` component is being returned.
 */
const Select = ({
  options,
  title,
  value,
  fieldName,
  handleChange,
}: {
  options: Array<{ labelText: string; value: string; icon?: any }>;
  title?: string;
  value?: string;
  fieldName: string;
  handleChange?: Function;
}) => {
  const itemRef = useRef(getUID());
  return (
    <>
      <div className=" self-start">
        {title && <h3>{title}</h3>}
        <div className="flex justify-start focus-within:focus-ring gap-0">
          {options.map((item, index) => {
            return (
              <div
                key={item.value}
                className={" border border-accentA-800 text-accentA-800  "}
              >
                <input
                  className={`sr-only peer`}
                  type="radio"
                  name={fieldName + "-" + itemRef.current}
                  id={`radio-${fieldName}-${item.value}-${itemRef.current}`}
                  checked={value === item.value}
                  onChange={(e) => {
                    if (handleChange) {
                      handleChange(item.value);
                    }
                  }}
                />

                <label
                  className={
                    "flex gap-1 p-2 items-center h-full peer-checked:bg-accentA-200 peer-hover:bg-accentA-100"
                  }
                  htmlFor={`radio-${fieldName}-${item.value}-${itemRef.current}`}
                >
                  {item.icon && <item.icon />}
                  {item.labelText}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Select;
