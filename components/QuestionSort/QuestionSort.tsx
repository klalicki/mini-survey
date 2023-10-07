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
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PropsWithChildren, use, useState } from "react";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { SurveyQuestion } from "@/types/QuestionTypes";

type QuestionSortItemProps = {
  id: any;
  activeId: any;
  itemText: string;
  isOverlay?: boolean;
};

const QuestionSortItem = ({
  activeId,
  id,
  itemText,
  children,
  isOverlay,
}: PropsWithChildren<QuestionSortItemProps>) => {
  const {
    attributes,
    setActivatorNodeRef,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });
  const itemStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <article
      style={itemStyle}
      ref={setNodeRef}
      className={`qs-question-wrapper ${
        activeId == id && isOverlay ? "qs-question-wrapper-active" : ""
      } ${activeId === id && !isOverlay ? "qs-question-wrapper-dim" : ""}`}
    >
      <button
        aria-label={`move question ${itemText}`}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="eq-draghandle"
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </button>
      <div className="eq-container">{children}</div>
    </article>
  );
};

const QuestionSort = () => {

  const {
    questionList,
    addBlankQuestion,
    moveQuestion,
    moveQuestionById,
    getQuestionById,
    moveQuestionRelative,
  } = useContext(QuestionListContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<SurveyQuestion | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setActiveItem(getQuestionById(event.active.id));
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
    console.log(event.activatorEvent.target);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveQuestionById(initialID, targetID);
      console.log(event.over);
    }
  };
  return (
    <section className="sort-list-container">
      {/* <h2>active: {activeId}</h2> */}

      <DndContext
        // @ts-ignore not sure why this is giving me a type error!
        layoutMeasuring={{ strategy: MeasuringStrategy.Always }}
        modifiers={[restrictToParentElement]}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={questionList.map((item) => {
            return item.staticID;
          })}
        >
          {questionList.map((item, index) => {
            // console.log(item);
            return (
              <QuestionSortItem
                key={item.staticID}
                id={item.staticID}
                itemText={item.text}
                activeId={activeId}
              >
                <EditQuestion questionData={item} index={index} />
              </QuestionSortItem>
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeItem && (
            <QuestionSortItem
              isOverlay={true}
              key={activeItem.staticID}
              id={activeItem.staticID}
              itemText={activeItem.text}
              activeId={activeId}
            >
              <EditQuestion questionData={activeItem} index={0} />
            </QuestionSortItem>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  );
};
export default QuestionSort;
