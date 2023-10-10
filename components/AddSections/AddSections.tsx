import { SectionTypeData } from "@/types/SectionTypes";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useContext } from "react";

export const AddSections = () => {
  const { addBlankSection } = useContext(SectionListContext);
  return (
    <div className="add-new-section">
      {SectionTypeData.map((item) => {
        return (
          <button
            key={`button-${item.value}`}
            onClick={() => {
              addBlankSection(undefined, item.value);
            }}
          >
            {item.icon && <item.icon />}
            {item.labelText}
          </button>
        );
      })}
    </div>
  );
};
