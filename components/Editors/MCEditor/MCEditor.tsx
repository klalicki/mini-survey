import BasicReorder from "@/components/BasicReorder/BasicReorder";
import type { SurveyQuestion } from "@/types/QuestionTypes";
const MCEditor = ({
  questionData,
  onUpdate,
}: {
  questionData: SurveyQuestion;
  onUpdate: Function;
}) => {
  console.log(questionData);
  return (
    <div>
      {questionData.MCOptions?.map((item) => {
        return <li key={item}>{item}</li>;
      })}
      <BasicReorder element={<li></li>} list={questionData.MCOptions} />
    </div>
  );
};

export default MCEditor;
