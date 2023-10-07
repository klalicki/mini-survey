"use client";
import BasicReorder from "@/components/BasicReorder/BasicReorder";
const ReorderTest = () => {
  return (
    <>
      <h1>Basic Reorder demo page</h1>
      <BasicReorder
        element={<div></div>}
        dataArray={[
          { id: "ida", text: "Item A" },
          { id: "idb", text: "Item B" },
          { id: "idc", text: "Item C" },
        ]}
        getIDFromData={(item) => {
          return item.id;
        }}
        onReorder={(...args) => {
          console.log(args);
        }}
      />
    </>
  );
};
export default ReorderTest;
