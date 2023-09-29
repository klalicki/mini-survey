import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import ButtonAddQuestion from "../ButtonAddQuestion/ButtonAddQuestion";
import { DndContext, useDraggable } from "@dnd-kit/core";
import QuestionListDragTarget from "../QuestionListDragTarget/QuestionListDragTarget";

const QuestionList = () => {
  const { questionList, addBlankQuestion, moveQuestion } =
    useContext(QuestionListContext);
  const handleDragEnd = (event) => {
    if (event.over !== undefined && event.over.id !== undefined) {
      moveQuestion(event.active.id, event.over.id);
    }
  };

  return (
    <div>
      <h1>Question List</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {questionList.map((item, index) => {
          return (
            <>
              <QuestionListDragTarget index={index} />
              {/* <p>index: {index}</p> */}
              <EditQuestion
                questionData={item}
                key={`q-${item.staticID}`}
                index={index}
              />
            </>
          );
        })}
        <ButtonAddQuestion />
      </DndContext>
    </div>
  );
};

export default QuestionList;
