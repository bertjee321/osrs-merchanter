import { useState } from "react";
import { LoadingGrid } from "../UI/loading-grid/LoadingGrid";
import { PriceDataMapping } from "../models/app.models";
import { filterItems, sortItems } from "../utils/price-table-utils";
import { PriceTableHeader } from "./PriceTableHeader";
import { PriceTableTimer } from "./PriceTableTimer";
import { Sort } from "./models/price-table.enums";
import { Filter } from "./models/price-table.models";

// CSS imports
import "./price-table.css";

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

const initialFilterState: Filter = {
  name: undefined,
  minBuyPrice: undefined,
  maxBuyPrice: undefined,
  minVolume: undefined,
  minMargin: undefined,
};

// Set initial sort state per table header, items should not be sorted at first (set to Sort.None)
const initialSortState: { [key: string]: Sort } = Object.keys(
  tableHeaders
).reduce((acc, key) => {
  acc[key] = Sort.None;
  return acc;
}, {} as { [key: string]: Sort });

export const PriceTable = (props: {
  data: PriceDataMapping[];
  loading: boolean;
  time: number;
  refresh: () => void;
}) => {
  const [sortItem, setSortItem] = useState<{
    [key: string]: Sort;
  }>(initialSortState);
  const [filter, setFilter] = useState<Filter>(initialFilterState);

  const filterAndSortItems = (
    data: PriceDataMapping[],
    filter: Filter,
    sort: {
      [key: string]: Sort;
    }
  ) => {
    return sortItems(filterItems(data, filter), sort);
  };

  const itemList = filterAndSortItems(props.data, filter, sortItem);

  const sortHandler = (itemKey: keyof typeof initialSortState) => {
    setSortItem((prevState) => {
      // Reset all sort properties to Sort.None
      const updatedState = { ...initialSortState };

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

  const refreshHandler = () => {
    props.refresh();
  };

  const navigateHandler = (id: number) => {
    window.open(
      `https://prices.runescape.wiki/osrs/item/${id.toString()}`,
      "_blank"
    );
  };

  return (
    <>
      <PriceTableHeader onSubmit={submitHandler} />
      <PriceTableTimer onRefresh={refreshHandler} timeInSeconds={props.time} />
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            {Object.entries(tableHeaders).map(([key, tableHeader]) => (
              <th onClick={() => sortHandler(key)} key={key}>
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
        {!props.loading && (
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
                      ? (data as any)[key]
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : (data as any)[key]}
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
    </>
  );
};
