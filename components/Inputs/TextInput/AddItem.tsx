import { Add } from "@mui/icons-material";
import { useRef, useState } from "react";

const AddItem = ({
  onChange,
  placeholder,
}: {
  onChange: Function;
  placeholder?: string;
}) => {
  const [tempVal, setTempVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="p-3 group hover:bg-accentA-100 focus-within:bg-accentA-100 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // pass the value up to parent component
        onChange(tempVal);
        // reset the form to blank
        setTempVal("");
        // reset focus to input to allow user to continue adding items
        inputRef.current?.focus();
      }}
    >
      <input
        ref={inputRef}
        className="p-2 border-2 border-accentA-100"
        type="text"
        value={tempVal}
        size={tempVal.length}
        placeholder={placeholder}
        onChange={(e) => {
          setTempVal(e.target.value);
        }}
      />
      <button className={"btn-standard"} type="submit">
        <Add />
      </button>
    </form>
  );
};
export default AddItem;
