const rgbToHex = ({ r, g, b }) => `#${[r, g, b].map((value) => {
  const hex = value.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}).join('')}`;

export default rgbToHex;
