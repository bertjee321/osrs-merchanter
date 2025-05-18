import React from "react";
import { ResetButton } from "../../../UI/buttons/ResetButton";
import { SubmitButton } from "../../../UI/buttons/SubmitButton";
import { BuyPriceInputs } from "./inputs/BuyPriceInputs";
import { ItemNameInput } from "./inputs/ItemNameInput";
import { MinMarginInput } from "./inputs/MinMarginInput";
import { MinVolumeInput } from "./inputs/MinVolumeInput";
import styles from "./PriceTableFilter.module.css";

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
  const [showFilter, setShowFilter] = React.useState<boolean>(false);
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

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const renderForm = () => {
    return (
      <form className="mb-2" onSubmit={submitHandler}>
        <div className="row">
          <div className="col-12 col-md-8">
            <ItemNameInput
              resetKey={resetKey}
              onChanges={itemNameChangeHandler}
            />
            <BuyPriceInputs
              resetKey={resetKey}
              minPriceOnChanges={minBuyPriceChangeHandler}
              maxPriceOnChanges={maxBuyPriceChangeHandler}
            />
          </div>
          <div className="col-12 col-md-4">
            <MinVolumeInput
              resetKey={resetKey}
              onChanges={minVolumeChangeHandler}
            />
            <MinMarginInput
              resetKey={resetKey}
              onChanges={minMarginChangeHandler}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <SubmitButton />
          <ResetButton onClick={resetHandler} />
        </div>
      </form>
    );
  };

  return (
    <>
      <h2 className="text-start">
        <div className={styles["filter-span"]} onClick={toggleFilter}>
          {showFilter ? "Hide filter" : "Show filter"}
        </div>
      </h2>
      {showFilter && renderForm()}
    </>
  );
};
