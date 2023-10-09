import { PropsWithChildren, createContext, useContext, useState } from "react";
import { SurveySection, CreateBlankSection } from "@/types/SectionTypes";
import { loremIpsum } from "lorem-ipsum";
type SectionListContextValues = {
  sectionList: SurveySection[];
  addBlankSection: Function;
  moveSection: Function;
  moveSectionRelative: Function;
  moveSectionById: Function;
  updateSection: Function;
  getSectionById: Function;
  updateSectionMerge: Function;
};
const defaultValues: SectionListContextValues = {
  sectionList: [],
  addBlankSection: () => {},
  moveSection: () => {},
  moveSectionRelative: () => {},
  moveSectionById: () => {},
  updateSection: () => {},
  getSectionById: () => {},
  updateSectionMerge: () => {},
};
export const SectionListContext = createContext(defaultValues);
const SectionListWrapper = (props: PropsWithChildren) => {
  const [sectionList, setSectionList] = useState([
    {
      sectionType: "mc",
      text: "Section 1?",
      staticID: "a",
      MCOptions: [
        { text: "mc option 1", staticID: "a" },
        { text: "mc option 1", staticID: "b" },
        { text: "mc option 1", staticID: "c" },
      ],
    },
    { sectionType: "", text: "Section 2?", staticID: "b", MCOptions: [] },
    { sectionType: "", text: "Section 3?", staticID: "c", MCOptions: [] },
  ]);

  /**
   * The function `addBlankSection` adds a blank survey section to the section list.
   * @param {number} [index] - The `index` parameter is an optional parameter of type `number`. It is
   * used to specify the position at which the new section should be inserted in the `sectionList`
   * array. If the `index` parameter is provided, the new section will be inserted at that position in
   * the array. If not, the new quetion will be added at the end of the list.
   */
  const addBlankSection = (index?: number, type?: string) => {
    if (index !== undefined) {
      const firstSet = [...sectionList].slice(0, index);
      const secondSet = [...sectionList].slice(index);
      setSectionList([...firstSet, CreateBlankSection(type), ...secondSet]);
    } else {
      setSectionList([...sectionList, CreateBlankSection(type)]);
    }
  };

  /**
   * The function `getSectionById` takes a section ID as input and returns the corresponding survey
   * section object from a section list, if found.
   * @param {string} sectionId - A string representing the ID of the section you want to retrieve.
   * @returns The function `getSectionById` returns a `SurveySection` object or `undefined`.
   */
  const getSectionById = (sectionId: string): SurveySection | undefined => {
    return sectionList.find((item) => {
      return item.staticID === sectionId;
    });
  };

  const updateSection = (sectionId: string, newData: SurveySection) => {
    const tempList = [...sectionList];
    const targetIndex = tempList.findIndex((item) => {
      return item.staticID === sectionId;
    });
    tempList[targetIndex] = newData;
    setSectionList(tempList);
  };
  const updateSectionMerge = (
    sectionId: string,
    newData: Partial<SurveySection>
  ) => {
    const data = getSectionById(sectionId);
    if (data) {
      updateSection(sectionId, { ...data, ...newData });
    }
  };
  const moveSection = (sectionIndex: number, targetIndex: number) => {
    console.log(`moving item ${sectionIndex} to ${targetIndex}`);
    const itemToMove = sectionList[sectionIndex];
    const tempList = [...sectionList];
    tempList.splice(sectionIndex, 1);
    tempList.splice(targetIndex, 0, itemToMove);
    setSectionList(tempList);
  };
  const moveSectionRelative = (sectionIndex: number, offset: number) => {
    moveSection(sectionIndex, sectionIndex + offset);
  };
  const moveSectionById = (initialID: string, targetID: string) => {
    const initialIndex = sectionList.findIndex((item) => {
      return item.staticID === initialID;
    });
    const targetIndex = sectionList.findIndex((item) => {
      return item.staticID === targetID;
    });
    moveSection(initialIndex, targetIndex);
  };
  return (
    <SectionListContext.Provider
      value={{
        sectionList,
        addBlankSection,
        moveSection,
        moveSectionRelative,
        moveSectionById,
        getSectionById,
        updateSection,
        updateSectionMerge,
      }}
    >
      {props.children}
    </SectionListContext.Provider>
  );
};

export { SectionListWrapper };
