import { SectionTypeData } from "@/types/SectionTypes";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddSections = () => {
  const { addBlankSection } = useContext(SectionListContext);
  return (
    <div>
      {SectionTypeData.map(({ value, labelText, icon }) => {
        return (
          <button
            key={`button-${value}`}
            onClick={() => {
              addBlankSection(undefined, value);
            }}
          >
            <FontAwesomeIcon icon={icon} />
            {labelText}
          </button>
        );
      })}
    </div>
  );
};
