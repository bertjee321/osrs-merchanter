import { Mapping, PriceDataMapping, TradeDataList } from "../models/app.models";

export const isNullOrUndefined = (data: any): boolean => {
  return data === undefined || data === null;
};

export const isNullUndefinedOrEmptyString = (data: any): boolean => {
  return data === undefined || data === null || data === "";
};

export const isNullUndefinedEmptyStringOrZero = (data: any): boolean => {
  return data === undefined || data === null || data === "" || data === 0;
};

export const combineMappingAndHourPricesList = (
  mappedItems: Mapping[],
  hourPricesList: TradeDataList[]
): PriceDataMapping[] => {
  const mappedHourPrices: PriceDataMapping[] = [];

  mappedItems.forEach((item) => {
    const itemTraded = hourPricesList.find((trade) => trade.id === item.id);
    if (itemTraded) {
      mappedHourPrices.push(createCombinedData(item, itemTraded));
    }
  });

  return filterList(mappedHourPrices);
};

const createCombinedData = (itemMapped: Mapping, itemTraded: TradeDataList) => {
  return {
    ...itemMapped,
    avgHighPrice: itemTraded.avgHighPrice,
    highPriceVolume: itemTraded.highPriceVolume,
    avgLowPrice: itemTraded.avgLowPrice,
    lowPriceVolume: itemTraded.lowPriceVolume,
    ...calculateMarginAndPotential(
      itemTraded.avgHighPrice,
      itemTraded.avgLowPrice,
      itemMapped.limit
    ),
  };
};

const calculateMarginAndPotential = (
  sellPrice: number,
  buyPrice: number,
  limit: number
): { margin: number; potential: number } => {
  const margin = sellPrice * 0.99 - buyPrice;
  const potential = margin * limit;

  return { margin, potential };
};

const filterList = (data: PriceDataMapping[]): PriceDataMapping[] => {
  // filtering items out of list that do not have an avg. low/high price or volume in the past hour
  return data.filter(
    (item) =>
      !isNullUndefinedEmptyStringOrZero(item.avgLowPrice) &&
      !isNullUndefinedEmptyStringOrZero(item.avgHighPrice) &&
      !isNullUndefinedEmptyStringOrZero(item.highPriceVolume) &&
      !isNullUndefinedEmptyStringOrZero(item.lowPriceVolume)
  );
};
