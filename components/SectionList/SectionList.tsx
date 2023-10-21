import { useContext } from "react";
import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
import { SectionListContext } from "@/contexts/SectionListContext";
import { SaveControls } from "../SaveControls/SaveControls";
const SectionList = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="bg-white p-4 flex flex-col gap-2 shadow-lg rounded-md">
        <div className="">
          <div className="eq-welcome">
            <h1 className=" text-2xl">Question Editor</h1>
            <h2 className="text-xl">build your survey</h2>
            <SaveControls />
          </div>
        </div>
        <SectionSort></SectionSort>
        <div className="eq-container centered">
          <div className="eq-final">
            <h2>Add new section:</h2>
            <AddSections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionList;
