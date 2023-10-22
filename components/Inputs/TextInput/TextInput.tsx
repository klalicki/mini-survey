import { Check, Edit } from "@mui/icons-material";
import { useRef, useState } from "react";
const TextInput = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: Function;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempVal(e.target.value);
  };
  return (
    <form
      className="flex text-lg"
      onSubmit={(e) => {
        e.preventDefault();
        if (isEditing) {
          // handle passing data upstream
          onChange(tempVal);
          submitButtonRef.current?.focus();
        } else {
          // set temp value
          setTempVal(value);
        }
        // flip component mode
        setIsEditing(!isEditing);
      }}
    >
      {isEditing ? (
        <input
          placeholder={placeholder}
          onBlur={(e) => {
            onChange(tempVal);
            setIsEditing(false);
            submitButtonRef.current?.focus();
          }}
          type="text"
          value={tempVal}
          onChange={handleInputChange}
          autoFocus
          onFocus={(e) => {
            e.target.select();
          }}
        />
      ) : (
        <h2
          className="hover:cursor-text"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value || `[${placeholder}]`}
        </h2>
      )}
      <button className={"btn-standard"} type="submit" ref={submitButtonRef}>
        {isEditing ? <Check /> : <Edit />}
      </button>
    </form>
  );
};

export default TextInput;
