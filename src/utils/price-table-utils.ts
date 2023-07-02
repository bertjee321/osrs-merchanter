import { Sort } from "../components/models/price-table.enums";
import { Filter } from "../components/models/price-table.models";
import { PriceDataMapping } from "../models/app.models";

export const filterItems = (data: PriceDataMapping[], filter: Filter) => {
  return data.filter((item) => {
    if (filter.name) {
      if (!item.name.toLowerCase().includes(filter.name.toLowerCase())) {
        return false;
      }
    }

    if (filter.minBuyPrice) {
      if (item.avgLowPrice < filter.minBuyPrice) {
        return false;
      }
    }

    if (filter.maxBuyPrice) {
      if (item.avgLowPrice > filter.maxBuyPrice) {
        return false;
      }
    }

    if (filter.minVolume) {
      if (
        item.highPriceVolume < filter.minVolume ||
        item.lowPriceVolume < filter.minVolume
      ) {
        return false;
      }
    }

    if (filter.minMargin) {
      if (item.margin < filter.minMargin) {
        return false;
      }
    }

    return true;
  });
};

export const sortItems = (
  data: PriceDataMapping[],
  sortItem: {
    [key: string]: Sort;
  }
): PriceDataMapping[] => {
  return data.sort((a, b) => {
    // Compare the properties based on the sortItem values
    if (sortItem.id !== Sort.None) {
      return sortItem.id === Sort.Ascending ? a.id - b.id : b.id - a.id;
    }

    if (sortItem.name !== Sort.None) {
      // Compare based on the "name" property
      return sortItem.name === Sort.Ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortItem.limit !== Sort.None) {
      // Compare based on the "limit" property
      return sortItem.limit === Sort.Ascending
        ? a.limit - b.limit
        : b.limit - a.limit;
    }

    if (sortItem.avgHighPrice !== Sort.None) {
      // Compare based on the "avgHighPrice" property
      return sortItem.avgHighPrice === Sort.Ascending
        ? a.avgHighPrice - b.avgHighPrice
        : b.avgHighPrice - a.avgHighPrice;
    }

    if (sortItem.highPriceVolume !== Sort.None) {
      // Compare based on the "highPriceVolume" property
      return sortItem.highPriceVolume === Sort.Ascending
        ? a.highPriceVolume - b.highPriceVolume
        : b.highPriceVolume - a.highPriceVolume;
    }

    if (sortItem.avgLowPrice !== Sort.None) {
      // Compare based on the "avgLowPrice" property
      return sortItem.avgLowPrice === Sort.Ascending
        ? a.avgLowPrice - b.avgLowPrice
        : b.avgLowPrice - a.avgLowPrice;
    }

    if (sortItem.lowPriceVolume !== Sort.None) {
      // Compare based on the "lowPriceVolume" property
      return sortItem.lowPriceVolume === Sort.Ascending
        ? a.lowPriceVolume - b.lowPriceVolume
        : b.lowPriceVolume - a.lowPriceVolume;
    }

    if (sortItem.margin !== Sort.None) {
      // Compare based on the "margin" property
      return sortItem.margin === Sort.Ascending
        ? a.margin - b.margin
        : b.margin - a.margin;
    }

    if (sortItem.potential !== Sort.None) {
      // Compare based on the "potential" property
      return sortItem.potential === Sort.Ascending
        ? a.potential - b.potential
        : b.potential - a.potential;
    }

    // If no sort criteria matched, maintain the original order
    return 0;
  });
};
