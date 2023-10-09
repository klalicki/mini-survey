import {
  MCOption,
  QuestionTypeData,
  SurveySection,
} from "@/types/SectionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { QuestionListContext } from "@/contexts/SectionListContext";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import MCEditor from "../Editors/MCEditor/MCEditor";
import { faCircleCheck, faFont } from "@fortawesome/free-solid-svg-icons";
const EditQuestion = ({
  questionData,
  index,
}: {
  questionData: SurveySection;
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
        value={questionData.sectionType}
        options={QuestionTypeData}
        handleChange={(newVal: string) => {
          console.log(newVal);
          updateQuestion(questionData.staticID, {
            ...questionData,
            questionType: newVal,
          });
        }}
      />

      {questionData.sectionType === "mc" && (
        <MCEditor
          optionsList={questionData.MCOptions}
          updateFn={(newOptions: Array<MCOption>) => {
            updateQuestionMerge(questionData.staticID, {
              MCOptions: newOptions,
            });
          }}
        />
      )}
      {questionData.sectionType === "st" && <p>ST Edit Component</p>}
    </div>
  );
};
export default EditQuestion;
