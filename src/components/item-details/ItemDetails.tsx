import React from "react";
import { useParams } from "react-router-dom";
import { fetchItemLatestPrice } from "../../api/get-item.api";
import { useFullItemsById } from "../../contexts/FullItemDetailsContext";
import { ItemPriceData } from "../../models/app.models";
import { BackButton } from "../../UI/buttons/BackButton";
import { AlchInfo } from "./alch-info/AlchInfo";
import { ItemActions } from "./item-actions/ItemActions";
import { PricesOverview } from "./prices-overview/PricesOverview";
import { ProfitCalculator } from "./profit-calculator/ProfitCalculator";
import { LoadingGrid } from "../../UI/loading-grid/LoadingGrid";

export const ItemDetails = () => {
  const { itemId } = useParams();
  const itemDetails = useFullItemsById(itemId!);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [latestTradeData, setLatestTradeData] = React.useState<ItemPriceData>({
    high: 0,
    highTime: 0,
    low: 0,
    lowTime: 0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);

      const tradeData = await fetchItemLatestPrice(itemId!);

      if (!tradeData) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setLatestTradeData(tradeData);
      setIsLoading(false);
    };

    fetchData();
  }, [itemId]);

  return (
    <div className="container mt-4">
      <BackButton additionalClass="mb-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">
          <img
            src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
            alt={itemDetails?.name}
          />
          {itemDetails?.name}
        </h2>
      </div>

      <ItemActions itemId={itemId!} />

      {isLoading && (
        <div className="text-center">
          <LoadingGrid />
          <h4>Fetching data ...</h4>
        </div>
      )}

      {hasError && (
        <div className="alert alert-danger" role="alert">
          Failed to fetch item details. Please try again later.
        </div>
      )}

      {!itemDetails && !isLoading && (
        <div className="alert alert-warning" role="alert">
          Item details not found.
        </div>
      )}

      {!isLoading && !hasError && itemDetails && (
        <>
        <PricesOverview data={{ latestTradeData, itemDetails: itemDetails! }} />

      {/* <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Price History</h5>
          <TimeSelector itemId={itemId!} />
          <PriceGraph />
        </div>
      </div> */}

      <div className="row align-items-stretch">
        <div className="col-md-6 mb-4 d-flex">
          <div className="card h-100 w-100 mb-4 shadow-sm">
            <ProfitCalculator
              prices={{
                average: {
                  buy: itemDetails?.avgLowPrice || 0,
                  sell: itemDetails?.avgHighPrice || 0,
                },
                snapshot: {
                  buy: latestTradeData.low,
                  sell: latestTradeData.high,
                },
              }}
            />
          </div>
        </div>
        <div className="col-md-6 mb-4 d-flex">
          <div className="card h-100 w-100 mb-4 shadow-sm">
            <AlchInfo itemDetails={itemDetails!} />
          </div>
        </div>
      </div>

      {/* <div className="card mb-4">
        <div className="card-body">
          <SetConversionInfo />
        </div>
      </div> */}
      </>
      )}
    
      
    </div>
  );
};
