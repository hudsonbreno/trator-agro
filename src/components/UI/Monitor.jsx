import React from 'react';
import { radiansToDegrees } from '../../utils/geometry';
import styles from './UI.module.css';

export const Monitor = ({ tractor, status }) => {
  return (
    <div className={styles.monitor}>
      <div>X: <span>{Math.round(tractor.x)}</span></div>
      <div>Y: <span>{Math.round(tractor.y)}</span></div>
      <div>ÂNGULO: <span>{Math.round(radiansToDegrees(tractor.angle))}</span>°</div>
      <div>STATUS: <span>{status}</span></div>
    </div>
  );
};