import axiosInstance from "../axios";
import { fetchItemLatestPrice, fetchItemTimeSeries } from "../get-item.api";
import { TimeStep } from "../../enums/item-details.enums";
import { ItemPriceData, ItemTimeStampPrice } from "../../models/app.models";

// Mock the axios instance
jest.mock("../axios", () => ({
  get: jest.fn(),
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("get-item.api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchItemLatestPrice", () => {
    it("should make the correct GET request and return item price data", async () => {
      const id = "123";
      const fakeData: ItemPriceData = { price: 100, time: "2025-12-15T12:00:00Z" } as ItemPriceData;
      const response = { data: { data: { [id]: fakeData } } };
      mockedAxios.get.mockResolvedValue(response);

      const result = await fetchItemLatestPrice(id);

      expect(mockedAxios.get).toHaveBeenCalledWith(`/latest?id=${id}`);
      expect(result).toEqual(fakeData);
    });
  });

  describe("fetchItemTimeSeries", () => {
    it("should make the correct GET request and return the time series data", async () => {
      const id = "987";
      const timeStep = TimeStep.Day;
      const fakeTimeSeries: ItemTimeStampPrice[] = [
        { price: 120, time: "2025-12-09T00:00:00Z" } as ItemTimeStampPrice,
        { price: 130, time: "2025-12-10T00:00:00Z" } as ItemTimeStampPrice,
      ];
      const response = { data: fakeTimeSeries };
      mockedAxios.get.mockResolvedValue({ data: fakeTimeSeries });

      const result = await fetchItemTimeSeries(id, timeStep);

      expect(mockedAxios.get).toHaveBeenCalledWith(`/timeseries?id=${id}&timestep=${timeStep}`);
      expect(result).toEqual({ data: fakeTimeSeries });
    });
  });
});