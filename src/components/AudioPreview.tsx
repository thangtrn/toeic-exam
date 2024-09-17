import { useState, useEffect, ChangeEvent } from "react";
import { State } from "../enum";
import Button from "./Button";

interface AudioPreviewProps {
   state: State;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ state }) => {
   const [audioSrc, setAudioSrc] = useState<string | null>(null);
   const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const url = URL.createObjectURL(file);
         setAudioSrc(url);
      }
   };

   const handleReset = () => {
      setAudioSrc(null);
   };

   useEffect(() => {
      if (state === State.process && audioSrc && audioRef) {
         audioRef.currentTime = 0; // Reset audio to the beginning
         audioRef.play(); // Play the audio
      }
   }, [state, audioSrc, audioRef]);

   return (
      <div className="w-full mb-3">
         <h3>Upload and Preview Audio</h3>
         <div className="flex gap-3 items-center">
            {!audioSrc ? (
               <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  disabled={state !== State.start}
               />
            ) : (
               <Button variant="dangerous" onClick={handleReset} disabled={state === State.process}>
                  Reset
               </Button>
            )}
            {audioSrc && (
               <div className="w-full">
                  <audio className="w-full" controls ref={(ref) => setAudioRef(ref)}>
                     <source src={audioSrc} type="audio/mpeg" />
                     Your browser does not support the audio element.
                  </audio>
               </div>
            )}
         </div>
      </div>
   );
};

export default AudioPreview;
