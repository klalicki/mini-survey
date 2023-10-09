import { SectionListContext } from "@/contexts/SectionListContext";
import { useContext } from "react";
const ButtonAddSection = ({ index }: { index?: number }) => {
  const { addBlankSection } = useContext(SectionListContext);
  return (
    <button
      onClick={() => {
        addBlankSection(index);
      }}
    >
      Add at index {index}
    </button>
  );
};

export default ButtonAddSection;
