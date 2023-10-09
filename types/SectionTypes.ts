import { getUID } from "@/utils/uid";
import { faCircleCheck, faFont } from "@fortawesome/free-solid-svg-icons";

export type MCOption = { staticID: string; text: string };
export interface SurveySection {
  sectionType: string;
  title: string;
  staticID: string;
  MCOptions: Array<MCOption>;
}

export const CreateBlankSection = (type?: string): SurveySection => {
  return {
    sectionType: type || "",
    title: "",
    MCOptions: [],
    staticID: getUID(),
  };
};

export type SurveyDataset = {
  title: string;
  description: string;
  sections: Array<SurveySection>;
};

export const SectionTypeData = [
  {
    labelText: "Multiple Choice",
    value: "mc",
    icon: faCircleCheck,
  },
  { labelText: "Short Text", value: "st", icon: faFont },
];
