import { useContext } from "react";
import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
import { SectionListContext } from "@/contexts/SectionListContext";
import { SaveControls } from "../SaveControls/SaveControls";
const SectionList = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-accentA-300">
      <div className="bg-accentA-50  flex flex-col ml-4 mr-4 gap- shadow-lg rounded-md overflow-hidden max-w-2xl w-full">
        <div className=" bg-gradient-to-r from-accentA-200 to-accentB-200 text-white p-4">
          <div className="eq-welcome text-accentA-950">
            <h1 className=" text-3xl font-bold">Question Editor</h1>
            <h2 className="text-xl mb-3">build your survey</h2>
            <SaveControls />
          </div>
        </div>
        <SectionSort />
        <div className="bg-gradient-to-r from-accentA-200 to-accentB-200 text-accentA-950 p-4 flex flex-col gap-3">
          <h2>Add new section:</h2>
          <AddSections />
        </div>
      </div>
    </div>
  );
};

export default SectionList;
