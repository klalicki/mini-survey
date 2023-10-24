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
    <article className="eq-main relative flex flex-col gap-2">
      <button
        className=" absolute right-0 bottom-0"
        onClick={() => {
          deleteSection(sectionData.staticID);
        }}
      >
        <Delete />
      </button>
      <TextInput
        value={sectionData.title}
        placeholder="Section Title"
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
      <section className="border-2 border-slate-300 ">
        <h2 className=" bg-slate-300 p-2">Preview:</h2>
        <div className="p-2">
          <SectionHeader section={sectionData} />
          <ViewPicker section={sectionData} />
        </div>
      </section>
    </article>
  );
};
export default EditSection;
