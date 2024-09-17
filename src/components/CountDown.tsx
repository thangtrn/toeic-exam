import { State } from "../enum";
import useCountDown from "../hooks/useCountDown";
import Button from "./Button";

interface CountdownProps {
   initialMinutes: number;
   onEnded?: () => void;
   onStart?: () => void;
   state: State;
}

const getReturnValues = (countDown: number) => {
   if (countDown <= 0) {
      return ["00", "00", "00"];
   }

   const hours = Math.floor(countDown / (60 * 60));
   const minutes = Math.floor((countDown % (60 * 60)) / 60);
   const seconds = Math.floor(countDown % 60);

   return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
   ];
};

const Countdown = ({ initialMinutes, onEnded, onStart, state }: CountdownProps) => {
   const { countDown, startCountDown, clearTimer } = useCountDown(initialMinutes, onEnded);
   const [hours, minutes, seconds] = getReturnValues(countDown);

   return (
      <div className="inline-flex gap-4">
         <div className="flex font-bold text-4xl">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
         </div>
         {state === State.start && (
            <Button
               onClick={() => {
                  startCountDown();
                  onStart?.();
               }}
            >
               Start
            </Button>
         )}

         {state === State.process && (
            <Button variant="dangerous" onClick={clearTimer}>
               End
            </Button>
         )}
      </div>
   );
};

export default Countdown;
