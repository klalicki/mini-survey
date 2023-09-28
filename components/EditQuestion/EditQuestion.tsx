import { SurveyQuestion } from "@/types/QuestionTypes";
import { useEffect, useState } from "react";

const EditQuestion = ({ questionData }: { questionData: SurveyQuestion }) => {
  return (
    <article>
      <h2>Question ID#:{questionData.staticID}</h2>
    </article>
  );
};
export default EditQuestion;
