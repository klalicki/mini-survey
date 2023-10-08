import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
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
        <h2>{value}</h2>
      )}
      <button type="submit" ref={submitButtonRef}>
        {isEditing ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faPen} />
        )}
      </button>
    </form>
  );
};

export default TextInput;
