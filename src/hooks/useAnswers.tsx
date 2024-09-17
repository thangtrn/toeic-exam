import { useState } from "react";

interface IUseAnswersParams {
   from: number;
   to: number;
}

type IUseAnswersReturn = [
   IAnswer[],
   React.Dispatch<React.SetStateAction<IAnswer[]>>,
   () => void,
   (value: boolean) => void
];
const useAnswers = ({ from, to }: IUseAnswersParams): IUseAnswersReturn => {
   if (to < from) {
      throw new Error("'to' must be greater than or equal to 'from'");
   }

   const [answers, setAnswers] = useState<IAnswer[]>(() =>
      Array.from({ length: to - from + 1 }).map((_, index) => ({
         index: index + from,
         answer: null,
         isTrue: false,
      }))
   );

   const resetAnswers = () => {
      setAnswers(
         Array.from({ length: to - from + 1 }).map((_, index) => ({
            index: index + from,
            answer: null,
            isTrue: false,
         }))
      );
   };

   const setAllIsTrue = (value: boolean) => {
      setAnswers((prev) =>
         prev.map((answer) => ({
            ...answer,
            isTrue: value,
         }))
      );
   };

   return [answers, setAnswers, resetAnswers, setAllIsTrue];
};

export default useAnswers;
