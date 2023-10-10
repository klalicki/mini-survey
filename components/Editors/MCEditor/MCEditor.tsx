// MCEditor component
/* accepts two props:
optionsList: Array<MCOption> containing all of the options that should go in the editor
updateFn: a function that accepts one argument: the new options list: Array<MCOption>
This component renders each of the 
*/

import TextInput from "@/components/Inputs/TextInput/TextInput";
import AddItem from "@/components/Inputs/TextInput/AddItem";
import BasicReorder from "@/components/BasicReorder/BasicReorder";
import { MCOption } from "@/types/SectionTypes";
import { getUID } from "@/utils/uid";
import { Close } from "@mui/icons-material";

const MCEditor = ({
  optionsList,
  updateFn,
}: {
  optionsList: MCOption[];
  updateFn: (newOptionsList: MCOption[]) => void;
}) => {
  // reducer functions for this component
  // all create a new optionsList and pass it to the parent via updateFn
  const addItem = (itemText: string) => {
    if (optionsList) {
      updateFn([...optionsList, { staticID: getUID(), text: itemText }]);
    } else {
      updateFn([{ staticID: getUID(), text: itemText }]);
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
    tempItems[index] = { ...tempItems[index], text: newValue };
    updateFn(tempItems);
  };

  return (
    <div>
      <BasicReorder
        emptyText={
          "This question does not have any options yet. Add them below:"
        }
        dataArray={optionsList}
        reorderFn={moveItem}
        renderItem={(dataItem: MCOption, index: number) => {
          return (
            <>
              <TextInput
                value={dataItem.text}
                onChange={(newVal: string) => {
                  updateItem(index, newVal);
                }}
              />
              <button
                className="btn-standard"
                onClick={() => {
                  removeItem(index);
                }}
              >
                <Close />
              </button>
            </>
          );
        }}
        getTextFromData={(item: MCOption) => {
          return item.text;
        }}
        getIDFromData={(item: MCOption) => {
          return item.staticID;
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
