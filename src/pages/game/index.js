import { createElement, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { WordCells } from '../../components/word-cells';
import levels from '../../config/levels';
import { LetterCircle } from '../../components/letter-circle';
import { Success } from './components/success';
import { useGameSave } from '../../hooks/useGameSave';
import { createPortal } from 'react-dom';
import { CrossSaveModal } from '../../modals/cross-save';

// TODO: OPTIMIZATIONS

export function Game() {
  const [currentlevel, setCurrentLevel] = useState(1);
  const [words, setWords] = useState(levels[0]);
  const [remainingWords, setRemainingWords] = useState(words);
  const [successScreen, setSuccessScreen] = useState(false);

  useEffect(() => {
    if (!remainingWords.length) {
      setSuccessScreen(true);
    }
  }, [remainingWords])

  const handleSetGameData = (data) => {
    setCurrentLevel(data.currentlevel);
    setWords(data.words);
    setRemainingWords(data.remainingWords);
  }

  const [crossSaveModalState, handleGameStateUpdate] = useGameSave(currentlevel, words, remainingWords, handleSetGameData);

  const handleGuessWord = (guessedWord) => {
    if (remainingWords.includes(guessedWord)) {
      setRemainingWords(prev => prev.filter(word => word !== guessedWord));
    }
  }

  const handleStartNewLevel = () => {
    const newWords = levels[(currentlevel) % 3];
    setWords(newWords);
    setRemainingWords(newWords);
    setSuccessScreen(false);
    setCurrentLevel(prev => prev + 1);
  }

  if (successScreen) {
    return (
      <Success passedLevel={currentlevel} onContinue={handleStartNewLevel} />
    )
  }

  return (
    <>
      {crossSaveModalState && createPortal(
        createElement(
          CrossSaveModal,
          { onClose: handleGameStateUpdate }
        ),
        document.body
      )}
      <div className={styles.game}>
        <p className={styles.level}>Уровень {currentlevel}</p>
        <ul className={styles.words}>
          {words.sort((a, b) => a.length - b.length).map(word => (<li><WordCells word={word} guessed={!remainingWords.includes(word)} /></li>))}
        </ul>
        <LetterCircle words={words} guessWord={handleGuessWord} />
      </div>
    </>
  );
}
