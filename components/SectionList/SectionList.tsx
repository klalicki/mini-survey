import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
const SectionList = () => {
  return (
    <div>
      <div className="eq-container">
        <div className="eq-welcome">
          <h1>Welcome to the question editor.</h1>
          <h2>this is a subhead on the welcome section.</h2>
        </div>
      </div>
      <SectionSort></SectionSort>
      <div className="eq-container">
        <div className="eq-main">
          <h2>Add new section:</h2>
          <AddSections />
        </div>
      </div>
    </div>
  );
};

export default SectionList;
