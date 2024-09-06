import React from 'react';
import styles from './styles.module.scss';
import { Button } from '../button';

export const BaseModal = ({ children, title, buttonTitle, onClose }) => {
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.squareLeft}/>
        <div className={styles.squareRight}/>
        <h3 className={styles.title}>
          {title}
        </h3>
        {children}
        <Button className={styles.button} onClick={onClose}>{buttonTitle}</Button>
      </div>
    </div>
  );
};
