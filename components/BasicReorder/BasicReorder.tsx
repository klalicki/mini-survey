import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  useSensor,
  useSensors,
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PropsWithChildren, useState } from "react";

import { customKeyCoords } from "@/utils/customKeyCoords";
import { DragIndicator, ArrowUpward, ArrowDownward } from "@mui/icons-material";
type BasicReorderItemProps = {
  id: any;
  activeId: any;
  itemText: string;
  isOverlay?: boolean;
  index: number;
};
// This is a higher order component that provides a simple drag-and-drop list UI with drag handles

// BasicReorderItem: the wrapper for each item in the BasicReorder that adds the drag handle and other related UI elements
const BasicReorderItem = ({
  activeId,
  id,
  itemText,
  children,
  index,
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
      className={`bg-white flex shadow-md ${
        activeId == id && isOverlay ? "" : ""
      } ${activeId === id && !isOverlay ? "opacity-25" : ""}`}
    >
      <div className="flex flex-col justify-center  bg-accentB-100 text-accentB-950 w-8">
        <button
          className="hidden"
          onClick={() => {
            // moveSectionRelative(index, -1);
          }}
        >
          <ArrowUpward />
        </button>
        <button
          aria-label={`move item ${itemText}`}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="eq-draghandle"
        >
          <DragIndicator />
        </button>
        <button
          className="hidden"
          onClick={() => {
            // moveSectionRelative(index, -1);
          }}
        >
          <ArrowDownward />
        </button>
      </div>

      {children}
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
  emptyText,
}: {
  dataArray: Array<any>;
  reorderFn: Function;
  renderItem: Function;
  emptyText: string;

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
    <section
      className=" bg-slate-200 p-4 flex flex-col gap-4"
      style={containerStyles}
    >
      {/* <h2>active: {activeId}</h2> */}
      {dataArray.length === 0 && <div>{emptyText}</div>}
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
                index={index}
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
              index={0}
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
