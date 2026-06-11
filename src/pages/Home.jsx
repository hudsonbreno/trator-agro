import React, { useState } from 'react';
import { useTractor } from '../hooks/useTractor';
import { TractorCanvas } from '../components/Tractor/TractorCanvas';
import { Monitor } from '../components/UI/Monitor';
import { ControlPanel } from '../components/UI/ControlPanel';
import { Header } from '../components/Layout/Header';
import styles from './Home.module.css';

export const Home = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  
  const { tractor, setTarget, resetPosition, clearHistory } = useTractor(
    canvasSize.width / 2, canvasSize.height / 2, canvasSize.width, canvasSize.height
  );
  
  const handleTargetClick = (x, y) => {
    setTarget({ x, y });
  };
  
  const handleDragStart = (x, y) => {
    setIsDragging(true);
    setDragStart({ x, y });
    setDragEnd({ x, y });
  };
  
  const handleDragMove = (x, y) => {
    if (isDragging) {
      setDragEnd({ x, y });
    }
  };
  
  const handleDragEnd = () => {
    if (isDragging && dragStart && dragEnd) {
      const width = Math.abs(dragEnd.x - dragStart.x);
      const height = Math.abs(dragEnd.y - dragStart.y);
      
      if (width > 20 && height > 20) {
        // Área selecionada - pode ser usada para varredura futura
        console.log('Área selecionada:', { dragStart, dragEnd });
      }
    }
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };
  
  const getStatus = () => {
    return tractor.target ? "MOVING" : "IDLE";
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
        <TractorCanvas
          onTargetClick={handleTargetClick}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          isDragging={isDragging}
          dragStart={dragStart}
          dragEnd={dragEnd}
        />
      </div>
      
      <div className={styles.sidebar}>
        <Header />
        <Monitor tractor={tractor} status={getStatus()} />
        <ControlPanel 
          onReset={resetPosition}
          onClearPath={clearHistory}
        />
        <div className={styles.hint}>
          <b>Correção aplicada:</b><br />
          • Rodas independentes<br />
          • Trava de NaN (Anti-Sumiço)<br />
          • Rastro Vermelho Grosso
        </div>
      </div>
    </div>
  );
};