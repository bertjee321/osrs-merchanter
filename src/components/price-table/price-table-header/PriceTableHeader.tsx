import { useState } from "react";
import { PriceTableFilter } from "../price-table-filter/PriceTableFilter";

export const PriceTableHeader = (props: { onSubmit: (data: any) => void }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  return (
    <>
      <h1 className="text-center">OSRS Full Price Table</h1>
      <h2 className="text-start">
        <span
          style={{ fontSize: "15px" }}
          className="filter-span"
          onClick={toggleFilter}
        >
          {showFilter ? "Hide filter" : "Show filter"}
        </span>
      </h2>

      {showFilter && (
        <div>
          <PriceTableFilter filterSubmitHandler={props.onSubmit} />
        </div>
      )}
    </>
  );
};
