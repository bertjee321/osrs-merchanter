import { Sort } from "../models/price-table.enums";
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

// Set initial sort state per table header, items should not be sorted at first (set to Sort.None)
export const initialSortState: Record<string, Sort> = Object.keys(
  tableHeaders
).reduce((acc, key) => {
  acc[key] = Sort.None;
  return acc;
}, {} as Record<string, Sort>);
