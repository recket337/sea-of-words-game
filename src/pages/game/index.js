import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { WordCells } from '../../components/word-cells';
import levels from '../../config/levels';
import { LetterCircle } from '../../components/letter-circle';
import { Success } from './components/success';

export function Game() {
  const [currentlevel, setCurrentlevel] = useState(1);
  const [words, setWords] = useState(levels[0]);
  const [remainingWords, setRemainingWords] = useState(words);
  const [successScreen, setSuccessScreen] = useState(false);

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
    setCurrentlevel(prev => prev + 1);
  }

  useEffect(() => {
    // const save = localStorage.get("save");
    // if (save) {
    //   setCurrentlevel(save.)
    // }
  }, [])

  useEffect(() => {
    if (!remainingWords.length) {
      setSuccessScreen(true);
    }
  }, [remainingWords])

  if (successScreen) {
    return (
      <Success passedLevel={currentlevel} onContinue={handleStartNewLevel} />
    )
  }

  return (
    <div className={styles.game}>
      <p className={styles.level}>Уровень {currentlevel}</p>
      <ul className={styles.words}>
        {words.map(word => (<li><WordCells word={word} guessed={!remainingWords.includes(word)} /></li>))}
      </ul>
      <LetterCircle words={words} guessWord={handleGuessWord} />
    </div>
  );
}
