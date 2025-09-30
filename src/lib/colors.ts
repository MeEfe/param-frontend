export const generateRandomColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
  const lightness = Math.floor(Math.random() * 20) + 45; // 45-65%
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};