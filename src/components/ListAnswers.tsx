import React, { useMemo } from "react";
import { State } from "../enum";

interface ListAnswersProps {
   state: State;
   answers: IAnswer[];
   setAnswers: React.Dispatch<React.SetStateAction<IAnswer[]>>;
}

const ListAnswers: React.FC<ListAnswersProps> = ({ state, answers, setAnswers }) => {
   const options = useMemo(() => ["A", "B", "C", "D"], []);

   const handleAnswerChange = (index: number, selectedAnswer: string) => {
      setAnswers((prev) =>
         prev.map((item, i) => (i === index ? { ...item, answer: selectedAnswer } : item))
      );
   };

   const handleCheckboxChange = (index: number) => {
      setAnswers((prev) =>
         prev.map((item, i) => (i === index ? { ...item, isTrue: !item.isTrue } : item))
      );
   };

   const classResult = (item: IAnswer) => {
      if (state !== State.showResult) return "";

      if (!item.answer) return "bg-gray-100";
      else if (item.answer && item.isTrue) return "bg-green-200";
      else return "bg-red-200";
   };

   return (
      <ul>
         {answers.map(({ index, answer, isTrue }, idx) => (
            <li
               className={`flex justify-between border-b py-2 ${classResult({
                  index,
                  answer,
                  isTrue,
               })}`}
               key={index}
            >
               <div className="flex gap-4 items-center">
                  <span className="w-12">{index}.</span>
                  {options.map((option) => (
                     <label
                        htmlFor={`${option}-${index}`}
                        key={`${option}-${index}`}
                        className="gap-2 flex items-center"
                     >
                        <input
                           disabled={state !== State.process}
                           type="radio"
                           name={`answer-${index}`}
                           id={`${option}-${index}`}
                           checked={answer === option}
                           onChange={() => handleAnswerChange(idx, option)}
                        />
                        <span>{option}</span>
                     </label>
                  ))}
               </div>
               {(state === State.done || state === State.showResult) && (
                  <input
                     type="checkbox"
                     checked={isTrue}
                     readOnly={state !== State.showResult}
                     onChange={() => state !== State.showResult && handleCheckboxChange(idx)}
                     className="mr-3"
                     aria-label={`Mark answer ${index} as true/false`}
                  />
               )}
            </li>
         ))}
      </ul>
   );
};

export default ListAnswers;
