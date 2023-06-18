export const isNullUndefinedEmptyStringOrZero = (data: any): boolean => {
  return data === undefined || data === null || data === "" || data === 0;
};

export const calculateMargin = (
  sellPrice: number,
  buyPrice: number
): number => {
  return sellPrice * 0.99 - buyPrice;
};
