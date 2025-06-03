import { useMemo } from "react";
import { Sort } from "../enums/price-table.enums";
import { PriceDataMapping } from "../models/app.models";
import { Filter } from "../models/price-table.models";
import { SortState } from "../models/sort-state.models";

interface UseFilteredAndSortedItemsProps {
  data: PriceDataMapping[];
  filter: Filter;
  sort: SortState;
}

export const useFilteredAndSortedItems = ({
  data,
  filter,
  sort,
}: UseFilteredAndSortedItemsProps): PriceDataMapping[] => {
  return useMemo(() => {
    const filtered = data.filter((item) => {
      if (
        filter.name &&
        !item.name.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        return false;
      }

      if (filter.minBuyPrice && item.avgLowPrice < filter.minBuyPrice) {
        return false;
      }

      if (filter.maxBuyPrice && item.avgLowPrice > filter.maxBuyPrice) {
        return false;
      }

      if (
        filter.minVolume &&
        item.highPriceVolume < filter.minVolume &&
        item.lowPriceVolume < filter.minVolume
      ) {
        return false;
      }

      if (filter.minMargin && item.margin < filter.minMargin) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      const key = sort.key;
      const direction = sort.direction;

      const aVal = (a as any)[key];
      const bVal = (b as any)[key];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === Sort.Ascending ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return direction === Sort.Ascending
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }, [data, filter, sort]);
};
