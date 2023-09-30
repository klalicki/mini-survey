import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
const QuestionSort = () => {
  const [qList, setQList] = useState([1, 2, 3, 4]);
  return (
    <>
      <SortableContext items={qList}>
        {qList.map((item) => {
          return <div key={item}>Item {item}</div>;
        })}
      </SortableContext>
    </>
  );
};
export default QuestionSort;
