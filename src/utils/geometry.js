export const distance = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const normalizeAngle = (angle) => {
  let normalized = angle;
  while (normalized < -Math.PI) normalized += Math.PI * 2;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  return normalized;
};

export const angleDifference = (target, current) => {
  let diff = target - current;
  diff = normalizeAngle(diff);
  return diff;
};

export const clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

export const radiansToDegrees = (rad) => {
  return rad * 57.2958;
};