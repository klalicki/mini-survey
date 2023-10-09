import { SurveySection } from "@/types/SectionTypes";

export const SectionHeader = ({
  questionData,
}: {
  questionData: SurveySection;
}) => {
  return (
    <div>
      <h2>{questionData.title}</h2>
    </div>
  );
};
