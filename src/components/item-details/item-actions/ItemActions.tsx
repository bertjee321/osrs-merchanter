// Mark as interesting / favorite
// Add to watchlist
// Log actions (for tracking profits/losses)

interface ItemActionsProps {
  itemId: string;
}

export const ItemActions = ({ itemId }: ItemActionsProps) => {
  const openWikiHandler = () => {
    window.open(`https://prices.runescape.wiki/osrs/item/${itemId}`, "_blank");
  };

  return (
    <div className="mb-4">
      <button className="btn btn-primary me-2">Mark as Favorite</button>
      <button className="btn btn-secondary me-2">Add to Watchlist</button>
      <button className="btn btn-success me-2">Log Action</button>
      <button className="btn btn-outline-danger" onClick={openWikiHandler}>
        Go to Wiki
      </button>
    </div>
  );
};
