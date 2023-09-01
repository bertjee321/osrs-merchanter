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
                  <td key={key}>
                    {["avgHighPrice", "avgLowPrice", "low", "high"].includes(
                      key
                    )
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
      {props.isLoading && (
        <>
          <LoadingGrid /> <h4>Fetching data ...</h4>
        </>
      )}
    </>
  );
}