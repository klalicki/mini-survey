import { QuestionListContext } from "@/contexts/SectionListContext";
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
