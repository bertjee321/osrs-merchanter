import { useEffect } from "react";
import useInput from "../../../../hooks/use-input";

interface ItemNameInputProps {
  resetKey: number;
  onChanges: (value: string) => void;
}

export const ItemNameInput = ({ resetKey, onChanges }: ItemNameInputProps) => {
  const { value, valueChangeHandler, valueResetHandler } = useInput(
    (value: string) => value.trim() !== ""
  );

  useEffect(() => {
    valueResetHandler();
  }, [resetKey]);

  useEffect(() => {
    onChanges(value);
  }, [value]);

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">Item Name</span>
      <input
        type="text"
        className="form-control"
        onChange={valueChangeHandler}
        value={value}
        aria-label="Item name"
      />
    </div>
  );
};
