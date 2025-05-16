import { useState } from "react";
import { LoadingGrid } from "../UI/loading-grid/LoadingGrid";
import { useFilteredAndSortedItems } from "../hooks/use-filtered-and-sorted-items";
import { PriceDataMapping } from "../models/app.models";
import { PriceTableHeader } from "./PriceTableHeader";
import { Sort } from "./models/price-table.enums";
import { Filter } from "./models/price-table.models";
import "./price-table.css";

interface PriceTableProps {
  data: PriceDataMapping[];
  loading: boolean;
  error: boolean;
}

export const PriceTable = (props: PriceTableProps) => {
  const [sortItem, setSortItem] =
    useState<Record<string, Sort>>(initialSortState);
  const [filter, setFilter] = useState<Filter>(initialFilterState);

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
    window.open(
      `https://prices.runescape.wiki/osrs/item/${id.toString()}`,
      "_blank"
    );
  };

  return (
    <>
      <PriceTableHeader onSubmit={submitHandler} />
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            {Object.entries(tableHeaders).map(([key, tableHeader]) => (
              <th
                onClick={() => sortHandler(key as keyof typeof tableHeaders)}
                key={key}
              >
                {tableHeader}
                {key === "margin" && (
                  <span style={{ fontSize: "9px" }}> (-1% tax)</span>
                )}{" "}
                {sortItem[key] === Sort.Descending ? (
                  <span className="bi bi-sort-down" />
                ) : sortItem[key] === Sort.Ascending ? (
                  <span className="bi bi-sort-down-alt" />
                ) : (
                  <span className="bi bi-arrow-down-up" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        {!props.loading && !props.error && (
          <tbody>
            {itemList.map((data, index) => (
              <tr
                key={index}
                onClick={() => navigateHandler(data.id)}
                className="price-table__row"
              >
                {Object.keys(tableHeaders).map((key) => (
                  <td key={key}>
                    {[
                      "avgHighPrice",
                      "avgLowPrice",
                      "margin",
                      "potential",
                    ].includes(key)
                      ? (data[key as keyof PriceDataMapping] as number)
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : data[key as keyof PriceDataMapping]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {props.loading && (
        <>
          <LoadingGrid /> <h4>Fetching data ...</h4>
        </>
      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          {" "}
          Something went wrong!
        </div>
      )}
    </>
  );
};

// Define the table headers with their corresponding keys
const tableHeaders = {
  id: "ID",
  name: "Name",
  limit: "Ge Limit",
  avgHighPrice: "Avg. High",
  highPriceVolume: "Vol. High",
  avgLowPrice: "Avg. Low",
  lowPriceVolume: "Vol. Low",
  margin: "Margin",
  potential: "Potential",
};

// Set initial filter state per table header, items should not be filtered at first (set to undefined)
const initialFilterState: Filter = {
  name: undefined,
  minBuyPrice: undefined,
  maxBuyPrice: undefined,
  minVolume: undefined,
  minMargin: undefined,
};

// Set initial sort state per table header, items should not be sorted at first (set to Sort.None)
const initialSortState: Record<string, Sort> = Object.keys(tableHeaders).reduce(
  (acc, key) => {
    acc[key] = Sort.None;
    return acc;
  },
  {} as Record<string, Sort>
);
