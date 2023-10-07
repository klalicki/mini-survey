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
import { PropsWithChildren, ReactElement, use, useState } from "react";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { SurveyQuestion } from "@/types/QuestionTypes";
type BasicReorderItemProps = {
  id: any;
  activeId: any;
  itemText: string;
  isOverlay?: boolean;
};
// This is a higher order component that provides a simple drag-and-drop list UI

// BasicReorderItem: the wrapper for each item in the BasicReorder
const BasicReorderItem = ({
  activeId,
  id,
  itemText,
  children,
  isOverlay,
}: PropsWithChildren<BasicReorderItemProps>) => {
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
        aria-label={`move item ${itemText}`}
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
// BasicReorder - the component that is exported.
const BasicReorder = ({
  dataArray,
  reorderFn,
  renderItem,
  getIDFromData,
}: {
  dataArray: Array<any>;
  reorderFn: Function;
  renderItem: Function;
  getIDFromData: Function;
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getItemByID = (id) => {
    return dataArray.find((item) => {
      return getIDFromData(item) === id;
    });
  };
  const getIndexByID = (id) => {
    return dataArray.findIndex((item) => {
      return getIDFromData(item) === id;
    });
  };
  const idArray = dataArray.map((item) => {
    return getIDFromData(item);
  });
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setActiveItem(getItemByID(event.active.id));
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);

    const initialID = event.active.id;
    const targetID = event?.over?.id;
    const initialIndex = getIndexByID(initialID);
    const targetIndex = getIndexByID(targetID);
    if (targetID) {
      reorderFn(initialIndex, targetIndex);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    // const initialIndex = questionList;
    setActiveId(null);
    console.log(event);
    console.log(event.activatorEvent.target);
    const initialID = event.active.id;
    const targetID = event?.over?.id;
    const initialIndex = getIndexByID(initialID);
    const targetIndex = getIndexByID(targetID);
    if (targetID) {
      reorderFn(initialIndex, targetIndex);
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
        <SortableContext strategy={verticalListSortingStrategy} items={idArray}>
          {dataArray.map((item, index) => {
            // console.log(item);
            return (
              <BasicReorderItem
                key={idArray[index]}
                id={idArray[index]}
                itemText={"item.text"}
                activeId={activeId}
              >
                {renderItem({ dataItem: item })}
              </BasicReorderItem>
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeItem && (
            <BasicReorderItem
              isOverlay={true}
              key={activeId}
              id={activeId}
              itemText={"activeItem.text"}
              activeId={activeId}
            >
              {renderItem({ dataItem: activeItem })}
            </BasicReorderItem>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default BasicReorder;
