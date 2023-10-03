import { ChangeEventHandler, useState } from "react";
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

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setTempVal(e.target.value);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <input type="text" value={tempVal} onChange={handleInputChange} />
          <button>
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() => {
                onChange(tempVal);
                setIsEditing(false);
              }}
            />
          </button>
        </>
      ) : (
        <>
          <h2>{value}</h2>
          <button
            onClick={() => {
              setTempVal(value);
              setIsEditing(true);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </>
      )}
    </div>
  );
};

export default TextInput;
