import {
  closestCorners,
  DndContext,
  KeyboardSensor,
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
  SensorContext,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PropsWithChildren, useState } from "react";

import { Coordinates } from "@dnd-kit/core/dist/types";
import { customKeyCoords } from "@/utils/customKeyCoords";
import { DragIndicator } from "@mui/icons-material";
type BasicReorderItemProps = {
  id: any;
  activeId: any;
  itemText: string;
  isOverlay?: boolean;
};
// This is a higher order component that provides a simple drag-and-drop list UI with drag handles

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
      className={`qs-section-wrapper ${
        activeId == id && isOverlay ? "qs-section-wrapper-active" : ""
      } ${activeId === id && !isOverlay ? "qs-section-wrapper-dim" : ""}`}
    >
      <div className="basic-reorder-controls">
        <button
          aria-label={`move item ${itemText}`}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="eq-draghandle"
        >
          <DragIndicator />
        </button>
      </div>

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
  getTextFromData,
  containerStyles,
}: {
  dataArray: Array<any>;
  reorderFn: Function;
  renderItem: Function;
  getIDFromData: Function;
  getTextFromData?: Function;
  containerStyles?: Object;
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: customKeyCoords,
    })
  );
  const getItemByID = <T,>(id: T) => {
    return dataArray.find((item) => {
      return getIDFromData(item) === id;
    });
  };
  const getIndexByID = <T,>(id: T) => {
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
    // const initialIndex = sectionList;
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
    <section className="sort-list-container" style={containerStyles}>
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
            return (
              <BasicReorderItem
                key={idArray[index]}
                id={idArray[index]}
                itemText={getTextFromData ? getTextFromData(item) : ""}
                activeId={activeId}
              >
                {renderItem(item, index)}
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
              itemText={getTextFromData ? getTextFromData(activeItem) : ""}
              activeId={activeId}
            >
              {renderItem(activeItem)}
            </BasicReorderItem>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default BasicReorder;
