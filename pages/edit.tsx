import { QuestionListWrapper } from "@/contexts/QuestionListContext";
import { PropsWithChildren } from "react";
import QuestionList from "@/components/QuestionList/QuestionList";
const EditPage = () => {
  return (
    <QuestionListWrapper>
      <QuestionList></QuestionList>
    </QuestionListWrapper>
  );
};
export default EditPage;
