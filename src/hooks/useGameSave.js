import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export function useGameSave(currentlevel, words, remainingWords, changeCallback) {
  const defaultSave = {
    currentlevel,
    words,
    remainingWords
  }
  const [save, setSave, getPingedSave] = useLocalStorage("save", defaultSave);
  const [crossSaveModalState, setCrossSaveModalState] = useState(false);

  useEffect(() => {
    changeCallback(save);
  }, []);

  useEffect(() => {
    const check = setInterval(() => {
      const pingedSave = getPingedSave();
      const remeaningWordsCompare = pingedSave.remainingWords.sort().toString() === remainingWords.sort().toString();
      console.log(pingedSave.remainingWords.sort().toString(),'---', remainingWords.sort().toString())

      if (pingedSave.currentlevel !== currentlevel || !remeaningWordsCompare) {
        setCrossSaveModalState(true);
      }

    }, 3000);

    return () => clearInterval(check);
  }, [save, currentlevel. remainingWords])

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      const newSave = {
        currentlevel,
        words,
        remainingWords
      }

      setSave(newSave);
    }, 2000)
    
    return () => clearTimeout(saveTimeout);
  }, [remainingWords, currentlevel])

  const handleGameStateUpdate = () => {
    const pingedSave = getPingedSave();
    setSave(pingedSave);
    changeCallback(pingedSave);
    setCrossSaveModalState(false);
  }

  return [crossSaveModalState, handleGameStateUpdate]
}