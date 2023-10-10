"use client";
import { SectionListWrapper } from "@/contexts/SectionListContext";
import SectionList from "@/components/SectionList/SectionList";
import { useRouter } from "next/router";
const EditPage = () => {
  const router = useRouter();
  const queryID = Object.keys(router.query)[0];
  console.log(queryID);
  return (
    <main>
      <SectionListWrapper>
        <SectionList />
      </SectionListWrapper>
    </main>
  );
};
export default EditPage;
