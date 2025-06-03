import { createContext, useContext } from "react";
import { PriceDataMapping } from "../models/app.models";

export const FullItemsDetailsContext = createContext<PriceDataMapping[]>([]);

// Optional helper hook
export const useFullItemsDetails = () => useContext(FullItemsDetailsContext);

export const useFullItemsById = (id: string): PriceDataMapping | undefined => {
  const fullItemsDetails = useFullItemsDetails();
  return fullItemsDetails.find((item) => item.id.toString() === id);
};
