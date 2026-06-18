import { useState, useCallback, useRef } from 'react';
import { distance, normalizeAngle, angleDifference, clamp } from '../utils/geometry';
import { CONFIG } from '../utils/constants';

export const useTractor = (
  initialX,
  initialY,
  canvasWidth = 1200,
  canvasHeight = 800
) => {
  const [tractor, setTractor] = useState({
    x: initialX ?? canvasWidth / 2,
    y: initialY ?? canvasHeight / 2,
    angle: 0,
    speed: 0,
    target: null,
    steerAngle: 0,
    history: []
  });
  
  const animationRef = useRef(null);
  
  const updatePosition = useCallback(() => {
    setTractor(prev => {
      let newState = { ...prev };
      
      if (newState.target) {
        const distToTarget = distance(newState.target, { x: newState.x, y: newState.y });
        
        if (distToTarget > CONFIG.TARGET_DISTANCE) {
          const dx = newState.target.x - newState.x;
          const dy = newState.target.y - newState.y;
          const targetAngle = Math.atan2(dy, dx);
          let diff = angleDifference(targetAngle, newState.angle);
          
          newState.steerAngle = clamp(diff * CONFIG.STEER_SENSITIVITY, 
            -CONFIG.STEER_ANGLE_MAX, CONFIG.STEER_ANGLE_MAX);
          
          newState.angle = normalizeAngle(newState.angle + newState.steerAngle * CONFIG.STEER_ANGLE_SPEED);
          
          if (newState.speed < CONFIG.MAX_SPEED) {
            newState.speed += CONFIG.ACCEL;
          }
          
          let newX = newState.x + Math.cos(newState.angle) * newState.speed;
          let newY = newState.y + Math.sin(newState.angle) * newState.speed;
          
          const margin = CONFIG.MARGIN;
          newX = clamp(newX, margin, canvasWidth - margin);
          newY = clamp(newY, margin, canvasHeight - margin);
          
          if (isFinite(newX) && isFinite(newY)) {
            newState.x = newX;
            newState.y = newY;
            newState.history = [...newState.history.slice(-CONFIG.HISTORY_LIMIT), { x: newX, y: newY }];
          }
        } else {
          newState.target = null;
          newState.speed = 0;
          newState.steerAngle = 0;
        }
      } else {
        if (newState.speed > 0) {
          newState.speed = Math.max(0, newState.speed - 0.05);
        }
      }
      
      // Validação anti-sumico
      if (!isFinite(newState.x) || !isFinite(newState.y) || !isFinite(newState.angle)) {
        return {
          x: canvasWidth / 2,
          y: canvasHeight / 2,
          angle: 0,
          speed: 0,
          target: null,
          steerAngle: 0,
          history: []
        };
      }
      
      return newState;
    });
  }, [canvasWidth, canvasHeight]);
  
  const setTarget = useCallback((target) => {
    setTractor(prev => ({ ...prev, target }));
  }, []);
  
  const resetPosition = useCallback(() => {
    setTractor({
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      angle: 0,
      speed: 0,
      target: null,
      steerAngle: 0,
      history: []
    });
  }, [canvasWidth, canvasHeight]);
  
  const clearHistory = useCallback(() => {
    setTractor(prev => ({ ...prev, history: [] }));
  }, []);
  
  return {
    tractor,
    setTarget,
    resetPosition,
    clearHistory,
    updatePosition
  };
};