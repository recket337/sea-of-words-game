import { useState } from 'react';
import './App.css';
import { WordCells } from './components/word-cells';
import levels from './config/levels';
import { LetterCircle } from './components/letter-circle';
import { getLettersFromLevelVocabulary } from './utils/getLettersFromLevelVocabulary';


function App() {
  const [currentlevel, setCurrentlevel] = useState(0);
  const [words, setWords] = useState(levels[currentlevel % 3].sort((a, b) => a.length - b.length));
  const [remainingWords, setRemainingWords] = useState(words);
  
  const letters = getLettersFromLevelVocabulary(words);
  console.log(letters);

  return (
    <div className="app">
      <p className='level'>Уровень {currentlevel + 1}</p>
      <ul className="words">
        {words.map(word => (<li><WordCells word={word} guessed={!remainingWords.includes(word)} /></li>))}
      </ul>
      <LetterCircle letters={letters} />
    </div>
  );
}

export default App;
