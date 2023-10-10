import { useContext } from "react";
import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
import { SectionListContext } from "@/contexts/SectionListContext";
import { SaveControls } from "../SaveControls/SaveControls";
const SectionList = () => {
  return (
    <div className="app-wrapper">
      <div className="eq-container centered">
        <div className="eq-welcome">
          <h1>Question Editor</h1>
          <h2>build your survey</h2>
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
  );
};

export default SectionList;
