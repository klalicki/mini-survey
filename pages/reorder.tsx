"use client";
import BasicReorder from "@/components/BasicReorder/BasicReorder";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
const ReorderTest = () => {
  const [itemList, setItemList] = useState<{ id: string; text: string }[]>([
    { id: "ida", text: "Item A" },
    { id: "idb", text: "Item B" },
    { id: "idc", text: "Item C" },
  ]);
  const moveItem = (currentIndex, newIndex) => {
    const tempItemList = [...itemList];

    const newItemList = arrayMove([...itemList], currentIndex, newIndex);

    setItemList(newItemList);
  };
  return (
    <>
      <h1>Basic Reorder demo page</h1>
      <BasicReorder
        renderItem={(dataItem: any, index) => {
          return (
            <div>
              {Object.entries(dataItem).map(([key, value]) => {
                return <p key={key}>{`${key}: ${value}`}</p>;
              })}
            </div>
          );
        }}
        dataArray={itemList}
        getIDFromData={(item: any) => {
          return item.id;
        }}
        reorderFn={moveItem}
      />
    </>
  );
};
const doubleReorderTest = () => {
  return (
    <>
      <ReorderTest></ReorderTest>
      <ReorderTest></ReorderTest>
    </>
  );
};
export default doubleReorderTest;
