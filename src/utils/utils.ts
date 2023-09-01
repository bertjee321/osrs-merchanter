import {
  FullList,
  Mapping,
  TradeDataHour,
  TradeDataLatest
} from "../models/app.models";

export const isNullOrUndefined = (data: any): boolean => {
  return data === undefined || data === null;
};

export const isNullUndefinedOrEmptyString = (data: any): boolean => {
  return data === undefined || data === null || data === "";
};

export const isNullUndefinedEmptyStringOrZero = (data: any): boolean => {
  return data === undefined || data === null || data === "" || data === 0;
};

export const combineMappingAndPriceLists = (
  mappedItems: Mapping[],
  hourPricesList: TradeDataHour[],
  latestPricesList: TradeDataLatest[]
): FullList[] => {
  const fullList: FullList[] = [];

  mappedItems.forEach((item) => {
    const tradedHour = hourPricesList.find((trade) => trade.id === item.id);
    const tradedLatest = latestPricesList.find((trade) => trade.id === item.id);

    if (tradedHour && tradedLatest) {
      fullList.push(createCombinedDataList(item, tradedHour, tradedLatest));
    }
  });

  return filterPriceList(fullList);
};

const createCombinedDataList = (
  itemMapping: Mapping,
  tradeDataHour: TradeDataHour,
  tradeDataLatest: TradeDataLatest
): FullList => {
  return {
    ...itemMapping,
    ...tradeDataHour,
    ...tradeDataLatest,
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

const filterPriceList = (data: FullList[]): FullList[] => {
  // filtering items out of list that do not have an avg. low/high price or volume in the past hour
  return data.filter(
    (item) =>
      !isNullUndefinedEmptyStringOrZero(item.avgLowPrice) &&
      !isNullUndefinedEmptyStringOrZero(item.avgHighPrice) &&
      !isNullUndefinedEmptyStringOrZero(item.highPriceVolume) &&
      !isNullUndefinedEmptyStringOrZero(item.lowPriceVolume)
  );
};
