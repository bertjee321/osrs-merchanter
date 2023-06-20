import { TradeDataList } from "../models/app.models";

export const transformHourPricesData = (hourPricesData: {
  data: TradeDataList[];
}) => {
  const loadedHourPrices: TradeDataList[] = [];

  for (const key in hourPricesData.data) {
    loadedHourPrices.push({
      id: Number(key),
      ...hourPricesData.data[key],
    });
  }

  return loadedHourPrices;
};
