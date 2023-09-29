import ButtonAddQuestion from "../ButtonAddQuestion/ButtonAddQuestion";
import { useDroppable } from "@dnd-kit/core";
const QuestionListDragTarget = ({ index }: { index: number }) => {
  const { isOver, setNodeRef } = useDroppable({ id: index });
  const droppableStyle = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div ref={setNodeRef} style={droppableStyle}>
      <ButtonAddQuestion index={index} />
    </div>
  );
};
export default QuestionListDragTarget;
