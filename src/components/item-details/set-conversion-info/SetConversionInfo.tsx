// If item is part of set, show set conversion info (e.g. Barrows set)
// Example: Verac's helm + platebody + plateskirt + flail -> Verac's set: profit 12.3k
export const SetConversionInfo = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Set Conversion Info</h5>
        <p className="card-text">Set name: Verac's set</p>
        <p className="card-text">Profit: 12.3k</p>
        <p className="card-text">Total cost: 1.2M</p>
        <p className="card-text">Total alch profit: 1.3M</p>
      </div>
    </div>
  );
};
