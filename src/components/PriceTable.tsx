import { useState } from "react";
import { LoadingGrid } from "../UI/LoadingGrid";
import { PriceTableTimer } from "./PriceTableTimer";
import { PriceTableHeader } from "./PriceTableHeader";
import { Filter } from "./models/price-table.models";
import { Sort } from "./models/price-table.enums";


// set table headers
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
  data: any;
  loading: boolean;
  time: number;
  refresh: () => void;
}) => {
  const [sortItem, setSortItem] = useState<{
    [key: string]: Sort;
  }>(initialSortState);
  const [filter, setFilter] = useState<Filter>(initialFilterState);

  const filteredItems = [...props.data].filter((item) => {
    if (filter.name) {
      if (!item.name.toLowerCase().includes(filter.name.toLowerCase())) {
        return false;
      }
    }

    if (filter.minBuyPrice) {
      if (item.avgLowPrice < filter.minBuyPrice) {
        return false;
      }
    }

    if (filter.maxBuyPrice) {
      if (item.avgLowPrice > filter.maxBuyPrice) {
        return false;
      }
    }

    if (filter.minVolume) {
      if (
        item.highPriceVolume < filter.minVolume ||
        item.lowPriceVolume < filter.minVolume
      ) {
        return false;
      }
    }

    if (filter.minMargin) {
      if (item.margin < filter.minMargin) {
        return false;
      }
    }

    return true;
  });

  //////////////////////////////////
  ////// TO DO: SHORTEN BELOW //////
  //////////////////////////////////

  // sort items every time something in state (or props) changes
  // sortedItems is then used to render items on screen
  const sortedItems = filteredItems.sort((a, b) => {
    // Compare the properties based on the sortItem values
    if (sortItem.id !== Sort.None) {
      return sortItem.id === Sort.Ascending ? a.id - b.id : b.id - a.id;
    }

    if (sortItem.name !== Sort.None) {
      // Compare based on the "name" property
      return sortItem.name === Sort.Ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortItem.limit !== Sort.None) {
      // Compare based on the "limit" property
      return sortItem.limit === Sort.Ascending
        ? a.limit - b.limit
        : b.limit - a.limit;
    }

    if (sortItem.avgHighPrice !== Sort.None) {
      // Compare based on the "avgHighPrice" property
      return sortItem.avgHighPrice === Sort.Ascending
        ? a.avgHighPrice - b.avgHighPrice
        : b.avgHighPrice - a.avgHighPrice;
    }

    if (sortItem.highPriceVolume !== Sort.None) {
      // Compare based on the "highPriceVolume" property
      return sortItem.highPriceVolume === Sort.Ascending
        ? a.highPriceVolume - b.highPriceVolume
        : b.highPriceVolume - a.highPriceVolume;
    }

    if (sortItem.avgLowPrice !== Sort.None) {
      // Compare based on the "avgLowPrice" property
      return sortItem.avgLowPrice === Sort.Ascending
        ? a.avgLowPrice - b.avgLowPrice
        : b.avgLowPrice - a.avgLowPrice;
    }

    if (sortItem.lowPriceVolume !== Sort.None) {
      // Compare based on the "lowPriceVolume" property
      return sortItem.lowPriceVolume === Sort.Ascending
        ? a.lowPriceVolume - b.lowPriceVolume
        : b.lowPriceVolume - a.lowPriceVolume;
    }

    if (sortItem.margin !== Sort.None) {
      // Compare based on the "margin" property
      return sortItem.margin === Sort.Ascending
        ? a.margin - b.margin
        : b.margin - a.margin;
    }

    if (sortItem.potential !== Sort.None) {
      // Compare based on the "potential" property
      return sortItem.potential === Sort.Ascending
        ? a.potential - b.potential
        : b.potential - a.potential;
    }

    // If no sort criteria matched, maintain the original order
    return 0;
  });

  //////////////////////////////////
  ////// TO DO: SHORTEN ABOVE //////
  //////////////////////////////////

  const handleSort = (itemKey: keyof typeof initialSortState) => {
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

  return (
    <>
      <PriceTableHeader onSubmit={submitHandler} />
      <PriceTableTimer onRefresh={refreshHandler} timeInSeconds={props.time} />
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            {Object.entries(tableHeaders).map(([key, tableHeader]) => (
              <th onClick={() => handleSort(key)} key={key}>
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
            {sortedItems.map((data, index) => (
              <tr key={index}>
                {Object.keys(tableHeaders).map((key) => (
                  <td key={key}>
                    {[
                      "avgHighPrice",
                      "avgLowPrice",
                      "margin",
                      "potential",
                    ].includes(key)
                      ? data[key]
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : data[key]}
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
