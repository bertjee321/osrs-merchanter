import { Sort } from "../enums/price-table.enums";
import { Filter } from "../models/price-table.models";

// Define the table headers with their corresponding keys
export const tableHeaders = {
  id: "ID",
  name: "Name",
  limit: "Ge Limit",
  avgHighPrice: "Avg. High",
  highPriceVolume: "Vol. High",
  avgLowPrice: "Avg. Low",
  lowPriceVolume: "Vol. Low",
  margin: "Margin",
  potential: "Potential",
};

// Set initial filter state per table header, items should not be filtered at first (set to undefined)
export const initialFilterState: Filter = {
  name: undefined,
  minBuyPrice: undefined,
  maxBuyPrice: undefined,
  minVolume: undefined,
  minMargin: undefined,
};

export const initialSortState = {
  key: "name" as keyof typeof tableHeaders,
  direction: Sort.Descending
}