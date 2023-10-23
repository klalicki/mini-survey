import { SectionTypeData } from "@/types/SectionTypes";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useContext } from "react";

export const AddSections = () => {
  const { addBlankSection, isReady } = useContext(SectionListContext);
  return (
    <div className="add-new-section flex gap-2">
      {SectionTypeData.map((item) => {
        return (
          <button
            className="p-2 border-white border-2 rounded-md hover:text-black hover:bg-white"
            disabled={!isReady}
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
