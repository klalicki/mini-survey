"use client";
import { QuestionListWrapper } from "@/contexts/SectionListContext";
import { PropsWithChildren } from "react";
import QuestionList from "@/components/QuestionList/QuestionList";
const EditPage = () => {
  return (
    <QuestionListWrapper>
      <QuestionList />
    </QuestionListWrapper>
  );
};
export default EditPage;
