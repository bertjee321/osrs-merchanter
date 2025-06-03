import React from "react";
import { fetchItemTimeSeries } from "../../../api/get-item.api";
import { TimeStep } from "../../../enums/item-details.enums";

interface TimeSelectorProps {
  itemId: string;
}

export const TimeSelector = ({ itemId }: TimeSelectorProps) => {
  const [timeStep, setTimeStep] = React.useState<TimeStep>(TimeStep.MIN_5);

  React.useEffect(() => {
    const fetchData = async () => {
      const itemTimeSeries = await fetchItemTimeSeries(itemId!, timeStep);
      console.log("Item time series:", itemTimeSeries);
    };

    fetchData();
  }, [timeStep, itemId]);

  const handleTimeStepChange = (newTimeStep: TimeStep) => {
    setTimeStep(newTimeStep);
  };

  return (
    <div className="time-selector">
      <button
        className={`btn me-2 ${
          timeStep === TimeStep.MIN_5 ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => handleTimeStepChange(TimeStep.MIN_5)}
      >
        1 Day
      </button>
      <button
        className={`btn me-2 ${
          timeStep === TimeStep.HOUR_1 ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => handleTimeStepChange(TimeStep.HOUR_1)}
      >
        7 Days
      </button>
      <button
        className={`btn me-2 ${
          timeStep === TimeStep.HOUR_6 ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => handleTimeStepChange(TimeStep.HOUR_6)}
      >
        30 Days
      </button>
      <button
        className={`btn me-2 ${
          timeStep === TimeStep.HOUR_24 ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => handleTimeStepChange(TimeStep.HOUR_24)}
      >
        1 Year
      </button>
    </div>
  );
};
