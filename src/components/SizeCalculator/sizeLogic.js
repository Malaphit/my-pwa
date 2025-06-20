import { SIZE_TABLE } from "./sizeTable";

export const SIZE_KEYS = Object.keys(SIZE_TABLE).map(Number).sort((a, b) =>
  SIZE_TABLE[a].length - SIZE_TABLE[b].length
);

export const findSizeByLength = (lengthMm, sandalMode = false) => {
  const [min, max] = sandalMode ? [4, 8] : [8, 13];
  for (const s of SIZE_KEYS) {
    const diff = SIZE_TABLE[s].length - lengthMm;
    if (diff >= min && diff <= max) return s;
  }

  for (const s of SIZE_KEYS) {
    const diff = SIZE_TABLE[s].length - lengthMm;
    if (diff >= min) return s;
  }
  return null;
};

export const calculateDeviations = (size, user) => {
  const data = SIZE_TABLE[size];
  return {
    length: data.length - user.length,
    punches: data.punches - user.punches,
    rise: data.rise - user.rise,
    diagonal: data.diagonal - user.diagonal,
  };
};

export const getRecommendation = (dev) => {
  const notes = [];
  if (dev.punches > 15 || dev.rise > 15) notes.push("Ширина или подъём слишком велики; рассмотрите меньший размер.");
  if (dev.punches < -10) notes.push("Пучки слишком малы.");
  if (dev.rise < -10) notes.push("Подъём слишком мал.");
  if (dev.diagonal < -15) notes.push("Косой проход слишком мал.");
  if (!notes.length) notes.push("Размер подходит отлично.");
  return notes;
};

export const getMatchColor = (dev) => {
  const bad = dev.punches < -10 || dev.punches > 15 || dev.rise < -10 || dev.rise > 15 || dev.diagonal < -15;
  const warning = dev.punches < 0 || dev.rise < 0 || dev.diagonal < 0;
  return bad ? "red" : warning ? "yellow" : "green";
};
