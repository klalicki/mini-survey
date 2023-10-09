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
      <p>{JSON.stringify(scaleOptions)}</p>
    </div>
  );
};

export default ScaleEditor;
