import React from "react";
import { ResetButton } from "../../../UI/buttons/ResetButton";
import { SubmitButton } from "../../../UI/buttons/SubmitButton";
import { BuyPriceInputs } from "./price-table-filter-inputs/BuyPriceInputs";
import { ItemNameInput } from "./price-table-filter-inputs/ItemNameInput";
import { MinMarginInput } from "./price-table-filter-inputs/MinMarginInput";
import { MinVolumeInput } from "./price-table-filter-inputs/MinVolumeInput";

interface PriceTableFilterProps {
  filterSubmitHandler: (data: {
    name: string;
    minBuyPrice: string;
    maxBuyPrice: string;
    minVolume: string;
    minMargin: string;
  }) => void;
}

const initialInputData = {
  name: "",
  minBuyPrice: "",
  maxBuyPrice: "",
  minVolume: "",
  minMargin: "",
};

export const PriceTableFilter = ({
  filterSubmitHandler,
}: PriceTableFilterProps) => {
  const [resetKey, setResetKey] = React.useState(0);
  const [inputData, setInputData] = React.useState(initialInputData);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    filterSubmitHandler(inputData);
  };

  const resetHandler = () => {
    setResetKey((prevKey) => prevKey + 1);
    setInputData(initialInputData);
  };

  const itemNameChangeHandler = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const minBuyPriceChangeHandler = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      minBuyPrice: value,
    }));
  };

  const maxBuyPriceChangeHandler = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      maxBuyPrice: value,
    }));
  };

  const minVolumeChangeHandler = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      minVolume: value,
    }));
  };

  const minMarginChangeHandler = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      minMargin: value,
    }));
  };

  return (
    <form className="mb-2 width-50pc" onSubmit={submitHandler}>
      <ItemNameInput resetKey={resetKey} onChanges={itemNameChangeHandler} />
      <BuyPriceInputs
        resetKey={resetKey}
        minPriceOnChanges={minBuyPriceChangeHandler}
        maxPriceOnChanges={maxBuyPriceChangeHandler}
      />
      <MinVolumeInput resetKey={resetKey} onChanges={minVolumeChangeHandler} />
      <MinMarginInput resetKey={resetKey} onChanges={minMarginChangeHandler} />
      <div className="d-grid text-start gap-2">
        <SubmitButton />
        <ResetButton onClickHandler={resetHandler} />
      </div>
    </form>
  );
};
