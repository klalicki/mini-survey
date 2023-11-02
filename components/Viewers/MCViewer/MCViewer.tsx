import { SurveySection } from "@/types/SectionTypes";

export const MCViewer = ({ questionData }: { questionData: SurveySection }) => {
  return (
    <div>
      {questionData.MCOptions.map((item) => {
        return (
          <div key={item.staticID} className="flex gap-1">
            <input
              type="radio"
              name={`${questionData.staticID}`}
              id={`${questionData.staticID}-${item.staticID}}`}
            />
            <label htmlFor={`${questionData.staticID}-${item.staticID}}`}>
              {item.text}
            </label>
          </div>
        );
      })}
    </div>
  );
};
