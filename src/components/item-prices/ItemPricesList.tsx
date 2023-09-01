import { useState } from "react";
import { FullList } from "../../models/app.models";
import { Sort } from "../models/price-table.enums";
import { Filter } from "../models/price-table.models";
import { PriceTable, TableHeaders } from "../shared/PriceTable";
import { PriceTableFilter } from "../PriceTableFilter";
import { filterItems, sortItems } from "../../utils/price-table-utils";
import { PriceTableTimer } from "../PriceTableTimer";

const tableHeaders: TableHeaders<FullList> = {
  id: { name: "ID", subText: "" },
  name: { name: "Name", subText: "" },
  limit: { name: "GE Limit", subText: "" },
  highPriceVolume: { name: "Vol. High", subText: "hour" },
  lowPriceVolume: { name: "Vol. Low", subText: "hour" },
  avgLowPrice: { name: "Avg. Low", subText: "" },
  avgHighPrice: { name: "Avg. High", subText: "" },
  marginHour: { name: "Margin", subText: "-1% tax" },
  low: { name: "Latest Low", subText: "" },
  high: { name: "Latest High", subText: "" },
  marginLatest: { name: "Margin", subText: "-1% tax" },
  potential: { name: "Potential", subText: "" },
};

const initialFilterState: Filter = {
  name: undefined,
  minBuyPrice: undefined,
  maxBuyPrice: undefined,
  minVolume: undefined,
  minMargin: undefined,
};

const initialSortState: { [key: string]: Sort } = Object.keys(
  tableHeaders
).reduce((acc, key) => {
  acc[key] = Sort.None;
  return acc;
}, {} as { [key: string]: Sort });

export const ItemPricesList = (props: {
  data: FullList[];
  loading: boolean;
  time: number;
  refresh: () => void;
}) => {
  const [sort, setSort] = useState<{
    [key: string]: Sort;
  }>(initialSortState);
  const [filter, setFilter] = useState<Filter>(initialFilterState);

  const filterAndSortItems = (
    data: FullList[],
    filter: Filter,
    sort: {
      [key: string]: Sort;
    }
  ) => {
    return sortItems(filterItems(data, filter), sort);
  };

  const itemList = filterAndSortItems(props.data, filter, sort);

  const sortHandler = (itemKey: keyof typeof initialSortState) => {
    setSort((prevState) => {
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

  const navigateHandler = (id: string) => {
    window.open(
      `https://prices.runescape.wiki/osrs/item/${id}`,
      "_blank"
    );
  };

  return (
    <>
      <PriceTableFilter onSubmit={submitHandler} />
      <PriceTableTimer onRefresh={refreshHandler} timeInSeconds={props.time} />
      <PriceTable<FullList>
        headers={tableHeaders}
        data={itemList}
        sort={sort}
        onSort={sortHandler}
        onClick={navigateHandler}
        filter={filter}
        isLoading={props.loading}
      />
    </>
  );
};
