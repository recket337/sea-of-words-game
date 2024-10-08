import styles from "./styles.module.scss";

export function LetterCell({ letter }) {  
  return (
    <div className={styles.cell} style={{ backgroundColor: letter ? '#65BD65' : '#F2F2F2'}}>
      {letter}
    </div>
  );
}