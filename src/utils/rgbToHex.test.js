import rgbToHex from './rgbToHex';

test('rgbToHex', () => {
  expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
  expect(rgbToHex({ r: 111, g: 111, b: 111 })).toBe('#6f6f6f');
});
