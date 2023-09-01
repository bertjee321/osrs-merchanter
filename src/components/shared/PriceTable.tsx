import { LoadingGrid } from "../../UI/loading-grid/LoadingGrid";
import { Sort } from "../models/price-table.enums";
import { Filter } from "../models/price-table.models";

// CSS imports
import "./price-table.css";

export type TableHeaders<T> = {
  [K in keyof T]: {
    name: string;
    subText: string;
  };
};

interface PriceTableProps<T> {
  headers: { [key: string]: { name: string; subText: string } };
  sort: { [key: string]: Sort };
  onSort: (itemKey: string | number) => void;
  onClick: (id: string) => void;
  filter: Filter;
  data: T[];
  isLoading?: boolean;
}

export function PriceTable<T extends { id: string }>(
  props: PriceTableProps<T>
) {
  const formatValue = (value: number | string | undefined): string => {
    if (typeof value === "number") {
      // if value is a number, return formatted string
      return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "."); // adds thousand seperators
    }

    if (typeof value === "string" && !isNaN(Number(value))) {
      // if value is string and could be a number (e.g. "1123"), return formatted string
      return Number(value)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // adds thousand seperators
    }

    if (typeof value === "string" && value.length > 0) {
      // regular strings should be returned unchanged
      return value;
    }

    return "";
  };

  return (
    <>
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            {Object.entries(props.headers).map(([key, tableHeader]) => (
              <th onClick={() => props.onSort(key)} key={key}>
                {tableHeader.name}
                {tableHeader.subText !== "" && (
                  <span style={{ fontSize: "9px" }}>
                    {" "}
                    ({tableHeader.subText})
                  </span>
                )}{" "}
                {props.sort[key] === Sort.Descending ? (
                  <span className="bi bi-sort-down" />
                ) : props.sort[key] === Sort.Ascending ? (
                  <span className="bi bi-sort-down-alt" />
                ) : (
                  <span className="bi bi-arrow-down-up" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        {!props.isLoading && (
          <tbody>
            {props.data.map((data, index) => (
              <tr
                key={index}
                onClick={() => props.onClick(data.id)}
                className="price-table__row"
              >
                {Object.keys(props.headers).map((key) => (
                  <td key={key}>{formatValue((data as any)[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {props.isLoading && (
        <>
          <LoadingGrid /> <h4>Fetching data ...</h4>
        </>
      )}
    </>
  );
}
