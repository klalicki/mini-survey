import {
  MCOption,
  ScaleOptions,
  SectionTypeData,
  SurveySection,
} from "@/types/SectionTypes";
import { useContext, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { SectionListContext } from "@/contexts/SectionListContext";
import Select from "../Inputs/Select/Select";
import TextInput from "../Inputs/TextInput/TextInput";
import MCEditor from "../Editors/MCEditor/MCEditor";
import { Delete } from "@mui/icons-material";
import ScaleEditor from "../Editors/ScaleEditor/ScaleEditor";
import { ViewPicker } from "../Viewers/ViewPicker/ViewPicker";
import { STEditor } from "../Editors/STEditor/STEditor";
import { SectionHeader } from "../Viewers/QuestionHeader/SectionHeader";
const EditSection = ({
  sectionData,
  index,
}: {
  sectionData: SurveySection;
  index: number;
}) => {
  const {
    moveSectionRelative,
    updateSection,
    updateSectionMerge,
    deleteSection,
  } = useContext(SectionListContext);

  return (
    <div className="eq-main">
      <button className="delete-section">
        <Delete
          onClick={() => {
            deleteSection(sectionData.staticID);
          }}
        />
      </button>
      <TextInput
        value={sectionData.title}
        onChange={(newVal: string) => {
          updateSectionMerge(sectionData.staticID, { title: newVal });
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
      )}{" "}
      {sectionData.sectionType === "scale" && (
        <ScaleEditor
          updateFn={(newOptions: ScaleOptions) => {
            updateSectionMerge(sectionData.staticID, {
              ScaleOptions: newOptions,
            });
          }}
          scaleOptions={sectionData.ScaleOptions}
        />
      )}
      {sectionData.sectionType === "st" && <STEditor></STEditor>}
      <div>
        <h2>Previews:</h2>
        <SectionHeader section={sectionData} />
        <ViewPicker section={sectionData} />
      </div>
    </div>
  );
};
export default EditSection;
