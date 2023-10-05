import BasicReorder from "@/components/BasicReorder/BasicReorder";
import type { SurveyQuestion } from "@/types/QuestionTypes";

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
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { PropsWithChildren, use, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@/components/TextInput/TextInput";

type QuestionSortItemProps = { id: any; activeId: any; itemText: string };

const MCEditorItemWrapper = ({
  activeId,
  id,
  itemText,
  children,
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
        activeId == id ? "qs-question-wrapper-active" : ""
      }`}
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

const MCEditor = ({
  questionData,
  updateFn,
}: {
  questionData: SurveyQuestion;
  updateFn: Function;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const moveItem = (initial, target) => {};
  const updateItem = (index, newVal) => {
    const tempItems = [...questionData.MCOptions];
    
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);

    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      // moveQuestionById(initialID, targetID);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    console.log(event);
    console.log(event.activatorEvent.target);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      // moveQuestionById(initialID, targetID);
      console.log(event.over);
    }
  };
  return (
    <section className="sort-list-container">
      <DndContext
        // @ts-ignore not sure why this is giving me a type error!
        layoutMeasuring={{ strategy: MeasuringStrategy.BeforeDragging }}
        modifiers={[restrictToParentElement]}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext items={questionData.MCOptions}>
          {questionData.MCOptions.map((item, index) => {
            // console.log(item);
            return (
              <>
                <MCEditorItemWrapper
                  id={item}
                  itemText={item}
                  key={item}
                  activeId={activeId}
                >
                  <TextInput value={item} onChange={(value) => {}} />
                </MCEditorItemWrapper>
              </>
            );
          })}
        </SortableContext>
      </DndContext>
    </section>
  );
};
export default MCEditor;
