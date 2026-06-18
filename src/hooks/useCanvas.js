import { useRef, useEffect } from 'react';

export const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Ajusta tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth || 1200;
      canvas.height = canvas.offsetHeight || 800;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;

    const render = () => {
      draw(ctx, canvas);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return canvasRef;
};