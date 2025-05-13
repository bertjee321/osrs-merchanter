import { HourlyPriceEntry, PriceData } from "../models/app.models";
import axiosInstance from "./axios";

export const fetchHourPrices = async (): Promise<HourlyPriceEntry[]> => {
  const response = await axiosInstance.get<{
    data: { [key: number]: PriceData };
  }>(`/1h`);
  return transformHourlyPriceResponse(response.data);
};

const transformHourlyPriceResponse = (response: {
  data: Record<number, PriceData>;
}): Array<HourlyPriceEntry> => {
  return Object.entries(response.data).map(([id, priceData]) => ({
    id: Number(id),
    ...priceData,
  }));
};
