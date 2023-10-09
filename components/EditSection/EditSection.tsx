import {
  MCOption,
  SectionTypeData,
  SurveySection,
} from "@/types/SectionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { SectionListContext } from "@/contexts/SectionListContext";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import MCEditor from "../Editors/MCEditor/MCEditor";
import { faCircleCheck, faFont } from "@fortawesome/free-solid-svg-icons";
const EditSection = ({
  sectionData,
  index,
}: {
  sectionData: SurveySection;
  index: number;
}) => {
  const { moveSectionRelative, updateSection, updateSectionMerge } =
    useContext(SectionListContext);

  return (
    <div className="eq-main">
      <TextInput
        value={sectionData.text}
        onChange={(newVal: string) => {
          updateSectionMerge(sectionData.staticID, { text: newVal });
        }}
      />

      <Select
        fieldName={`${sectionData.staticID}-type`}
        value={sectionData.sectionType}
        options={SectionTypeData}
        handleChange={(newVal: string) => {
          console.log(newVal);
          updateSection(sectionData.staticID, {
            ...sectionData,
            sectionType: newVal,
          });
        }}
      />

      {sectionData.sectionType === "mc" && (
        <MCEditor
          optionsList={sectionData.MCOptions}
          updateFn={(newOptions: Array<MCOption>) => {
            updateSectionMerge(sectionData.staticID, {
              MCOptions: newOptions,
            });
          }}
        />
      )}
      {sectionData.sectionType === "st" && <p>ST Edit Component</p>}
    </div>
  );
};
export default EditSection;
