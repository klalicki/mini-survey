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
      <TextInput
        value={sectionData.title}
        placeholder="Section Title"
        className="self-start"
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
      <div className="flex gap-4 justify-between">
        <section className="border-2 border-accentB-200  min-w-[50%]">
          <h2 className=" bg-accentB-200 text-accentB-950 p-2 pt-1 pb-1">
            Preview:
          </h2>
          <div className="p-2">
            <SectionHeader section={sectionData} />
            <ViewPicker section={sectionData} />
          </div>
        </section>
        <button
          className=" self-end p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white"
          onClick={() => {
            deleteSection(sectionData.staticID);
          }}
        >
          <Delete />
        </button>
      </div>
    </article>
  );
};
export default EditSection;
