import {
  MCOption,
  QuestionTypeData,
  SurveyQuestion,
} from "@/types/QuestionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import MCEditor from "../Editors/MCEditor/MCEditor";
import { faCircleCheck, faFont } from "@fortawesome/free-solid-svg-icons";
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
      <TextInput
        value={questionData.text}
        onChange={(newVal: string) => {
          updateQuestionMerge(questionData.staticID, { text: newVal });
        }}
      />

      <Select
        fieldName={`${questionData.staticID}-type`}
        value={questionData.questionType}
        options={QuestionTypeData}
        handleChange={(newVal: string) => {
          console.log(newVal);
          updateQuestion(questionData.staticID, {
            ...questionData,
            questionType: newVal,
          });
        }}
      />

      {questionData.questionType === "mc" && (
        <MCEditor
          optionsList={questionData.MCOptions}
          updateFn={(newOptions: Array<MCOption>) => {
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
