import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
const ButtonAddQuestion = ({ index }: { index?: number }) => {
  const { addBlankQuestion } = useContext(QuestionListContext);
  return (
    <button
      onClick={() => {
        addBlankQuestion(index);
      }}
    >
      Add at index {index}
    </button>
  );
};

export default ButtonAddQuestion;
