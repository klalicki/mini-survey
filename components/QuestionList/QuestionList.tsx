import { QuestionListContext } from "@/contexts/QuestionListContext";
import { useContext, useState } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import ButtonAddQuestion from "../ButtonAddQuestion/ButtonAddQuestion";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import QuestionListDragTarget from "../QuestionListDragTarget/QuestionListDragTarget";
import QuestionSort from "../QuestionSort/QuestionSort";
const QuestionList = () => {
  const { questionList, addBlankQuestion, moveQuestion } =
    useContext(QuestionListContext);
  const [activeID, setActiveID] = useState<number | null>(null);
  const handleDragEnd = (event) => {
    console.log(event);
    console.log("dragEnd");
    if (event.over !== null && event.over.id !== undefined) {
      console.log("running mQ");
      moveQuestion(event.active.id, event.over.id);
    }
  };
  const handleDragStart = (event) => {
    console.log(event.active.id);
    setActiveID(event.active.id);
  };

  return (
    <div>
      <h1>Question List</h1>
      <QuestionSort></QuestionSort>
    </div>
  );
};

export default QuestionList;
