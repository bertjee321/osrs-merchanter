import React from "react";

export const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? "active" : ""}`}
      onClick={handleClick}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};
