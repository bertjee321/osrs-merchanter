import { GE_TAX } from "../../../app.constants";
import { PriceDataMapping } from "../../../models/app.models";

interface PricesOverviewProps {
  data: {
    itemDetails: PriceDataMapping;
    latestTradeData: {
      high: number;
      highTime: number;
      low: number;
      lowTime: number;
    };
  };
}

export const PricesOverview = ({
  data: { itemDetails, latestTradeData },
}: PricesOverviewProps) => {
  const formatGp = (value: number) => `${value?.toLocaleString()} gp`;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const latestPriceTax = Math.floor(latestTradeData.high * GE_TAX);
  const latestPriceProfit =
    latestTradeData.high - latestTradeData.low - latestPriceTax;
  const hourPriceTax = Math.floor(itemDetails?.avgHighPrice * GE_TAX);
  const hourPriceProfit =
    itemDetails?.avgHighPrice - itemDetails?.avgLowPrice - hourPriceTax;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-center">
          {itemDetails?.name} - Price Overview
        </h5>

        <div className="row mt-3 text-center">
          {/* Live Snapshot */}
          <div className="col-md-6 border-end">
            <h6 className="text-muted">Latest Price Snapshot </h6>
            <div>
              Low: <strong>{formatGp(latestTradeData.low)}</strong> @{" "}
              {formatTime(latestTradeData.lowTime)}
            </div>
            <div>
              High: <strong>{formatGp(latestTradeData.high)}</strong> @{" "}
              {formatTime(latestTradeData.highTime)}
            </div>
            <div>
              GE Tax: <strong>{formatGp(latestPriceTax)}</strong>
            </div>
            <div
              className={`mt-2 text-${
                latestPriceProfit > 0 ? "success" : "danger"
              }`}
            >
              Profit/loss per flip:{" "}
              <strong>{formatGp(latestPriceProfit)}</strong>
            </div>
          </div>

          {/* Hourly Average */}
          <div className="col-md-6">
            <h6 className="text-muted">1 Hour Average with volume</h6>
            <div>
              Low: <strong>{formatGp(itemDetails?.avgLowPrice)}</strong> <i>({itemDetails?.lowPriceVolume})</i>
            </div>
            <div>
              High: <strong>{formatGp(itemDetails?.avgHighPrice)}</strong>  <i>({itemDetails?.highPriceVolume})</i>
            </div>
            <div>
              GE Tax: <strong>{formatGp(hourPriceTax)}</strong>
            </div>
            <div
              className={`mt-2 text-${
                hourPriceProfit > 0 ? "primary" : "danger"
              }`}
            >
              Average profit/loss: <strong>{formatGp(hourPriceProfit)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
