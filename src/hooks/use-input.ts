import { useState } from "react";

/////////////////////////////////
////// TO DO: DEFINE TYPES //////
/////////////////////////////////

const useInput = (validateValue: any) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e: any) => {
    setEnteredValue(e.target.value);
  };

  const valueResetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputBlurHandler = (e: any) => {
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
