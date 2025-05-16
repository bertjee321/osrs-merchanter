import { useState } from "react";
import { LoadingGrid } from "../UI/loading-grid/LoadingGrid";
import { useFilteredAndSortedItems } from "../hooks/use-filtered-and-sorted-items";
import { PriceDataMapping } from "../models/app.models";
import TableStyles from "./PriceTable.module.css";
import { PriceTableHead } from "./PriceTableHead";
import { PriceTableHeader } from "./PriceTableHeader";
import {
  initialFilterState,
  initialSortState,
  tableHeaders,
} from "./constants/price-table.constants";
import { Sort } from "./models/price-table.enums";
import { Filter } from "./models/price-table.models";

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
        <PriceTableHead sortItem={sortItem} sortHandler={sortHandler} />
        {!props.loading && !props.error && (
          <tbody>
            {itemList.map((data, index) => (
              <tr
                key={index}
                onClick={() => navigateHandler(data.id)}
                className={TableStyles["price-table__row"]}
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
