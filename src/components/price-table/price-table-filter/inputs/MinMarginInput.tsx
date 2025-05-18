import { useEffect } from "react";
import useInput from "../../../../hooks/use-input";

interface MinMarginInputProps {
  resetKey: number;
  onChanges: (value: string) => void;
}

export const MinMarginInput = ({
  resetKey,
  onChanges,
}: MinMarginInputProps) => {
  const { value, valueChangeHandler, valueResetHandler } = useInput(
    (value: number) => value >= 0
  );

  useEffect(() => {
    valueResetHandler();
  }, [resetKey]);

  useEffect(() => {
    onChanges(value);
  }, [value]);

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">Minimal Margin</span>
      <input
        type="text"
        className="form-control"
        onChange={valueChangeHandler}
        value={value}
        aria-label="Min margin"
      />
    </div>
  );
};
