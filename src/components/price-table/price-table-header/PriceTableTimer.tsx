export const PriceTableTimer = (props: {
  onRefresh: () => void;
  timeInSeconds: number;
}) => {
  const minutes = Math.floor(props.timeInSeconds / 60);
  const seconds = props.timeInSeconds - minutes * 60;

  const minutesAndSecondsString =
    String(minutes) + ":" + String(seconds).padStart(2, "0");

  return (
    <div className="d-flex flex-row-reverse">
      <p>
        <span
          className="bi bi-arrow-repeat refresh-icon"
          onClick={props.onRefresh}
        >
          <span className="refresh-tooltiptext">Refresh now</span>
        </span>{" "}
        {minutesAndSecondsString}
      </p>
    </div>
  );
};
