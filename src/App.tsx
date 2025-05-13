import { useEffect, useState } from "react";
import useHttp from "../src/hooks/use-http";
import { PriceTable } from "./components/PriceTable";
import { Mapping, PriceDataMapping, TradeDataList } from "./models/app.models";
import { transformHourPricesData } from "./utils/api";
import { combineMappingAndHourPricesList } from "./utils/utils";

function App() {
  const { sendRequest: fetchMappingData } = useHttp();
  const { sendRequest: fetchHourPrices } = useHttp();

  const [hourPricesList, setHourPricesList] = useState<TradeDataList[]>([]);
  const [mappedItems, setMappedItems] = useState<Mapping[]>([]);
  const [fullList, setFullList] = useState<PriceDataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    const getTransformedMapping = (mappingData: Mapping[]) => {
      setMappedItems(mappingData);
    };
    const getTransformedHourPricesData = (hourPricesData: {
      data: TradeDataList[];
    }) => {
      setHourPricesList(transformHourPricesData(hourPricesData));
    };

    fetchMappingData(
      {
        url: "https://prices.runescape.wiki/api/v1/osrs/mapping",
      },
      getTransformedMapping
    );
    fetchHourPrices(
      {
        url: "https://prices.runescape.wiki/api/v1/osrs/1h",
      },
      getTransformedHourPricesData
    );
  };

  useEffect(() => {
    if (mappedItems.length > 0 && hourPricesList.length > 0) {
      combineLists();
    }
  }, [mappedItems, hourPricesList]);

  useEffect(() => {
    loadData();
  }, []);

  const combineLists = () => {
    setFullList(combineMappingAndHourPricesList(mappedItems, hourPricesList));
    setIsLoading(false);
  };

  return (
    <div className="container text-center">
      <PriceTable data={fullList} loading={isLoading} />
    </div>
  );
}

export default App;
