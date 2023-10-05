const MCEditor = ({ questionData, updateFn }) => {
  console.log(questionData);
  const addItem = (itemText: string) => {
    updateFn({ MCOptions: [...questionData.MCOptions, itemText] });
  };
  const moveItem = (index: number, targetIndex: number) => {
    const tempItems = [...questionData.MCOptions];
    const itemToMove = tempItems[index];
    tempItems.splice(index, 1);
    tempItems.splice(targetIndex, 0, itemToMove);
    updateFn({ MCOptions: tempItems });
  };

  return (
    <div>
      {questionData.MCOptions.map((item, index) => {
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
