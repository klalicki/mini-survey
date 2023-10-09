import { getUID } from "@/utils/uid";
import { faCircleCheck, faFont } from "@fortawesome/free-solid-svg-icons";

export type MCOption = { staticID: string; text: string };
export interface SurveyQuestion {
  questionType: string;
  text: string;
  staticID: string;
  MCOptions: Array<MCOption>;
}

export const CreateBlankSurveyQuestion = (type?: string): SurveyQuestion => {
  return {
    questionType: type || "",
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

export const QuestionTypeData = [
  {
    labelText: "Multiple Choice",
    value: "mc",
    icon: faCircleCheck,
  },
  { labelText: "Short Text", value: "st", icon: faFont },
];
