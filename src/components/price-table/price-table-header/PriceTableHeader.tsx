import { PriceTableFilter } from "../price-table-filter/PriceTableFilter";

export const PriceTableHeader = () => {
  return (
    <>
      <h1 className="text-center mt-3 mb-3">OSRS Full Price Table</h1>
      <PriceTableFilter />
    </>
  );
};
