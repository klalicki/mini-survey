import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import ButtonAddQuestion from "../ButtonAddQuestion/ButtonAddQuestion";

const QuestionList = () => {
  const { questionList, addBlankQuestion } = useContext(QuestionListContext);

  return (
    <div>
      <h1>Question List</h1>
      {questionList.map((item, index) => {
        return (
          <>
            <ButtonAddQuestion index={index} />
            <p>index: {index}</p>
            <EditQuestion questionData={item} key={`q-${item.staticID}`} />
          </>
        );
      })}
      <ButtonAddQuestion />
    </div>
  );
};

export default QuestionList;
