import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SurveySection,
  CreateBlankSection,
  SurveyDataset,
} from "@/types/SectionTypes";
import { sampleData } from "@/utils/sampleData";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
type SectionListContextValues = {
  isSynced: boolean;
  isReady: boolean;
  sectionList: SurveySection[];
  addBlankSection: Function;
  moveSection: Function;
  moveSectionRelative: Function;
  moveSectionById: Function;
  updateSection: Function;
  getSectionById: Function;
  updateSectionMerge: Function;
  deleteSection: Function;
  loadFromServer: Function;
  saveToServer: Function;
  getEditLink: Function;
};
const defaultValues: SectionListContextValues = {
  isSynced: false,
  isReady: false,
  sectionList: [],
  addBlankSection: () => {},
  moveSection: () => {},
  moveSectionRelative: () => {},
  moveSectionById: () => {},
  updateSection: () => {},
  getSectionById: () => {},
  updateSectionMerge: () => {},
  deleteSection: () => {},
  loadFromServer: () => {},
  saveToServer: () => {},
  getEditLink: () => {},
};
export const SectionListContext = createContext(defaultValues);
export const SectionListWrapper = (props: PropsWithChildren) => {
  const [surveyData, setSurveyData] = useState<SurveyDataset>({ sections: [] });
  // const [sectionList, setSectionList] = useState<SurveySection[]>([]);
  const sectionList = surveyData.sections;
  const setSectionList = (newSectionList: SurveySection[]) => {
    setSurveyData({ ...surveyData, sections: newSectionList });
  };
  const [docID, setDocID] = useState("");
  const [isSynced, setIsSynced] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("list updated!");
    saveToServer();
    // eslint-disable-next-line
  }, [sectionList]);
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

  const deleteSection = (sectionId: string) => {
    const tempList = [...sectionList];
    setSectionList(
      tempList.filter((item) => {
        return item.staticID !== sectionId;
      })
    );
  };

  const getEditLink = () => {
    return docID;
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
  const saveToServer = async () => {
    console.log("saving to id " + docID);
    setIsSynced(false);
    try {
      await axios.put(
        "/api/survey/edit",
        { ...surveyData },
        { params: { id: docID } }
      );
      setTimeout(() => {
        setIsSynced(true);
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };
  const loadFromServer = async (id: string) => {
    console.log("trying to load " + id);
    try {
      const newData = await axios.get(`/api/survey/edit`, {
        params: { id: id },
      });
      setDocID(id);
      console.log("date from server:");
      console.log(newData.data);
      setSurveyData(newData.data);
      setIsReady(true);
    } catch (error: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 404) {
          console.log("hit 404 error trying to load");
          const newResponse = await axios.post("/api/survey/new");
          console.log("got new docID:" + newResponse.data.id);
          router.push("/edit?" + newResponse.data.id, undefined, {
            shallow: true,
          });
          loadFromServer(newResponse.data.id);
        }
      }
      console.log(error);
    }
  };
  return (
    <SectionListContext.Provider
      value={{
        isReady,
        sectionList,
        addBlankSection,
        moveSection,
        moveSectionRelative,
        moveSectionById,
        getSectionById,
        updateSection,
        updateSectionMerge,
        deleteSection,
        loadFromServer,
        saveToServer,
        getEditLink,
        isSynced,
      }}
    >
      {props.children}
    </SectionListContext.Provider>
  );
};
