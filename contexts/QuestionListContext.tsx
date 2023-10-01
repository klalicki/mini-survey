import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  SurveyQuestion,
  CreateBlankSurveyQuestion,
} from "@/types/QuestionTypes";
import { loremIpsum } from "lorem-ipsum";
type QuestionListContextValues = {
  questionList: SurveyQuestion[];
  addBlankQuestion: Function;
  moveQuestion: Function;
  moveQuestionRelative: Function;
  moveQuestionById: Function;
  updateQuestion: Function;
};
const defaultValues: QuestionListContextValues = {
  questionList: [],
  addBlankQuestion: () => {},
  moveQuestion: () => {},
  moveQuestionRelative: () => {},
  moveQuestionById: () => {},
  updateQuestion: () => {},
};
export const QuestionListContext = createContext(defaultValues);
const QuestionListWrapper = (props: PropsWithChildren) => {
  const [questionList, setQuestionList] = useState([
    {
      questionType: "",
      text: loremIpsum({ count: 5 }),
      staticID: "a",
    },
    { questionType: "", text: loremIpsum({ count: 2 }), staticID: "b" },
    { questionType: "", text: loremIpsum({ count: 10 }), staticID: "c" },
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

  const updateQuestion = (questionId: string, newData: SurveyQuestion) => {
    const tempList = [...questionList];
    const targetIndex = tempList.findIndex((item) => {
      return item.staticID === questionId;
    });
    tempList[targetIndex] = newData;
    setQuestionList(tempList);
  };

  const moveQuestion = (questionIndex: number, targetIndex: number) => {
    console.log(`moving item ${questionIndex} to ${targetIndex}`);
    const itemToMove = questionList[questionIndex];
    const tempList = [...questionList];
    tempList.splice(questionIndex, 1);
    tempList.splice(targetIndex, 0, itemToMove);
    setQuestionList(tempList);
  };
  const moveQuestionRelative = (questionIndex: number, offset: number) => {
    moveQuestion(questionIndex, questionIndex + offset);
  };
  const moveQuestionById = (initialID: string, targetID: string) => {
    const initialIndex = questionList.findIndex((item) => {
      return item.staticID === initialID;
    });
    const targetIndex = questionList.findIndex((item) => {
      return item.staticID === targetID;
    });
    moveQuestion(initialIndex, targetIndex);
  };
  return (
    <QuestionListContext.Provider
      value={{
        questionList,
        addBlankQuestion,
        moveQuestion,
        moveQuestionRelative,
        moveQuestionById,
        updateQuestion,
      }}
    >
      {props.children}
    </QuestionListContext.Provider>
  );
};

export { QuestionListWrapper };
