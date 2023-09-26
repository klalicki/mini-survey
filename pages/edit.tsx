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
  questions: [
    { type: "mc", text: "this is the text for Q1" },
    { type: "mc", text: "this is the text for Q2" },

    { type: "mc", text: "this is the text for Q3" },
    { type: "mc", text: "this is the text for Q4" },
    { type: "mc", text: "this is the text for Q5" },
  ],
};

const EditPage = () => {
  const [surveyData, setSurveyData] = useState(sampleData);

  const addQuestionAtIndex = (index: number) => {
    const newQuestion = { type: "mc", text: "this is a new question" };
    const tempQuestions = [...surveyData.questions];
    const firstHalf = tempQuestions.slice(0, index);
    const secondHalf = tempQuestions.slice(index);
    const newQuestions = [...firstHalf, newQuestion, ...secondHalf];
    console.log(newQuestions);

    setSurveyData({ ...surveyData, questions: newQuestions });
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
            <h2>{index}</h2>
            <button
              key={`bt-${index}`}
              onClick={() => {
                addQuestionAtIndex(index);
              }}
            >
              +
            </button>
            <EditQuestion
              key={`edit-${index}`}
              questionData={questionData}
              update={(newQuestionData: SurveyQuestion) => {
                updateQuestion(newQuestionData, index);
              }}
            />{" "}
          </>
        );
      })}
      <button
        onClick={() => {
          addQuestionAtIndex(surveyData.questions.length);
        }}
      >
        +
      </button>
    </div>
  );
};
export default EditPage;
