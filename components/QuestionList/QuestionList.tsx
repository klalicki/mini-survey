import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";

const QuestionList = () => {
  const { questionList, addBlankQuestion } = useContext(QuestionListContext);

  return (
    <div>
      <h1>Question List</h1>
      {questionList.map((item, index) => {
        return (
          <>
            <button
              onClick={() => {
                addBlankQuestion(index);
              }}
            >
              + at {index}
            </button>
            <p>index: {index}</p>
            <EditQuestion questionData={item} key={item.staticID} />
          </>
        );
      })}
      <button
        onClick={() => {
          addBlankQuestion();
        }}
      >
        + at {questionList.length}
      </button>
    </div>
  );
};

export default QuestionList;
