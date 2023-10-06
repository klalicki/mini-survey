import { SurveyQuestion } from "@/types/QuestionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import MCEditor from "../Editors/MCEditor/MCEditor";
const EditQuestion = ({
  questionData,
  index,
}: {
  questionData: SurveyQuestion;
  index: number;
}) => {
  const { moveQuestionRelative, updateQuestion, updateQuestionMerge } =
    useContext(QuestionListContext);

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
      <TextInput
        value={questionData.text}
        onChange={(newVal: string) => {
          updateQuestionMerge(questionData.staticID, { text: newVal });
        }}
      />

      <Select
        title="Question Type"
        fieldName={`${questionData.staticID}-type`}
        value={questionData.questionType}
        options={[
          { labelText: "Multiple Choice", value: "mc" },
          { labelText: "Short Text", value: "st" },
        ]}
        handleChange={(newVal: string) => {
          console.log(newVal);
          updateQuestion(questionData.staticID, {
            ...questionData,
            questionType: newVal,
          });
        }}
      />

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
      {questionData.questionType === "mc" && (
        <MCEditor
          optionsList={questionData.MCOptions}
          updateFn={(newOptions: Array<string>) => {
            console.log("adding " + newOptions.join(", "));
            console.table(questionData);
            updateQuestionMerge(questionData.staticID, {
              MCOptions: newOptions,
            });
          }}
        />
      )}
      {questionData.questionType === "st" && <p>ST Edit Component</p>}
    </div>
  );
};
export default EditQuestion;
