"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  DragOverEvent,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { PropsWithChildren, use, useState } from "react";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import { act } from "react-dom/test-utils";
type QuestionSortItemProps = { id: number };

const QuestionSortItem = ({
  id,
  children,
}: PropsWithChildren<QuestionSortItemProps>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const itemStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <article style={itemStyle} ref={setNodeRef} className="qs-question-wrapper">
      <button {...attributes} {...listeners} className="eq-draghandle"></button>
      <div className="eq-container">{children}</div>
    </article>
  );
};

const QuestionSort = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const {
    questionList,
    addBlankQuestion,
    moveQuestion,
    moveQuestionById,
    moveQuestionRelative,
  } = useContext(QuestionListContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveQuestionById(initialID, targetID);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    // const initialIndex = questionList;
    setActiveId(null);
    console.log(event);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveQuestionById(initialID, targetID);
    }
  };
  return (
    <section className="sort-list-container">
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext
          items={questionList.map((item) => {
            return item.staticID;
          })}
        >
          {questionList.map((item, index) => {
            // console.log(item);
            return (
              <>
                {/* <button>+</button> */}
                <QuestionSortItem id={item.staticID} key={item.staticID}>
                  <EditQuestion questionData={item} index={index} />
                </QuestionSortItem>
              </>
            );
          })}
        </SortableContext>
      </DndContext>
    </section>
  );
};
export default QuestionSort;
