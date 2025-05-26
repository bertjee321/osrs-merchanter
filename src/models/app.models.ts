// Represents price-only data without an ID
export interface PriceData {
  avgHighPrice: number;
  highPriceVolume: number;
  avgLowPrice: number;
  lowPriceVolume: number;
}

// Represents a snapshot of price data from the hourly API
export interface TradeDataList extends PriceData {
  id?: number;
  margin: number; // Computed property (e.g., high - low)
  potential: number; // Computed property (e.g., margin * volume)
}

export interface HourlyPriceEntry extends PriceData {
  id: number;
}

// Represents static item metadata from the mapping API
export interface Mapping {
  id: number;
  name: string;
  examine: string;
  value: number;
  highalch: number;
  lowalch: number;
  limit: number;
  members: boolean;
  icon: string; // URL or path to the icon
}

// Combines Mapping metadata with price data (without redundant `id`)
export interface PriceDataMapping extends Mapping, Omit<TradeDataList, "id"> {}

export interface ItemPriceData {
  data: Record<
    string,
    {
      high: number;
      highTime: number;
      low: number;
      lowTime: number;
    }
  >;
}

export interface ItemTimeStampPrice extends PriceData {
  timestamp: string;
}
