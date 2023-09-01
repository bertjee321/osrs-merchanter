import {
  FullList,
  Mapping,
  TradeDataHour,
  TradeDataLatest,
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
    marginHour: calculateMargin(
      tradeDataHour.avgHighPrice,
      tradeDataHour.avgLowPrice
    ),
    marginLatest: calculateMargin(tradeDataLatest.high, tradeDataLatest.low),
    potential: calculatePotential(
      itemMapping.limit,
      tradeDataHour.highPriceVolume,
      tradeDataHour.lowPriceVolume,
      tradeDataLatest.high,
      tradeDataLatest.low
    ),
  };
};

const calculateMargin = (sellPrice: number, buyPrice: number): number => {
  if (sellPrice < 100) {
    // no tax for items < 100 gp each
    return sellPrice - buyPrice;
  }

  if (sellPrice > 499999999) {
    // tax capped at 5mil for items > 499,999,999 gp each
    return sellPrice - 5000000 - buyPrice;
  }

  // default 1% tax on each item
  return sellPrice * 0.99 - buyPrice;
};

const calculatePotential = (
  geLimit: number | undefined,
  volBuy: number,
  volSell: number,
  high: number,
  low: number
): number => {
  const averageVolume = (volBuy + volSell) / 2;
  const margin = calculateMargin(high, low);

  if (geLimit) {
    // if averageVolume is higher than GE limit, return geLimit * margin
    // else if averageVolume is lower than GE limit, return averageVolume * margin
    return averageVolume > geLimit ? geLimit * margin : averageVolume * margin;
  }

  return 0;
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
