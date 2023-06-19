export interface TradeDataList {
  id?: number;
  avgHighPrice?: number;
  highPriceVolume?: number;
  avgLowPrice?: number;
  lowPriceVolume?: number;
  margin?: number;
  potential?: number;
}

export interface Mapping {
  examine: string;
  highalch: number;
  icon: string;
  id?: number;
  limit: number;
  lowalch: number;
  members: boolean;
  name: string;
  value: number;
}

export interface PriceDataMapping extends Mapping, TradeDataList {}
