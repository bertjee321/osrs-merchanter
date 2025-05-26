import React from "react";
import { useParams } from "react-router-dom";
import { fetchItemLatestPrice } from "../../api/get-item.api";
import { useItemMapping } from "../../contexts/ItemMappingContext";
import { BackButton } from "../../UI/buttons/BackButton";
import { AlchInfo } from "./alch-info/AlchInfo";
import { ItemActions } from "./item-actions/ItemActions";
import { PriceGraph } from "./price-graph/PriceGraph";
import { PricesOverview } from "./prices-overview/PricesOverview";
import { ProfitCalculator } from "./profit-calculator/ProfitCalculator";
import { SetConversionInfo } from "./set-conversion-info/SetConversionInfo";
import { TimeSelector } from "./time-selector/TimeSelector";

export const ItemDetails = () => {
  console.log("ItemDetails component rendered");
  const { itemId } = useParams();
  const itemMapping = useItemMapping();
  const item = itemMapping.find((item) => item.id === Number(itemId));

  React.useEffect(() => {
    const fetchData = async () => {
      const tradeData = await fetchItemLatestPrice(itemId!);

      console.log("Trade data:", tradeData);
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
            alt={item?.name}
          />
          {item?.name}
        </h2>
      </div>

      <ItemActions itemId={itemId!} />
      <PricesOverview />

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Price History</h5>
          <TimeSelector itemId={itemId!} />
          <PriceGraph />
        </div>
      </div>

      <div className="row align-items-stretch">
        <div className="col-md-6 mb-4 d-flex">
          <div className="card h-100 w-100">
            <div className="card-body">
              <ProfitCalculator />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4 d-flex">
          <div className="card h-100 w-100">
            <div className="card-body">
              <AlchInfo />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <SetConversionInfo />
        </div>
      </div>
    </div>
  );
};
