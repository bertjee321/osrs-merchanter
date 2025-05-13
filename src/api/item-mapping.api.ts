import { PriceDataMapping } from "../models/app.models";
import axiosInstance from "./axios";

export const fetchItemMapping = async (): Promise<PriceDataMapping[]> => {
  const response = await axiosInstance.get<PriceDataMapping[]>("/mapping");
  return response.data;
};
