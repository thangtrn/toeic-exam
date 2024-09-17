import { useEffect, useState, useCallback } from "react";
import ListAnswers from "./components/ListAnswers";
import useAnswers from "./hooks/useAnswers";
import { State } from "./enum";
import AudioPreview from "./components/AudioPreview";
import Button from "./components/Button";
import ExcelExport from "./components/ExcelExport";
import Countdown from "./components/CountDown";

const App = () => {
   const [state, setState] = useState<State>(State.start);

   const [listeningAnswers, setListeningAnswers] = useAnswers({ from: 1, to: 100 });
   const [writingAnswers, setWwwritingAnswers] = useAnswers({ from: 101, to: 200 });

   useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
         if (state === State.process) {
            e.preventDefault();
         }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [state]);

   const handleStart = useCallback(() => {
      setState(State.process);
   }, []);

   const handleShowResult = useCallback(() => {
      setState(State.showResult);
   }, []);

   const calcPoint = (answers: IAnswer[]) => {
      return answers.reduce((total, answer) => total + (answer.isTrue ? 5 : 0), 0);
   };

   const totalPoints = calcPoint(listeningAnswers) + calcPoint(writingAnswers);
   const listeningPoints = calcPoint(listeningAnswers);
   const writingPoints = calcPoint(writingAnswers);

   return (
      <div className="w-full max-w-[1200px] px-4 md:px-10 mx-auto min-h-screen">
         <header className="sticky top-0 bg-white border-b mb-3">
            <h3 className="text-2xl text-center font-bold mb-5">Toeic Test</h3>
            <div className="flex justify-between pb-2">
               <Countdown
                  initialMinutes={120} // 120p
                  state={state}
                  onStart={handleStart}
                  onEnded={() => setState(State.done)}
               />
               <div>
                  {state === State.done && (
                     <Button onClick={handleShowResult}>Submit Result</Button>
                  )}
                  {state === State.showResult && (
                     <>
                        <h3 className="font-bold text-2xl text-red-400">
                           Result: {totalPoints}/990
                        </h3>
                        <ExcelExport
                           listeningPoints={listeningPoints}
                           writingPoints={writingPoints}
                           listeningAnswers={listeningAnswers}
                           writingAnswers={writingAnswers}
                        />
                     </>
                  )}
               </div>
            </div>
         </header>
         <AudioPreview state={state} />
         <div className="flex flex-wrap gap-10">
            <div className="flex-1 text-center font-medium mb-2">
               <h3>
                  Listening{" "}
                  {state === State.showResult && (
                     <span className="text-red-400">- {listeningPoints}/495</span>
                  )}
               </h3>
               <ListAnswers
                  state={state}
                  answers={listeningAnswers}
                  setAnswers={setListeningAnswers}
               />
            </div>
            <div className="flex-1 text-center font-medium mb-2">
               <h3>
                  writing{" "}
                  {state === State.showResult && (
                     <span className="text-red-400">- {writingPoints}/495</span>
                  )}
               </h3>
               <ListAnswers
                  state={state}
                  answers={writingAnswers}
                  setAnswers={setWwwritingAnswers}
               />
            </div>
         </div>
      </div>
   );
};

export default App;
