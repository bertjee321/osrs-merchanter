import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackButton } from "../../UI/buttons/BackButton";
import { LoadingGrid } from "../../UI/loading-grid/LoadingGrid";
import {
  initialFilterState,
  initialSortState,
  tableHeaders,
} from "../../constants/price-table.constants";
import { Sort } from "../../enums/price-table.enums";
import { useFilteredAndSortedItems } from "../../hooks/use-filtered-and-sorted-items";
import { PriceDataMapping } from "../../models/app.models";
import { Filter } from "../../models/price-table.models";
import { PriceTableBody } from "./PriceTableBody";
import { PriceTableHead } from "./PriceTableHead";
import { PriceTableHeader } from "./price-table-header/PriceTableHeader";
import React from "react";

interface PriceTableProps {
  data: PriceDataMapping[];
  loading: boolean;
  error: boolean;
}

export const PriceTable = (props: PriceTableProps) => {
  const navigate = useNavigate();
  const parseParam = (val: string | null) =>
    val === null || val.trim() === "" ? undefined : Number(val);

  const getFilterFromSearchParams = (params: URLSearchParams): Filter => ({
    name: params.get("itemName") || "",
    minBuyPrice: parseParam(params.get("minPrice")),
    maxBuyPrice: parseParam(params.get("maxPrice")),
    minVolume: parseParam(params.get("minVolume")),
    minMargin: parseParam(params.get("minMargin")),
  });

  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<Filter>(() =>
    getFilterFromSearchParams(searchParams)
  );

  React.useEffect(() => {
    setFilter(getFilterFromSearchParams(searchParams));
  }, [searchParams]);

  const [sortItem, setSortItem] =
    useState<Record<string, Sort>>(initialSortState);
  const itemList = useFilteredAndSortedItems({
    data: props.data,
    filter,
    sort: sortItem,
  });
  // Handler for sorting items based on the clicked header
  const sortHandler = (itemKey: keyof typeof tableHeaders) => {
    setSortItem((prevState) => {
      // Reset all sort properties to Sort.None
      const updatedState: Record<string, Sort> = { ...initialSortState };

      // Set the sort property for the clicked item to the opposite value
      updatedState[itemKey] =
        prevState[itemKey] === Sort.Descending
          ? Sort.Ascending
          : Sort.Descending;

      return updatedState;
    });
  };

  // Handler for navigating to the OSRS wiki page of the clicked item
  const navigateHandler = (id: number) => {
    navigate(`/items/${id}`);
  };

  // Handler for rendering loading state
  const renderLoading = () => (
    <div className="text-center">
      <LoadingGrid />
      <h4>Fetching data ...</h4>
    </div>
  );

  // Handler for rendering error message
  const renderError = () => (
    <div className="alert alert-danger text-center" role="alert">
      Something went wrong!
      <br />
    </div>
  );

  // Handler for rendering the table with item data
  const renderTable = () => (
    <table className="table table-striped table-bordered table-hover text-center">
      <PriceTableHead sortItem={sortItem} sortHandler={sortHandler} />
      <PriceTableBody itemList={itemList} navigateHandler={navigateHandler} />
    </table>
  );

  return (
    <>
      <BackButton />
      <PriceTableHeader />
      {props.loading
        ? renderLoading()
        : props.error
        ? renderError()
        : renderTable()}
    </>
  );
};
