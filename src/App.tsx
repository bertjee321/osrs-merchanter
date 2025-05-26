import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { fetchHourPrices } from "./api/hour-prices.api";
import { fetchItemMapping } from "./api/item-mapping.api";
import { ItemDetails } from "./components/item-details/ItemDetails";
import { Layout } from "./components/layout/Layout";
import { PriceTable } from "./components/price-table/PriceTable";
import { PriceDataMapping } from "./models/app.models";
import { combineMappingAndHourPricesList } from "./utils/utils";
import { ItemMappingContext } from "./contexts/ItemMappingContext";

const App = () => {
  const [itemMapping, setItemMapping] = useState<PriceDataMapping[]>([]);
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

      setItemMapping(mappingData);
      setFullList(combinedList);
      setIsLoading(false);
      setIsError(false);
    };

    fetchData();
  }, []);

  return (
    <ItemMappingContext.Provider value={itemMapping}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/items" replace />} />
            <Route
              path="items"
              element={
                <PriceTable
                  data={fullList}
                  loading={isLoading}
                  error={isError}
                />
              }
            />
            <Route path="items/:itemId" element={<ItemDetails />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-5">404 - Page not found</div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ItemMappingContext.Provider>
  );

  return (
    <div className="container text-center">
      <PriceTable data={fullList} loading={isLoading} error={isError} />
    </div>
  );
};

export default App;
