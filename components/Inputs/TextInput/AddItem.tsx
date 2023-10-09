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
      className="text-input"
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
        type="text"
        value={tempVal}
        placeholder={placeholder}
        onChange={(e) => {
          setTempVal(e.target.value);
        }}
      />
      <button type="submit">
        <Add />
      </button>
    </form>
  );
};
export default AddItem;
