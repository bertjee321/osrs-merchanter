// For flipping: let users fil in item amount and show:
// - Total profit
// - GE-tax deduction
// - Expected turnover / margin

import React from "react";

// For skill-items later also reusable (e.g. herblore mixing potions)
export const ProfitCalculator = () => {
  const [itemAmount, setItemAmount] = React.useState<number>(0);
  const [profitPerItem, setProfitPerItem] = React.useState<number>(0);
  const [totalProfit, setTotalProfit] = React.useState<number>(0);
  const [geTaxDeduction, setGeTaxDeduction] = React.useState<number>(0);
  const [expectedTurnover, setExpectedTurnover] = React.useState<number>(0);

  const handleItemAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    setItemAmount(value);
    calculateProfit(value);
  };

  const calculateProfit = (amount: number) => {
    const totalProfitValue = profitPerItem * amount;
    setTotalProfit(totalProfitValue);
    setGeTaxDeduction(totalProfitValue * 0.01); // Assuming GE tax is 1%
    setExpectedTurnover(totalProfitValue - geTaxDeduction);
  };

  return (
    <div className="mb-4">
      <div className="card-body">
        <h5 className="card-title">Profit Calculator</h5>
        <div className="mb-3">
          <label htmlFor="itemAmount" className="form-label">
            Item Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="itemAmount"
            value={itemAmount}
            onChange={handleItemAmountChange}
          />
        </div>
        <p>Total Profit: {totalProfit}</p>
        <p>GE Tax Deduction: {geTaxDeduction}</p>
        <p>Expected Turnover: {expectedTurnover}</p>
      </div>
    </div>
  );
};
