import { SurveySection } from "@/types/SectionTypes";

export const ScaleViewer = ({
  questionData,
}: {
  questionData: SurveySection;
}) => {
  return <>{JSON.stringify(questionData)}</>;
};
