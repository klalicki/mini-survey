// MCEditor component
/* accepts two props:
optionsList: Array<string> containing all of the options that should go in the editor
updateFn: a function that accepts one argument: the new options list: Array<string>
This component renders each of the 
*/

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
    updateFn({ MCOptions: tempItems });
  };

  return (
    <div>
      {optionsList &&
        optionsList.map((item, index) => {
          return (
            <div key={`item-${index}-${item}`}>
              {item}
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
      <button
        onClick={() => {
          addItem("testing");
        }}
      >
        click me
      </button>
    </div>
  );
};

export default MCEditor;
