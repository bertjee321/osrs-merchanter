import { tableHeaders } from "../../constants/price-table.constants";
import { Sort } from "../../enums/price-table.enums";
import { SortState } from "../../models/sort-state.models";

interface PriceTableHeadProps {
  sortItem: SortState;
  sortHandler: (itemKey: keyof typeof tableHeaders) => void;
}

export const PriceTableHead = ({
  sortItem,
  sortHandler,
}: PriceTableHeadProps) => {
  // Helper function to determine the sort icon based on the sort state
  const sortIcon = (key: keyof typeof tableHeaders) => {
    if (key !== sortItem.key) {
      return <span className="bi bi-arrow-down-up" />;
    }

    if (!sortItem.direction) {
      return <span className="bi bi-arrow-down-up" />;
    }

    if (sortItem.direction === Sort.Ascending) {
      return <span className="bi bi-sort-down-alt" />;
    } else if (sortItem.direction === Sort.Descending) {
      return <span className="bi bi-sort-down" />;
    }
  };

  return (
    <thead className="table-dark">
      <tr>
        {Object.entries(tableHeaders).map(([key, tableHeader]) => (
          <th
            onClick={() => sortHandler(key as keyof typeof tableHeaders)}
            key={key}
          >
            {tableHeader}
            {key === "margin" && (
              <span className="font-size-small"> (-2% tax)</span>
            )}{" "}
            {sortIcon(key as keyof typeof tableHeaders)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
