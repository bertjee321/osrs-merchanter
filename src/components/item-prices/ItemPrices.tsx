import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import {
  FullList,
  HourPricesResponseParameters,
  LatestPricesResponseParameters,
  Mapping,
  MappingResponseParameters,
  TradeDataHour,
  TradeDataLatest
} from "../../models/app.models";
import {
  transformHourPricesData,
  transformLatestPricesData,
  transformMappingData,
} from "../../utils/api";
import { combineMappingAndPriceLists } from "../../utils/utils";
import { ItemPricesList } from "./ItemPricesList";

export const ItemPrices = () => {
  const { sendRequest: fetchMappingData } = useHttp();
  const { sendRequest: fetchHourPrices } = useHttp();
  const { sendRequest: fetchLatestPrices } = useHttp();

  const [mappedItems, setMappedItems] = useState<Mapping[]>([]);
  const [hourPricesList, setHourPricesList] = useState<TradeDataHour[]>([]);
  const [latestPricesList, setLatestPricesList] = useState<TradeDataLatest[]>(
    []
  );

  const [fullList, setFullList] = useState<FullList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // Countdown timer 5 min

  const loadData = () => {
    setIsLoading(true);
    const getTransformedMapping = (
      mappingData: MappingResponseParameters[]
    ) => {
      setMappedItems(transformMappingData(mappingData));
    };
    const getTransformedPriceDataHour = (hourPricesData: {
      data: HourPricesResponseParameters[];
    }) => {
      setHourPricesList(transformHourPricesData(hourPricesData));
    };
    const getTransformedPriceDataLatest = (latestPricesData: {
      data: LatestPricesResponseParameters[];
    }) => {
      setLatestPricesList(transformLatestPricesData(latestPricesData));
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
      getTransformedPriceDataHour
    );
    fetchLatestPrices(
      {
        url: "https://prices.runescape.wiki/api/v1/osrs/latest",
      },
      getTransformedPriceDataLatest
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
    setFullList(
      combineMappingAndPriceLists(mappedItems, hourPricesList, latestPricesList)
    );
    setIsLoading(false);
  };

  const onRefresh = () => {
    loadData();
    setRemainingTime(300);
  };

  return (
    <ItemPricesList
      data={fullList}
      loading={isLoading}
      time={remainingTime}
      refresh={onRefresh}
    />
  );
};
