import { useEffect, useState } from "react";
import useHttp from "../src/hooks/use-http";
import { combineMappingAndHourPricesList } from "./utils/utils";
import { PriceTable } from "./components/PriceTable";
import { Mapping, PriceDataMapping, TradeDataList } from "./models/app.models";
import { transformHourPricesData } from "./utils/api";

function App() {
  const { sendRequest: fetchMappingData } = useHttp();
  const { sendRequest: fetchHourPrices } = useHttp();

  const [hourPricesList, setHourPricesList] = useState<TradeDataList[]>([]);
  const [mappedItems, setMappedItems] = useState<Mapping[]>([]);
  const [fullList, setFullList] = useState<PriceDataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // Countdown timer 5 min

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
    // Load data initially
    loadData();

    // Set up interval to load data every 300 seconds
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval and reset the timer when the component unmounts
    return () => {
      clearInterval(intervalId);
      setRemainingTime(300);
    };
  }, []);

  useEffect(() => {
    if (mappedItems.length > 0 && hourPricesList.length > 0) {
      combineLists();
    }
  }, [mappedItems, hourPricesList]);

  useEffect(() => {
    if (remainingTime === 0) {
      // Time has reached 0, reload data and reset timer to 300 seconds
      loadData();
      setRemainingTime(300);
    }
  }, [remainingTime, loadData]);

  const combineLists = () => {
    setFullList(combineMappingAndHourPricesList(mappedItems, hourPricesList));
    setIsLoading(false);
  };

  const onRefresh = () => {
    loadData();
    setRemainingTime(300);
  };

  return (
    <div className="container text-center">
      <PriceTable
        data={fullList}
        loading={isLoading}
        time={remainingTime}
        refresh={onRefresh}
      />
    </div>
  );
}

export default App;
