import { useState } from "react";
import EditQuestion from "@/components/EditQuestion/EditQuestion";

export interface SurveyQuestion {
  type: string;
  text: string;
}

export interface MCQuestion extends SurveyQuestion {
  options: Array<{ id: number; text: string }>;
}

export type SurveyDataset = {
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
};

const sampleData: SurveyDataset = {
  title: "My Sample Survey",
  description: "This is the sample data for this component",
  questions: [{ type: "mc", text: "this is the text for Q1" }],
};

const EditPage = () => {
  const [surveyData, setSurveyData] = useState(sampleData);

  const addQuestionAtIndex = (index: number) => {
    const newQuestion = { type: "mc", text: "this is a new question" };
    const tempQuestions = [
      ...surveyData.questions.slice(0, index - 1),
      newQuestion,
      ...surveyData.questions.slice(index),
    ];
    console.log(tempQuestions);

    setSurveyData({ ...surveyData, questions: tempQuestions });
  };

  const updateQuestion = (questionData: SurveyQuestion, index: number) => {
    const newQuestions = [...surveyData.questions];
    newQuestions[index] = questionData;
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  return (
    <div>
      <h1>Edit Survey</h1>
      {surveyData.questions.map((questionData, index) => {
        return (
          <>
            <button
              onClick={() => {
                addQuestionAtIndex(index);
              }}
            >
              +
            </button>
            <EditQuestion
              key={index}
              questionData={questionData}
              update={(newQuestionData: SurveyQuestion) => {
                updateQuestion(newQuestionData, index);
              }}
            />{" "}
          </>
        );
      })}
    </div>
  );
};
export default EditPage;
