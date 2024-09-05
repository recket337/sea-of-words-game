
import { LetterCell } from "./components/letter-cell";
import styles from "./styles.module.scss" ;

export function WordCells({ word, guessed }) {

  console.log(word)

  return (
    <div className={styles.word}>
      {word.toUpperCase().split('').map(letter => (<LetterCell letter={guessed ? letter : undefined}/>))}
    </div>
  );
}