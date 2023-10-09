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
    <div>
      <h2>{questionData.title}</h2>
      <div className="scale-wrapper">
        <div className="scale-label-start">
          {questionData.ScaleOptions.startLabel}
        </div>
        <div className="scale-radio">
          {numbersToRender.map((item) => {
            return (
              <div className="scale-radio-item" key={item}>
                <label htmlFor={`${questionData.staticID}-${item}`}>
                  {item}
                </label>
                <input
                  type="radio"
                  name={questionData.staticID}
                  id={`${questionData.staticID}-${item}`}
                />
              </div>
            );
          })}
        </div>{" "}
        <div className="scale-label-end">
          {questionData.ScaleOptions.endLabel}
        </div>
      </div>
    </div>
  );
};
