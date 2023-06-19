import { SetStateAction, useState } from "react";

const useInput = (validateValue: (args: any) => boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEnteredValue(e.target.value);
  };

  const valueResetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputBlurHandler = (_e: any) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueResetHandler,
    inputBlurHandler,
  };
};

export default useInput;
