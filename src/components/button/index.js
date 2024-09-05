import React from 'react';
import styles from './styles.module.scss';

export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>{children}</button>
  );
};
