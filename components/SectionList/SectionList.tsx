import { useContext } from "react";
import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
import { SectionListContext } from "@/contexts/SectionListContext";
import { SaveControls } from "../SaveControls/SaveControls";
const SectionList = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-accentA-50">
      <div className="bg-white  flex flex-col ml-4 mr-4 gap-2 shadow-lg rounded-md overflow-hidden max-w-2xl w-full">
        <div className=" bg-gradient-to-r from-accentA-200 to-accentB-200 text-white p-4">
          <div className="eq-welcome text-accentA-950">
            <h1 className=" text-2xl">Question Editor</h1>
            <h2 className="text-xl">build your survey</h2>
            <SaveControls />
          </div>
        </div>
        <SectionSort />
        <div className="bg-slate-600 text-white p-4">
          <div className="">
            <h2>Add new section:</h2>
            <AddSections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionList;
