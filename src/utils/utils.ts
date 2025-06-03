import { GE_TAX } from "../app.constants";
import {
  initialSortState,
  tableHeaders,
} from "../constants/price-table.constants";
import { Sort } from "../enums/price-table.enums";
import {
  HourlyPriceEntry,
  Mapping,
  PriceDataMapping,
} from "../models/app.models";
import { Filter } from "../models/price-table.models";
import { SortState } from "../models/sort-state.models";

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
  const taxes = sellPrice * GE_TAX;
  const margin = sellPrice - buyPrice - taxes;
  return Math.floor(margin);
};

function calculatePotential(
  geLimit: number,
  highVolume: number,
  lowVolume: number,
  margin: number
): number {
  if (!geLimit) {
    return 0; // Return 0 if geLimit is not provided
  }

  const avgVolumePer4h = ((highVolume + lowVolume) / 2) * 4;
  const realisticQuantity = Math.min(geLimit, avgVolumePer4h);

  const potential = realisticQuantity * margin;

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

const parseParam = (val: string | null) =>
  val === null || val.trim() === "" ? undefined : Number(val);

export const getFilterFromSearchParams = (params: URLSearchParams): Filter => ({
  name: params.get("itemName") || "",
  minBuyPrice: parseParam(params.get("minPrice")),
  maxBuyPrice: parseParam(params.get("maxPrice")),
  minVolume: parseParam(params.get("minVolume")),
  minMargin: parseParam(params.get("minMargin")),
});

export const getSortFromSearchParams = (params: URLSearchParams): SortState => {
  const sortParam = params.get("sort");

  if (sortParam) {
    const [key, value] = sortParam.split("-");

    return {
      key: key as keyof typeof tableHeaders,
      direction: value === Sort.Ascending ? Sort.Ascending : Sort.Descending,
    };
  } else {
    return initialSortState;
  }
};
