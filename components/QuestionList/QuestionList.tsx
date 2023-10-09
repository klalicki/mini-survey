import { AddQuestions } from "../AddQuestions/AddQuestions";
import QuestionSort from "../QuestionSort/QuestionSort";
const QuestionList = () => {
  return (
    <div>
      <h1>Question List</h1>
      <QuestionSort></QuestionSort>
      <AddQuestions />
    </div>
  );
};

export default QuestionList;
