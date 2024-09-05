import React from 'react';
import styles from './styles.module.scss';

export const LetterCircle = ({ letters }) => {
  const radius = 135;

  return (
    <div className={styles.circleContainer}>
      {letters.map((letter, index) => {
        const angle = (index / letters.length) * (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return <li 
          className={styles.label} 
          key={index} 
          style={{
            transform: `translate(${x}px, ${y}px)`
          }}
        >
          <button
            className={styles.letter}
          >
          {letter.toUpperCase()}
          </button>
        </li>
      })}
    </div>
  );
};
