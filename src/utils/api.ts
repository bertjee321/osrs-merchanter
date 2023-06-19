import { Mapping, TradeDataList } from "../models/app.models";

export const transformMappedData = (mappingData: Mapping[]) => {
  const loadedMapping: Mapping[] = [];

  for (const key in mappingData) {
    loadedMapping.push({ ...mappingData[key] });
  }

  return loadedMapping;
};

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
