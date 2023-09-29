import { SurveyQuestion } from "@/types/QuestionTypes";
import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
const EditQuestion = ({
  questionData,
  index,
}: {
  questionData: SurveyQuestion;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: index.toString(),
  });
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <article
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
    >
      <h2>Question ID#:{questionData.staticID}</h2>
    </article>
  );
};
export default EditQuestion;
