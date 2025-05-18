import { useEffect } from "react";
import useInput from "../../../../hooks/use-input";

interface MinVolumeInputProps {
  resetKey: number;
  onChanges: (value: string) => void;
}

export const MinVolumeInput = ({
  resetKey,
  onChanges,
}: MinVolumeInputProps) => {
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
    <div className="input-group mb-1">
      <span className="input-group-text">Min. Vol.</span>
      <input
        type="text"
        className="form-control"
        onChange={valueChangeHandler}
        value={value}
        aria-label="Min volume"
      />
    </div>
  );
};
