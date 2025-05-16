import { tableHeaders } from "./constants/price-table.constants";
import { Sort } from "./models/price-table.enums";

interface PriceTableHeadProps {
  sortItem: Record<string, Sort>;
  sortHandler: (itemKey: keyof typeof tableHeaders) => void;
}

export const PriceTableHead = ({
  sortItem,
  sortHandler,
}: PriceTableHeadProps) => {
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
              <span className="font-size-small"> (-1% tax)</span>
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
  );
};
