import {
  HourPricesResponseParameters,
  LatestPricesResponseParameters,
  Mapping,
  MappingResponseParameters,
  TradeDataHour,
  TradeDataLatest
} from "../models/app.models";

export const transformMappingData = (
  mappingData: MappingResponseParameters[]
): Mapping[] => {
  const loadedMapping: Mapping[] = [];

  for (const key in mappingData) {
    loadedMapping.push({
      id: mappingData[key].id.toString(),
      limit: mappingData[key].limit,
      name: mappingData[key].name,
    });
  }

  return loadedMapping;
};

export const transformHourPricesData = (hourPricesData: {
  data: HourPricesResponseParameters[];
}): TradeDataHour[] => {
  const loadedHourPrices: TradeDataHour[] = [];

  for (const key in hourPricesData.data) {
    loadedHourPrices.push({
      id: key,
      ...hourPricesData.data[key],
    });
  }

  return loadedHourPrices;
};

export const transformLatestPricesData = (latestPricesData: {
  data: LatestPricesResponseParameters[];
}): TradeDataLatest[] => {
  const loadedLatestPrices: TradeDataLatest[] = [];

  for (const key in latestPricesData.data) {
    loadedLatestPrices.push({
      id: key,
      ...latestPricesData.data[key],
    });
  }

  return loadedLatestPrices;
};
