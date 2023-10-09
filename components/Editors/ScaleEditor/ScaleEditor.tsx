import { Dropdown } from "@/components/Inputs/Dropdown/Dropdown";
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
  const startNumOptions = [];
  const endNumOptions = [];
  for (let i = 0; i <= 1; i++) {
    startNumOptions.push({ label: i.toString(), value: i.toString() });
  }
  for (let i = 2; i <= 10; i++) {
    endNumOptions.push({ label: i.toString(), value: i.toString() });
  }

  return (
    <div>
      <Dropdown
        items={startNumOptions}
        label={"Start Number"}
        value={scaleOptions.startNumber}
        name={"end-number"}
        onChange={(newVal) => {
          updateFn({ ...scaleOptions, startNumber: parseInt(newVal) });
        }}
        getIDFromItem={(item) => {
          return item.value;
        }}
        getLabelFromItem={(item) => {
          return item.label;
        }}
      />
      <Dropdown
        items={endNumOptions}
        label={"End Number"}
        value={scaleOptions.endNumber}
        name={"end-number"}
        onChange={(newVal) => {
          updateFn({ ...scaleOptions, endNumber: parseInt(newVal) });
        }}
        getIDFromItem={(item) => {
          return item.value;
        }}
        getLabelFromItem={(item) => {
          return item.label;
        }}
      />
      <TextInputLabeled
        value={scaleOptions.startLabel}
        labelText={"Start text"}
        placeholder={"ie 'Very Unhappy'"}
        updateFn={(newVal: string) => {
          updateFn({ ...scaleOptions, startLabel: newVal });
        }}
      />
      <TextInputLabeled
        value={scaleOptions.endLabel}
        labelText={"End text"}
        placeholder={"ie 'Very Happy'"}
        updateFn={(newVal: string) => {
          updateFn({ ...scaleOptions, endLabel: newVal });
        }}
      />
    </div>
  );
};

export default ScaleEditor;
