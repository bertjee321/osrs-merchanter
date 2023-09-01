export interface MappingResponseParameters {
  highalch: number;
  members: boolean;
  name: string;
  examine: string;
  id: number;
  value: number;
  icon: string;
  lowalch: number;
  limit?: number;
}

export interface HourPricesResponseParameters {
  avgHighPrice: number;
  highPriceVolume: number;
  avgLowPrice: number;
  lowPriceVolume: number;
}

export interface LatestPricesResponseParameters {
  high: number;
  highTime: number;
  low: number;
  lowtime: number;
}

export interface SharedParameters {
  id: string;
}

export interface Mapping extends SharedParameters {
  limit?: number;
  name: string;
}

export interface TradeDataHour
  extends HourPricesResponseParameters,
    SharedParameters {}

export interface TradeDataLatest extends SharedParameters {
  high: number;
  low: number;
}

export interface FullList extends Mapping, TradeDataHour, TradeDataLatest {
  marginHour?: number;
  marginLatest?: number;
  potential?: number;
}