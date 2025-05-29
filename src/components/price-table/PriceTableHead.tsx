import { tableHeaders } from "../../constants/price-table.constants";
import { Sort } from "../../enums/price-table.enums";

interface PriceTableHeadProps {
  sortItem: Record<string, Sort>;
  sortHandler: (itemKey: keyof typeof tableHeaders) => void;
}

export const PriceTableHead = ({
  sortItem,
  sortHandler,
}: PriceTableHeadProps) => {
  // Helper function to determine the sort icon based on the sort state
  const sortIcon = (key: keyof typeof tableHeaders) => {
    if (sortItem[key] === Sort.Descending) {
      return <span className="bi bi-sort-down" />;
    } else if (sortItem[key] === Sort.Ascending) {
      return <span className="bi bi-sort-down-alt" />;
    } else {
      return <span className="bi bi-arrow-down-up" />;
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
