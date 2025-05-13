import {
  HourlyPriceEntry,
  Mapping,
  PriceDataMapping,
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

export const combineMappingAndHourPricesList = (
  mappedItems: Mapping[],
  hourPricesList: Array<HourlyPriceEntry>
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

const createCombinedData = (
  itemMapped: Mapping,
  itemTraded: HourlyPriceEntry
) => {
  const { avgHighPrice, highPriceVolume, avgLowPrice, lowPriceVolume } =
    itemTraded;
  const { limit: geLimit } = itemMapped;

  const margin = calculateMargin(avgHighPrice, avgLowPrice);
  const potential = calculatePotential(
    geLimit,
    highPriceVolume,
    lowPriceVolume,
    margin
  );

  return {
    ...itemMapped,
    avgHighPrice,
    highPriceVolume,
    avgLowPrice,
    lowPriceVolume,
    margin,
    potential,
  };
};

const calculateMargin = (sellPrice: number, buyPrice: number) => {
  const margin = sellPrice * 0.99 - buyPrice;
  return Math.floor(margin);
};

function calculatePotential(
  geLimit: number,
  highVolume: number,
  lowVolume: number,
  margin: number
): number {
  const avgVolumePer4h = ((highVolume + lowVolume) / 2) * 4;
  const realisticQuantity = Math.min(geLimit, avgVolumePer4h);
  const confidence =
    Math.min(highVolume, lowVolume) / Math.max(highVolume, lowVolume);

  const potential = realisticQuantity * margin * confidence;

  return Math.floor(potential); // afronden op hele GP
}

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
