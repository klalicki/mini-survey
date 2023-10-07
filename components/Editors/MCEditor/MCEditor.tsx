// MCEditor component
/* accepts two props:
optionsList: Array<string> containing all of the options that should go in the editor
updateFn: a function that accepts one argument: the new options list: Array<string>
This component renders each of the 
*/

import TextInput from "@/components/TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItem from "@/components/TextInput/AddItem";

const MCEditor = ({
  optionsList,
  updateFn,
}: {
  optionsList: Array<string>;
  updateFn: Function;
}) => {
  // check to see if questionData has a
  console.log(optionsList);
  const addItem = (itemText: string) => {
    if (optionsList) {
      updateFn([...optionsList, itemText]);
    } else {
      updateFn([itemText]);
    }
  };
  const moveItem = (index: number, targetIndex: number) => {
    const tempItems = [...optionsList];
    const itemToMove = tempItems[index];
    tempItems.splice(index, 1);
    tempItems.splice(targetIndex, 0, itemToMove);
    updateFn(tempItems);
  };
  const updateItem = (index: number, newValue: string) => {
    const tempItems = [...optionsList];
    tempItems[index] = newValue;
    updateFn(tempItems);
  };
  console.log(optionsList);
  return (
    <div>
      {optionsList &&
        optionsList.map((item, index) => {
          return (
            <div key={`item-${index}-${item}`}>
              <TextInput
                value={item}
                onChange={(newVal) => {
                  updateItem(index, newVal);
                }}
              />
              <button
                onClick={() => {
                  moveItem(index, index - 1);
                }}
              >
                UP
              </button>
            </div>
          );
        })}
      <AddItem
        placeholder={"Add a choice."}
        onChange={(newItem) => {
          addItem(newItem);
        }}
      />
    </div>
  );
};

export default MCEditor;
