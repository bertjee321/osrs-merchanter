import { useState } from "react";
import { BackButton } from "../../UI/buttons/BackButton";
import { LoadingGrid } from "../../UI/loading-grid/LoadingGrid";
import {
  initialFilterState,
  initialSortState,
  tableHeaders,
} from "../../constants/price-table.constants";
import { useFilteredAndSortedItems } from "../../hooks/use-filtered-and-sorted-items";
import { PriceDataMapping } from "../../models/app.models";
import { Sort } from "../../enums/price-table.enums";
import { Filter } from "../../models/price-table.models";
import { PriceTableBody } from "./PriceTableBody";
import { PriceTableHead } from "./PriceTableHead";
import { PriceTableHeader } from "./price-table-header/PriceTableHeader";
import { useNavigate } from "react-router-dom";

interface PriceTableProps {
  data: PriceDataMapping[];
  loading: boolean;
  error: boolean;
}

export const PriceTable = (props: PriceTableProps) => {
  const [sortItem, setSortItem] =
    useState<Record<string, Sort>>(initialSortState);
  const [filter, setFilter] = useState<Filter>(initialFilterState);
  const navigate = useNavigate();

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

  const submitHandler = (data: any) => {
    setFilter(data);
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
      <PriceTableHeader onSubmit={submitHandler} />
      {props.loading
        ? renderLoading()
        : props.error
        ? renderError()
        : renderTable()}
    </>
  );
};
