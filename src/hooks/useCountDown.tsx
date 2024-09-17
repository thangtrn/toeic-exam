import { useEffect, useRef, useState } from "react";

const useCountDown = (initialMinutes: number, onEnded?: () => void) => {
   const timer = useRef<any | null>(null);
   const [countDown, setCountDown] = useState(initialMinutes * 60);
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      if (isActive) {
         timer.current = setInterval(() => {
            setCountDown((prevCountDown) => {
               if (prevCountDown <= 0) {
                  if (onEnded) onEnded();
                  clearInterval(timer.current as any);
                  timer.current = null;
                  return 0;
               }
               return prevCountDown - 1;
            });
         }, 1000);
      }

      return () => clearInterval(timer.current as any);
   }, [isActive, onEnded]);

   const startCountDown = () => {
      setIsActive(true);
   };

   const clearTimer = () => {
      if (timer.current) {
         clearInterval(timer.current);
         timer.current = null;
      }
      onEnded?.();
      setIsActive(false);
   };

   return { countDown, startCountDown, isActive, clearTimer };
};

export default useCountDown;
