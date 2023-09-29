import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import ButtonAddQuestion from "../ButtonAddQuestion/ButtonAddQuestion";
import { DndContext, useDraggable } from "@dnd-kit/core";
import QuestionListDragTarget from "../QuestionListDragTarget/QuestionListDragTarget";

const QuestionList = () => {
  const { questionList, addBlankQuestion } = useContext(QuestionListContext);

  return (
    <div>
      <h1>Question List</h1>
      <DndContext></DndContext>
      {questionList.map((item, index) => {
        return (
          <>
            <QuestionListDragTarget index={index} />
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
