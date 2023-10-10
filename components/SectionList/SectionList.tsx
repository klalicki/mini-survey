import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
const SectionList = () => {
  return (
    <div className="app-wrapper">
      <div className="eq-container centered">
        <div className="eq-welcome">
          <h1>Welcome to the question editor.</h1>
          <h2>this is a subhead on the welcome section.</h2>
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
