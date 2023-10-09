import TextInput from "@/components/Inputs/TextInput/TextInput";
import { TextInputLabeled } from "@/components/Inputs/TextInput/TextInputLabeled";
import { ScaleOptions } from "@/types/SectionTypes";

const ScaleEditor = ({
  scaleOptions,
  updateFn,
}: {
  scaleOptions: ScaleOptions;
  updateFn: (newOptionsList: ScaleOptions) => void;
}) => {
  return (
    <div>
      <h2>scale editor</h2>

      <TextInputLabeled
        value={scaleOptions.startLabel}
        labelText={"Start text"}
        placeholder={"ie 'Very Unhappy'"}
        updateFn={undefined}
      />
      <TextInputLabeled
        value={scaleOptions.endLabel}
        labelText={"End text"}
        placeholder={"ie 'Very Happy'"}
        updateFn={undefined}
      />
    </div>
  );
};

export default ScaleEditor;
