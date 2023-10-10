import { SurveySection } from "@/types/SectionTypes";

export const sampleData: SurveySection[] = [
  {
    sectionType: "mc",
    title: "This is a MC question",
    staticID: "a",
    MCOptions: [
      {
        text: "mc option 1",
        staticID: "a",
      },
      {
        text: "mc option 1",
        staticID: "b",
      },
      {
        text: "mc option 1",
        staticID: "c",
      },
    ],
    ScaleOptions: {
      startNumber: 1,
      endNumber: 5,
    },
  },
  {
    sectionType: "scale",
    title: "this is a scale 1-10",
    staticID: "b",
    MCOptions: [],
    ScaleOptions: {
      startNumber: 1,
      endNumber: 10,
      startLabel: "sad",
      endLabel: "happy",
    },
  },
  {
    sectionType: "st",
    title: "This is a short answer",
    staticID: "c",
    MCOptions: [],
    ScaleOptions: {
      startNumber: 1,
      endNumber: 5,
    },
  },
];
