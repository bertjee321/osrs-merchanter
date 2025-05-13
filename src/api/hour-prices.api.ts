import { PriceData, TradeDataList } from "../models/app.models";
import axiosInstance from "./axios";

export const fetchHourPrices = async (): Promise<{
  data: { [key: number]: PriceData };
}> => {
  const response = await axiosInstance.get<{
    data: { [key: number]: PriceData };
  }>(`/1h`);
  return response.data;
};
