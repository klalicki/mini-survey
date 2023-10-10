import { getUID } from "@/utils/uid";
import { LinearScale } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
export type MCOption = { staticID: string; text: string };
export type ScaleOptions = {
  startNumber: number;
  endNumber: number;
  startLabel?: string;
  endLabel?: string;
};
export interface SurveySection {
  sectionType: string;
  title: string;
  staticID: string;
  MCOptions: Array<MCOption>;
  ScaleOptions: ScaleOptions;
}

export const CreateBlankSection = (type?: string): SurveySection => {
  return {
    sectionType: type || "",
    title: "",
    MCOptions: [],
    staticID: getUID(),
    ScaleOptions: { startNumber: 1, endNumber: 5 },
  };
};

export type SurveyDataset = {
  title?: string;
  description?: string;
  sections: Array<SurveySection>;
};

export const SectionTypeData = [
  {
    labelText: "Multiple Choice",
    value: "mc",
    icon: RadioButtonCheckedIcon,
  },
  {
    labelText: "Scale",
    value: "scale",
    icon: LinearScale,
  },
  { labelText: "Short Answer", value: "st", icon: ShortTextIcon },
];
