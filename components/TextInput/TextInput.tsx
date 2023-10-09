import { Check, Edit } from "@mui/icons-material";
import { useRef, useState } from "react";
const TextInput = ({
  value,
  onChange,
}: {
  value: string;
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
      className="text-input"
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
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value}
        </h2>
      )}
      <button type="submit" ref={submitButtonRef}>
        {isEditing ? <Check /> : <Edit />}
      </button>
    </form>
  );
};

export default TextInput;
