import { useEffect } from "react";
import useInput from "../../../../hooks/use-input";

interface BuyPriceInputsProps {
  resetKey: number;
  minPriceOnChanges: (value: string) => void;
  maxPriceOnChanges: (value: string) => void;
}

export const BuyPriceInputs = ({
  resetKey,
  minPriceOnChanges,
  maxPriceOnChanges,
}: BuyPriceInputsProps) => {
  const {
    value: enteredMinBuyPrice,
    valueChangeHandler: minBuyPriceChangeHandler,
    valueResetHandler: minBuyPriceResetHandler,
  } = useInput((value: number) => value >= 0);
  const {
    value: enteredMaxBuyPrice,
    valueChangeHandler: maxBuyPriceChangeHandler,
    valueResetHandler: maxBuyPriceResetHandler,
  } = useInput((value: number) => value >= 0);

  useEffect(() => {
    minBuyPriceResetHandler();
    maxBuyPriceResetHandler();
  }, [resetKey]);

  useEffect(() => {
    minPriceOnChanges(enteredMinBuyPrice);
  }, [enteredMinBuyPrice]);
  
  useEffect(() => {
    maxPriceOnChanges(enteredMaxBuyPrice);
  }, [enteredMaxBuyPrice]);

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">Buy price</span>
      <input
        type="text"
        className="form-control"
        onChange={minBuyPriceChangeHandler}
        value={enteredMinBuyPrice}
        placeholder="Min"
        aria-label="Min buy price"
      />
      <input
        type="text"
        className="form-control"
        onChange={maxBuyPriceChangeHandler}
        value={enteredMaxBuyPrice}
        placeholder="Max"
        aria-label="Max buy price"
      />
    </div>
  );
};
