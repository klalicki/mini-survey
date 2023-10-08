// MCEditor component
/* accepts two props:
optionsList: Array<string> containing all of the options that should go in the editor
updateFn: a function that accepts one argument: the new options list: Array<string>
This component renders each of the 
*/

import TextInput from "@/components/TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItem from "@/components/TextInput/AddItem";
import BasicReorder from "@/components/BasicReorder/BasicReorder";

const MCEditor = ({
  optionsList,
  updateFn,
}: {
  optionsList: Array<string>;
  updateFn: Function;
}) => {
  // reducer functions for this component
  // all create a new optionsList and pass it to the parent via updateFn
  const addItem = (itemText: string) => {
    if (optionsList) {
      updateFn([...optionsList, itemText]);
    } else {
      updateFn([itemText]);
    }
  };
  const removeItem = (index: number) => {
    const tempItems = [...optionsList];
    tempItems.splice(index, 1);
    updateFn(tempItems);
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

  return (
    <div>
      <BasicReorder
        dataArray={optionsList}
        reorderFn={moveItem}
        renderItem={(dataItem, index) => {
          return (
            <>
              <TextInput
                value={dataItem}
                onChange={(newVal: string) => {
                  updateItem(index, newVal);
                }}
              />
              <button
                onClick={() => {
                  removeItem(index);
                }}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </>
          );
        }}
        getTextFromData={(item: string) => {
          return item;
        }}
        getIDFromData={(item: string) => {
          return item;
        }}
      />

      <AddItem
        placeholder={"Add a choice."}
        onChange={(newItem: string) => {
          addItem(newItem);
        }}
      />
    </div>
  );
};

export default MCEditor;
