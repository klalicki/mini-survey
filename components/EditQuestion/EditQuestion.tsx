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
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: index.toString(),
  // });
const  randomTextArray=
  return (
    <article className="eq-container">
      <button className="eq-draghandle"></button>
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
        <p>
          {}
        </p>
      </div>
    </article>
  );
};
export default EditQuestion;
