import { SurveyQuestion } from "@/types/QuestionTypes";
import { useEffect, useState } from "react";

const EditQuestion = ({
  questionData,
  update,
}: {
  questionData: SurveyQuestion;
  update: Function;
}) => {
  const [workingData, setWorkingData] = useState(questionData);
  useEffect(() => {
    update(workingData);
  }, [workingData]);
  return (
    <article>
      <input
        type="text"
        value={questionData.text}
        onChange={(e) => {
          setWorkingData({ ...workingData, text: e.target.value });
        }}
      />
    </article>
  );
};
export default EditQuestion;
