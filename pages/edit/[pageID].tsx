"use client";
import { SectionListWrapper } from "@/contexts/SectionListContext";
import SectionList from "@/components/SectionList/SectionList";
import { useRouter } from "next/router";
const EditPage = () => {
  const router = useRouter();


  return (
    <main>
      <SectionListWrapper>
        <SectionList />
      </SectionListWrapper>
    </main>
  );
};
export default EditPage;
