import { Sort } from "../enums/price-table.enums";
import { PriceDataMapping } from "./app.models";

export interface SortState {
  key: keyof PriceDataMapping | "";
  direction: Sort | undefined;
}
