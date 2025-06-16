import { SIZE_TABLE } from "./sizeTable";

export const findSizeByLength = (length, sandalMode = false) => {
  const [min, max] = sandalMode ? [4, 8] : [8, 13];
  const sizes = Object.keys(SIZE_TABLE).map(Number).sort((a, b) => SIZE_TABLE[a].length - SIZE_TABLE[b].length);

  for (let size of sizes) {
    const diff = SIZE_TABLE[size].length - length;
    if (diff >= min) return size;
  }

  return sizes[0] || null;
};

export const calculateDeviations = (size, user) => {
  const data = SIZE_TABLE[size];
  return {
    length: data.length - user.length,
    punches: data.punches - user.punches,
    rise: data.rise - user.rise,
    diagonal: data.diagonal - user.diagonal
  };
};

export const getRecommendation = (deviation, currentSize) => {
  let notes = [];

  const { punches, rise, diagonal } = deviation;
  const toNum = (v) => (typeof v === "number" ? v : Infinity);

  if (toNum(punches) > 15 || toNum(rise) > 15) {
    notes.push("Рекомендуется меньший размер (пучки или подъём слишком велики).");
  }

  if (punches < -10) notes.push("Пучки слишком малы, возможно, нужна стелька или другой размер.");
  if (rise < -10) notes.push("Подъём слишком мал.");
  if (diagonal < -15) notes.push("Косой проход слишком мал.");

  if (notes.length === 0) {
    if (punches >= 0 && punches <= 10 && rise >= 0 && rise <= 10 && diagonal >= -5 && diagonal <= 10) {
      notes.push("Размер подходит отлично.");
    } else {
      notes.push("Размер может подойти, но проверьте параметры.");
    }
  }

  return notes;
};
