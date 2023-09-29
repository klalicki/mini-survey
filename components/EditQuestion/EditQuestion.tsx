import { SurveyQuestion } from "@/types/QuestionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { QuestionListContext } from "@/contexts/QuestionListContext";
const EditQuestion = ({
  questionData,
  index,
}: {
  questionData: SurveyQuestion;
  index: number;
}) => {
  const { moveQuestionRelative } = useContext(QuestionListContext);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: index.toString(),
  });
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <article ref={setNodeRef} style={draggableStyle} className="eq-container">
      <button {...listeners} {...attributes} className="eq-draghandle"></button>
      <div className="eq-main">
        <div className="move-buttons">
          <button
            onClick={() => {
              moveQuestionRelative(index, -1);
            }}
          >
            -
          </button>

          <button
            onClick={() => {
              moveQuestionRelative(index, 1);
            }}
          >
            +
          </button>
        </div>
        <h2>Question ID#:{questionData.staticID}</h2>
      </div>
    </article>
  );
};
export default EditQuestion;
