import { AddSections } from "../AddSections/AddSections";
import SectionSort from "../SectionSort/SectionSort";
const SectionList = () => {
  return (
    <div>
      <h1>Section List</h1>
      <SectionSort></SectionSort>
      <AddSections />
    </div>
  );
};

export default SectionList;
