import { COLORS } from '../../utils/constants';

export const drawGrid = (ctx, canvas) => {
  ctx.save();
  ctx.strokeStyle = COLORS.GRID;
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  ctx.restore();
};

export const drawTrail = (ctx, history) => {
  if (history.length < 2) return;
  
  ctx.save();
  
  // Rastro principal
  ctx.beginPath();
  ctx.strokeStyle = COLORS.TRAIL;
  ctx.lineWidth = 24;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  const validPoints = history.filter(p => isFinite(p.x) && isFinite(p.y));
  if (validPoints.length > 0) {
    ctx.moveTo(validPoints[0].x, validPoints[0].y);
    for (let i = 1; i < validPoints.length; i++) {
      ctx.lineTo(validPoints[i].x, validPoints[i].y);
    }
    ctx.stroke();
  }
  
  // Efeito de brilho
  ctx.beginPath();
  ctx.strokeStyle = COLORS.TRAIL_GLOW;
  ctx.lineWidth = 32;
  if (validPoints.length > 0) {
    ctx.moveTo(validPoints[0].x, validPoints[0].y);
    for (let i = 1; i < validPoints.length; i++) {
      ctx.lineTo(validPoints[i].x, validPoints[i].y);
    }
    ctx.stroke();
  }
  ctx.restore();
};

export const drawTractor = (ctx, tractor) => {
  if (!isFinite(tractor.x) || !isFinite(tractor.y) || !isFinite(tractor.angle)) return;
  
  ctx.save();
  ctx.translate(tractor.x, tractor.y);
  ctx.rotate(tractor.angle);
  
  // Rodas traseiras
  ctx.fillStyle = COLORS.WHEEL;
  ctx.fillRect(-22, -24, 20, 11);
  ctx.fillRect(-22, 13, 20, 11);
  
  // Rodas dianteiras esquerda
  ctx.save();
  ctx.translate(18, -16);
  ctx.rotate(tractor.steerAngle);
  ctx.fillStyle = COLORS.WHEEL;
  ctx.fillRect(-8, -4, 16, 8);
  ctx.fillStyle = COLORS.WHEEL_HIGHLIGHT;
  ctx.fillRect(-3, -2, 6, 4);
  ctx.restore();
  
  // Rodas dianteiras direita
  ctx.save();
  ctx.translate(18, 16);
  ctx.rotate(tractor.steerAngle);
  ctx.fillStyle = COLORS.WHEEL;
  ctx.fillRect(-8, -4, 16, 8);
  ctx.fillStyle = COLORS.WHEEL_HIGHLIGHT;
  ctx.fillRect(-3, -2, 6, 4);
  ctx.restore();
  
  // Chassi
  const grad = ctx.createLinearGradient(-25, 0, 30, 0);
  grad.addColorStop(0, COLORS.CHASSIS_START);
  grad.addColorStop(1, COLORS.CHASSIS_END);
  ctx.fillStyle = grad;
  ctx.fillRect(-26, -14, 55, 28);
  
  // Capô
  ctx.fillStyle = COLORS.HOOD;
  ctx.fillRect(5, -11, 22, 22);
  
  // Cabine
  ctx.fillStyle = COLORS.CABIN;
  ctx.fillRect(-12, -12, 22, 24);
  ctx.fillStyle = COLORS.CABIN_GLASS;
  ctx.globalAlpha = 0.4;
  ctx.fillRect(-6, -10, 14, 20);
  ctx.globalAlpha = 1.0;
  
  // Faróis
  ctx.fillStyle = COLORS.LIGHTS;
  ctx.fillRect(26, -10, 4, 6);
  ctx.fillRect(26, 4, 4, 6);
  
  // Escapamento
  ctx.fillStyle = COLORS.EXHAUST;
  ctx.beginPath();
  ctx.arc(12, -15, 4, 0, 7);
  ctx.fill();
  
  ctx.restore();
};