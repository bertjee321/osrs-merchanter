import { PriceTableFilter } from "../price-table-filter/PriceTableFilter";

export const PriceTableHeader = (props: { onSubmit: (data: any) => void }) => {
  return (
    <>
      <h1 className="text-center mt-3 mb-3">OSRS Full Price Table</h1>
      <PriceTableFilter filterSubmitHandler={props.onSubmit} />
    </>
  );
};
