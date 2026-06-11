import React from 'react';
import styles from './UI.module.css';

export const ControlPanel = ({ onReset, onClearPath }) => {
  return (
    <div className={styles.controlPanel}>
      <button onClick={onReset} className={styles.btnPrimary}>
        RESETAR POSIÇÃO
      </button>
      <button onClick={onClearPath} className={styles.btnSecondary}>
        LIMPAR RASTRO
      </button>
    </div>
  );
};