export type Stone = {
  id: number;
  type: string;
  shape: string;
  clarity: string;
  color?: string;
};

export const shape = [
  "Round",
  "‌Princess",
  "‌Emerald",
  "‌Asscher",
  "‌Radiant",
  "‌Square‌",
  "‌Radiant",
  "‌Pear",
  "‌Oval‌",
];
export const color = [
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

export const clarity = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];
export const stoneTypes = ["Diamond", "Ruby", "Sapphire"];

const models = { shape, clarity, color };
export default models;
