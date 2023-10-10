import { SurveySection } from "@/types/SectionTypes";

export const STViewer = ({ questionData }: { questionData: SurveySection }) => {
  return <textarea name="" id={`${questionData.staticID}`}></textarea>;
};
