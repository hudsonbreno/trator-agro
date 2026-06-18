import React, { useEffect } from 'react';
import { useTractor } from '../../hooks/useTractor';
import { useCanvas } from '../../hooks/useCanvas';
import { drawGrid, drawTrail, drawTractor } from './TractorRenderer';
import styles from './Tractor.module.css';

export const TractorCanvas = ({ onTargetClick, onDragStart, onDragMove, onDragEnd, isDragging, dragStart, dragEnd }) => {
  const { tractor, updatePosition } = useTractor();
  
  const draw = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
    drawTrail(ctx, tractor.history);
    drawTractor(ctx, tractor);
    
    // Desenha retângulo de seleção durante arrasto
    if (isDragging && dragStart && dragEnd) {
      const xMin = Math.min(dragStart.x, dragEnd.x);
      const xMax = Math.max(dragStart.x, dragEnd.x);
      const yMin = Math.min(dragStart.y, dragEnd.y);
      const yMax = Math.max(dragStart.y, dragEnd.y);
      
      ctx.save();
      ctx.strokeStyle = '#ff9800';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
      ctx.fillStyle = 'rgba(255, 152, 0, 0.1)';
      ctx.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);
      ctx.restore();
    }
  };
  
  const canvasRef = useCanvas(draw);
  
  // Atualiza a posição do trator a cada frame
  useEffect(() => {
    const interval = setInterval(() => {
      updatePosition();
    }, 16);
    
    return () => clearInterval(interval);
  }, [updatePosition]);

  // Mostra o estado do trator no console
useEffect(() => {
  console.log('TRACTOR:', tractor);
}, [tractor]);
  
  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (onTargetClick) onTargetClick(x, y);
  };
  
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (onDragStart) onDragStart(x, y);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (onDragMove) onDragMove(x, y);
  };
  
  const handleMouseUp = () => {
    if (onDragEnd) onDragEnd();
  };
  
  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};