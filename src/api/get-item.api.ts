import { ItemPriceData, ItemTimeStampPrice } from "../models/app.models";
import { TimeStep } from "../enums/item-details.enums";
import axiosInstance from "./axios";

export const fetchItemLatestPrice = async (
  id: string
): Promise<ItemPriceData> => {
  const response = await axiosInstance.get<{data: Record<string, ItemPriceData>}>(`/latest?id=${id}`);

  return response.data.data[id];
};

export const fetchItemTimeSeries = async (
  id: string,
  timeStep: TimeStep
): Promise<{ data: ItemTimeStampPrice[] }> => {
  const response = await axiosInstance.get<{ data: ItemTimeStampPrice[] }>(
    `/timeseries?id=${id}&timestep=${timeStep}`
  );

  return response.data;
};
