export interface SurveyQuestion {
  type: string;
  text: string;
  staticID: string;
}

export const CreateBlankSurveyQuestion = (): SurveyQuestion => {
  return { type: "", text: "", staticID: Date.now().toString() };
};

export type SurveyDataset = {
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
};
