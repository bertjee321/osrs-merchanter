import { createContext, useContext } from "react";
import { PriceDataMapping } from "../models/app.models";

export const ItemMappingContext = createContext<PriceDataMapping[]>([]);

// Optional helper hook
export const useItemMapping = () => useContext(ItemMappingContext);
