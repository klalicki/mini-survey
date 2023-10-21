"use client";
import { SectionListWrapper } from "@/contexts/SectionListContext";
import SectionList from "@/components/SectionList/SectionList";

const EditPage = () => {
  return (
    <main>
      <SectionListWrapper>
        <SectionList />
      </SectionListWrapper>
    </main>
  );
};
export default EditPage;
