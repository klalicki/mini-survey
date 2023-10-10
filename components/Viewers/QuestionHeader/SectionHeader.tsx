import { SurveySection } from "@/types/SectionTypes";

export const SectionHeader = ({ section }: { section: SurveySection }) => {
  return (
    <div>
      <h2>{section.title}</h2>
    </div>
  );
};
