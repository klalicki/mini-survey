import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  SurveyQuestion,
  CreateBlankSurveyQuestion,
} from "@/types/QuestionTypes";

type QuestionListContextValues = {
  questionList: SurveyQuestion[];
  addBlankQuestion: Function;
  moveQuestion: Function;
};
const defaultValues: QuestionListContextValues = {
  questionList: [],
  addBlankQuestion: () => {},
  moveQuestion: () => {},
};
export const QuestionListContext = createContext(defaultValues);
const QuestionListWrapper = (props: PropsWithChildren) => {
  const [questionList, setQuestionList] = useState([
    { questionType: "", text: "", staticID: "a" },
  ]);

  /**
   * The function `addBlankQuestion` adds a blank survey question to the question list.
   * @param {number} [index] - The `index` parameter is an optional parameter of type `number`. It is
   * used to specify the position at which the new question should be inserted in the `questionList`
   * array. If the `index` parameter is provided, the new question will be inserted at that position in
   * the array. If not, the new quetion will be added at the end of the list.
   */
  const addBlankQuestion = (index?: number) => {
    if (index !== undefined) {
      const firstSet = [...questionList].slice(0, index);
      const secondSet = [...questionList].slice(index);
      setQuestionList([...firstSet, CreateBlankSurveyQuestion(), ...secondSet]);
    } else {
      setQuestionList([...questionList, CreateBlankSurveyQuestion()]);
    }
  };
  const moveQuestion = (questionID: number, targetIndex: number) => {
    // console.log(`moving item at index ${questionID} to index ${targetIndex}`);
    const itemToMove = questionList[questionID];
    const tempList = [...questionList];
    tempList.splice(questionID, 1);
    tempList.splice(targetIndex, 0, itemToMove);
    setQuestionList(tempList);
  };

  return (
    <QuestionListContext.Provider
      value={{ questionList, addBlankQuestion, moveQuestion }}
    >
      {props.children}
    </QuestionListContext.Provider>
  );
};

export { QuestionListWrapper };
