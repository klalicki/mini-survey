import { SurveyQuestion } from "@/types/QuestionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { loremIpsum } from "lorem-ipsum";
const EditQuestion = ({
  questionData,
  index,
}: {
  questionData: SurveyQuestion;
  index: number;
}) => {
  const { moveQuestionRelative, updateQuestion } =
    useContext(QuestionListContext);
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: index.toString(),
  // });
  return (
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
      <button
        onClick={() => {
          updateQuestion(questionData.staticID, {
            ...questionData,
            text: "Hello this has been updated!",
          });
        }}
      >
        CLEAR TEXT
      </button>
      <p>{questionData.text}</p>
    </div>
  );
};
export default EditQuestion;
