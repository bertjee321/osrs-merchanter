import { useEffect, useState } from "react";
import useHttp from "../src/hooks/use-http";
import {
  calculateMargin,
  isNullUndefinedEmptyStringOrZero,
} from "./utils/utils";
import { PriceTable } from "./components/PriceTable";

interface TradeDataList {
  id?: number;
  avgHighPrice?: number;
  highPriceVolume?: number;
  avgLowPrice?: number;
  lowPriceVolume?: number;
  margin?: number;
  potential?: number;
}

interface Mapping {
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

interface PriceDataMapping extends Mapping, TradeDataList {}

function App() {
  const { sendRequest: fetchMappingData } = useHttp();
  const { sendRequest: fetchHourPrices } = useHttp();

  const [hourPricesList, setHourPricesList] = useState<TradeDataList[]>([]);
  const [mappedItems, setMappedItems] = useState<Mapping[]>([]);
  const [fullList, setFullList] = useState<PriceDataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // Countdown timer

  const loadData = () => {
    setIsLoading(true);
    const transformMappedData = (mappingData: Mapping[]) => {
      const loadedMapping: Mapping[] = [];

      for (const key in mappingData) {
        loadedMapping.push({ ...mappingData[key] });
      }

      setMappedItems(loadedMapping);
    };

    const transformHourPricesData = (hourPricesData: {
      data: TradeDataList[];
    }) => {
      const loadedHourPrices: TradeDataList[] = [];

      for (const key in hourPricesData.data) {
        loadedHourPrices.push({
          id: Number(key),
          ...hourPricesData.data[key],
        });
      }

      setHourPricesList(loadedHourPrices);
    };

    fetchMappingData(
      {
        url: "https://prices.runescape.wiki/api/v1/osrs/mapping",
      },
      transformMappedData
    );

    fetchHourPrices(
      {
        url: "https://prices.runescape.wiki/api/v1/osrs/1h",
      },
      transformHourPricesData
    );
  };

  useEffect(() => {
    // Load data initially
    loadData();

    // Set up interval to load data every 60 seconds
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval and reset the timer when the component unmounts
    return () => {
      clearInterval(intervalId);
      setRemainingTime(60);
    };
  }, []);

  useEffect(() => {
    if (mappedItems.length > 0 && hourPricesList.length > 0) {
      combineLists();
    }
  }, [mappedItems, hourPricesList]);

  useEffect(() => {
    if (mappedItems.length > 0 && hourPricesList.length > 0) {
      combineLists();
    }
  }, [mappedItems, hourPricesList]);

  useEffect(() => {
    if (remainingTime === 0) {
      // Time has reached 0, perform the desired action
      // For example, reload data or call a function
      loadData();
      setRemainingTime(60); // Reset the timer to 60 seconds
    }
  }, [remainingTime, loadData]);

  const combineLists = () => {
    const tempArray: PriceDataMapping[] = [];

    mappedItems.map((item) => {
      const combinedData = createCombinedData(item);
      const updatedCombinedData = calculateMarginAndPotential(combinedData);

      tempArray.push(updatedCombinedData);
    });

    setFullList(filterList(tempArray));
    setIsLoading(false);
  };

  const createCombinedData = (item: Mapping): PriceDataMapping => {
    const itemTraded = hourPricesList.find((trade) => trade.id === item.id);

    return {
      ...item,
      avgHighPrice: itemTraded ? itemTraded.avgHighPrice : 0,
      highPriceVolume: itemTraded ? itemTraded.highPriceVolume : 0,
      avgLowPrice: itemTraded ? itemTraded.avgLowPrice : 0,
      lowPriceVolume: itemTraded ? itemTraded.lowPriceVolume : 0,
    };
  };

  const calculateMarginAndPotential = (
    combinedData: PriceDataMapping
  ): PriceDataMapping => {
    const { avgHighPrice, avgLowPrice, limit } = combinedData;

    const margin =
      avgHighPrice !== undefined && avgLowPrice !== undefined
        ? calculateMargin(avgHighPrice, avgLowPrice)
        : 0;

    const potential = limit ? margin * limit : 0;

    return { ...combinedData, margin, potential };
  };

  const filterList = (data: PriceDataMapping[]) => {
    return data.filter(
      (item) =>
        !isNullUndefinedEmptyStringOrZero(item.avgLowPrice) &&
        !isNullUndefinedEmptyStringOrZero(item.avgHighPrice) &&
        !isNullUndefinedEmptyStringOrZero(item.highPriceVolume) &&
        !isNullUndefinedEmptyStringOrZero(item.lowPriceVolume)
    );
  };

  const onRefresh = () => {
    loadData();
    setRemainingTime(60);
  };

  return (
    <div className="container text-center">
      <PriceTable data={fullList} loading={isLoading} time={remainingTime} refresh={onRefresh} />
    </div>
  );
}

export default App;
