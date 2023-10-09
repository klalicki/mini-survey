import { SurveySection } from "@/types/SectionTypes";
import { ScaleViewer } from "../ScaleViewer/ScaleViewer";
import { MCViewer } from "../MCViewer/MCViewer";

export const ViewPicker = ({ section }: { section: SurveySection }) => {
  switch (section.sectionType) {
    case "mc":
      // MC component
      return <MCViewer questionData={section} />;
      break;
    case "st":
      // ST component
      return <div>st preview</div>;
      break;
    case "scale":
      return <ScaleViewer questionData={section} />;
      break;
    default:
      return <div>error. invalid question type</div>;
  }
};
