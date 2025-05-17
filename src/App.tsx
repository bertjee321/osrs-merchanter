import { useEffect, useState } from "react";
import { fetchHourPrices } from "./api/hour-prices.api";
import { fetchItemMapping } from "./api/item-mapping.api";
import { PriceTable } from "./components/price-table/PriceTable";
import { PriceDataMapping } from "./models/app.models";
import { combineMappingAndHourPricesList } from "./utils/utils";

function App() {
  const [fullList, setFullList] = useState<PriceDataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const mappingData = await fetchItemMapping();
      const hourPricesData = await fetchHourPrices();

      if (!mappingData || !hourPricesData) {
        setIsLoading(false);
        setIsError(true);
        console.error("Error fetching data");
        return;
      }

      const combinedList = combineMappingAndHourPricesList(
        mappingData,
        hourPricesData
      );

      setFullList(combinedList);
      setIsLoading(false);
      setIsError(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container text-center">
      <PriceTable data={fullList} loading={isLoading} error={isError} />
    </div>
  );
}

export default App;
