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
import { SectionListContext } from "@/contexts/SectionListContext";
import { useContext } from "react";
import EditSection from "../EditSection/EditSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { SurveySection } from "@/types/SectionTypes";
import { createPortal } from "react-dom";
import { customKeyCoords } from "@/utils/customKeyCoords";

type SectionSortItemProps = {
  id: any;
  activeId: any;
  itemText: string;
  isOverlay?: boolean;
  index: number;
};

const SectionSortItem = ({
  activeId,
  id,
  itemText,
  children,
  isOverlay,
  index,
}: PropsWithChildren<SectionSortItemProps>) => {
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
  const { moveSectionRelative } = useContext(SectionListContext);
  return (
    <article
      style={itemStyle}
      ref={setNodeRef}
      className={`qs-section-wrapper ${
        activeId === id && isOverlay ? "qs-section-wrapper-active" : ""
      } ${activeId === id && !isOverlay ? "qs-section-wrapper-dim" : ""}`}
    >
      <div className="section-handle">
        <button
          className="section-move-arrow"
          onClick={() => {
            moveSectionRelative(index, -1);
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          aria-label={`move section ${itemText}`}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="eq-draghandle"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </button>
        <button
          className="section-move-arrow"
          onClick={() => {
            moveSectionRelative(index, 1);
          }}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>

      <div className="eq-container">{children}</div>
    </article>
  );
};

const SectionSort = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: customKeyCoords,
    })
  );

  const {
    sectionList,
    addBlankSection,
    moveSection,
    moveSectionById,
    getSectionById,
    moveSectionRelative,
  } = useContext(SectionListContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<SurveySection | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setActiveItem(getSectionById(event.active.id));
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);

    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveSectionById(initialID, targetID);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    // const initialIndex = sectionList;
    setActiveId(null);

    const initialID = event.active.id;
    const targetID = event?.over?.id;
    if (targetID) {
      moveSectionById(initialID, targetID);
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
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={sectionList.map((item) => {
            return item.staticID;
          })}
        >
          {sectionList.map((item, index) => {
            // console.log(item);
            return (
              <SectionSortItem
                key={item.staticID}
                id={item.staticID}
                itemText={item.text}
                activeId={activeId}
                index={index}
              >
                <EditSection sectionData={item} index={index} />
              </SectionSortItem>
            );
          })}
        </SortableContext>

        <DragOverlay>
          {activeItem && (
            <SectionSortItem
              isOverlay={true}
              key={activeItem.staticID}
              id={activeItem.staticID}
              itemText={activeItem.text}
              activeId={activeId}
              index={0}
            >
              <EditSection sectionData={activeItem} index={0} />
            </SectionSortItem>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  );
};
export default SectionSort;