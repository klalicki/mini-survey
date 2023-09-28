export interface SurveyQuestion {
  questionType: string;
  text: string;
  staticID: string;
}

export const CreateBlankSurveyQuestion = (): SurveyQuestion => {
  return { questionType: "", text: "", staticID: Date.now().toString() };
};

export type SurveyDataset = {
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
};
