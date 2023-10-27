import { Check, Edit } from "@mui/icons-material";
import { useRef, useState } from "react";
const TextInput = ({
  value,
  placeholder,
  onChange,
  className,
}: {
  value: string;
  placeholder?: string;
  onChange: Function;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempVal(e.target.value);
  };
  return (
    <form
      className={
        "flex text-lg gap-2 p-3 group focus-within:bg-accentA-100 hover:bg-accentA-100 " +
        " " +
        className
      }
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
          className=" grow w-full p-1"
          placeholder={placeholder}
          size={tempVal.length}
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
      <button
        className={`btn-standard opacity-0 group-hover:opacity-60 group-focus:opacity-60 focus:opacity-60 ${
          isEditing ? "opacity-60" : ""
        }`}
        type="submit"
        ref={submitButtonRef}
      >
        {isEditing ? <Check /> : <Edit />}
      </button>
    </form>
  );
};

export default TextInput;
