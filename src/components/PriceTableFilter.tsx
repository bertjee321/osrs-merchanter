import useInput from "../hooks/use-input";

export const PriceTableFilter = (props: {
  onSubmit: (arg0: {
    name: string;
    minBuyPrice: string;
    maxBuyPrice: string;
    minVolume: string;
    minMargin: string;
  }) => void;
}) => {
  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    valueResetHandler: nameResetHandler,
  } = useInput((value: any) => value.trim() !== "");
  const {
    value: enteredMinBuyPrice,
    valueChangeHandler: minBuyPriceChangeHandler,
    valueResetHandler: minBuyPriceResetHandler,
  } = useInput((value: any) => value >= 0);
  const {
    value: enteredMaxBuyPrice,
    valueChangeHandler: maxBuyPriceChangeHandler,
    valueResetHandler: maxBuyPriceResetHandler,
  } = useInput((value: any) => value >= 0);
  const {
    value: enteredMinVolume,
    valueChangeHandler: minVolumeChangeHandler,
    valueResetHandler: minVolumeResetHandler,
  } = useInput((value: any) => value >= 0);
  const {
    value: enteredMinMargin,
    valueChangeHandler: minMarginChangeHandler,
    valueResetHandler: minMarginResetHandler,
  } = useInput((value: any) => value >= 0);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredData = {
      name: enteredName,
      minBuyPrice: enteredMinBuyPrice,
      maxBuyPrice: enteredMaxBuyPrice,
      minVolume: enteredMinVolume,
      minMargin: enteredMinMargin,
    };

    props.onSubmit(enteredData);
  };

  const resetHandler = () => {
    nameResetHandler();
    minBuyPriceResetHandler();
    maxBuyPriceResetHandler();
    minVolumeResetHandler();
    minMarginResetHandler();
  };

  return (
    <form style={{ width: "50%" }} className="mb-2" onSubmit={submitHandler}>
      <div className="input-group mb-3">
        <span className="input-group-text">Item Name</span>
        <input
          type="text"
          className="form-control"
          onChange={nameChangeHandler}
          value={enteredName}
          aria-label="Item name"
        />
      </div>
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
      <div className="input-group mb-3">
        <span className="input-group-text">Minimal Volume</span>
        <input
          type="text"
          className="form-control"
          onChange={minVolumeChangeHandler}
          value={enteredMinVolume}
          aria-label="Min volume"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Minimal Margin</span>
        <input
          type="text"
          className="form-control"
          onChange={minMarginChangeHandler}
          value={enteredMinMargin}
          aria-label="Min margin"
        />
      </div>
      <div className="d-grid text-start gap-2">
        <button type="submit" className="btn btn-primary">
          Submit <span className="bi bi-search" />
        </button>
        <button className="btn btn-secondary" onClick={resetHandler}>
          Reset <span className="bi bi-arrow-clockwise" />
        </button>
      </div>
    </form>
  );
};
