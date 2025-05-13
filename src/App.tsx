import { useEffect, useState } from "react";
import { fetchHourPrices, transformHourlyPriceResponse } from "./api/hour-prices.api";
import { fetchItemMapping } from "./api/item-mapping.api";
import { PriceTable } from "./components/PriceTable";
import { PriceDataMapping } from "./models/app.models";
import { combineMappingAndHourPricesList } from "./utils/utils";

function App() {
  const [fullList, setFullList] = useState<PriceDataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const mappingData = await fetchItemMapping();
      const hourPricesData = await fetchHourPrices();

      if (!mappingData || !hourPricesData) {
        setIsLoading(false);
        return;
      }

      const combinedList = combineMappingAndHourPricesList(
        mappingData,
        transformHourlyPriceResponse(hourPricesData)
      );

      setFullList(combinedList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container text-center">
      <PriceTable data={fullList} loading={isLoading} />
    </div>

  );
}

export default App;
