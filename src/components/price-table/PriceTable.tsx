import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackButton } from "../../UI/buttons/BackButton";
import { LoadingGrid } from "../../UI/loading-grid/LoadingGrid";
import {
  initialSortState,
  tableHeaders,
} from "../../constants/price-table.constants";
import { Sort } from "../../enums/price-table.enums";
import { useFilteredAndSortedItems } from "../../hooks/use-filtered-and-sorted-items";
import { PriceDataMapping } from "../../models/app.models";
import { Filter } from "../../models/price-table.models";
import { SortState } from "../../models/sort-state.models";
import {
  getFilterFromSearchParams,
  getSortFromSearchParams,
} from "../../utils/utils";
import { PriceTableBody } from "./PriceTableBody";
import { PriceTableHead } from "./PriceTableHead";
import { PriceTableHeader } from "./price-table-header/PriceTableHeader";

interface PriceTableProps {
  data: PriceDataMapping[];
  loading: boolean;
  error: boolean;
}

export const PriceTable = (props: PriceTableProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = React.useState<Filter>(() =>
    getFilterFromSearchParams(searchParams)
  );
  const [sortState, setSortState] = React.useState<SortState>(initialSortState);

  React.useEffect(() => {
    setFilter(getFilterFromSearchParams(searchParams));
    setSortState(getSortFromSearchParams(searchParams));
  }, [searchParams]);

  const itemList = useFilteredAndSortedItems({
    data: props.data,
    filter,
    sort: sortState,
  });

  const sortHandler = (itemKey: keyof typeof tableHeaders) => {
    const currentSort = getSortFromSearchParams(searchParams);
    const params = new URLSearchParams(searchParams);

    if (currentSort.key === itemKey) {
      params.set(
        "sort",
        `${itemKey}-${
          currentSort.direction === Sort.Ascending
            ? Sort.Descending
            : Sort.Ascending
        }`
      );
    } else {
      params.set("sort", `${itemKey}-${Sort.Descending}`);
    }

    setSearchParams(params);
  };

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
      <PriceTableHead sortItem={sortState} sortHandler={sortHandler} />
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
