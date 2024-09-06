import React from 'react';
import styles from './styles.module.scss';
import { BaseModal } from '../../components/modal';

export const CrossSaveModal = ({ onClose }) => {
  return (
    <BaseModal title={"Две вкладки с игрой?"} buttonTitle={"Обновить"} onClose={onClose}>
      Похоже, игра открыта в 
      нескольких вкладках браузера.
      Чтобы продолжить играть в
      этой вкладке, обновите
      страницу.
    </BaseModal>
  );
};
