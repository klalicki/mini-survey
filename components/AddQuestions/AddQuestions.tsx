import { QuestionTypeData } from "@/types/QuestionTypes";
import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddQuestions = () => {
  const { addBlankQuestion } = useContext(QuestionListContext);
  return (
    <div>
      {QuestionTypeData.map(({ value, labelText, icon }) => {
        return (
          <button
            key={`button-${value}`}
            onClick={() => {
              addBlankQuestion(undefined, value);
            }}
          >
            <FontAwesomeIcon icon={icon} />
            {labelText}
          </button>
        );
      })}
    </div>
  );
};
