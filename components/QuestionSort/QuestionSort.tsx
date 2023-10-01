import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { PropsWithChildren, use, useState } from "react";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
type QuestionSortItemProps = { id: number };

const QuestionSortItem = ({
  id,
  children,
}: PropsWithChildren<QuestionSortItemProps>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={itemStyle} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const QuestionSort = () => {
  const {
    questionList,
    addBlankQuestion,
    moveQuestion,
    moveQuestionById,
    moveQuestionRelative,
  } = useContext(QuestionListContext);

  const handleDragEnd = (event: DragEndEvent) => {
    // const initialIndex = questionList;
    console.log(event);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveQuestionById(initialID, targetID);
    }
  };
  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={questionList.map((item) => {
            return item.staticID;
          })}
        >
          {questionList.map((item, index) => {
            // console.log(item);
            return (
              <>
                <button>+</button>
                <QuestionSortItem id={item.staticID} key={item.staticID}>
                  {/* item {item.staticID} */}
                  <EditQuestion questionData={item} index={index} />
                </QuestionSortItem>
              </>
            );
          })}
        </SortableContext>
      </DndContext>
    </>
  );
};
export default QuestionSort;
