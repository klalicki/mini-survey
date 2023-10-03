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
    <>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onChange(tempVal);
            setIsEditing(false);
          }}
        >
          <input type="text" value={tempVal} onChange={handleInputChange} />
          <button type="submit">
            <FontAwesomeIcon icon={faCheck} onClick={() => {}} />
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTempVal(value);
            setIsEditing(true);
          }}
        >
          <h2>{value}</h2>
          <button type="submit" onClick={() => {}}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </form>
      )}
    </>
  );
};

export default TextInput;
