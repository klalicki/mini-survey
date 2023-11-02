import { SurveySection } from "@/types/SectionTypes";
import { Quickreply } from "@mui/icons-material";

export const ScaleViewer = ({
  questionData,
}: {
  questionData: SurveySection;
}) => {
  const numbersToRender = [];
  for (
    let i = questionData.ScaleOptions.startNumber;
    i <= questionData.ScaleOptions.endNumber;
    i++
  ) {
    numbersToRender.push(i);
  }
  return (
    <div className="flex flex-col min-w-full">
      <div className="flex gap-3 flex-wrap">
        {numbersToRender.map((item) => {
          return (
            <div className="flex flex-col grow " key={item}>
              <input
                type="radio"
                name={questionData.staticID}
                id={`${questionData.staticID}-${item}`}
              />
              <label htmlFor={`${questionData.staticID}-${item}`}>{item}</label>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-5">
        <div className="text-sm">{questionData.ScaleOptions.startLabel}</div>
        <div className="text-sm">{questionData.ScaleOptions.endLabel}</div>
      </div>
    </div>
  );
};
