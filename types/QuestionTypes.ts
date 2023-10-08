import { getUID } from "@/utils/uid";

export type MCOption = { staticID: string; text: string };
export interface SurveyQuestion {
  questionType: string;
  text: string;
  staticID: string;
  MCOptions: Array<MCOption>;
}

export const CreateBlankSurveyQuestion = (): SurveyQuestion => {
  return {
    questionType: "",
    text: "",
    MCOptions: [],
    staticID: getUID(),
  };
};

export type SurveyDataset = {
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
};
