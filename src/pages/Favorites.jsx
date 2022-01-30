import CardProduct from "../components/userCard/CardProduct";
import React from "react";

import AppContext from "../components/context/context";

function Favorites({ onAddToFavorite }) {
  const { favorites } = React.useContext(AppContext);

  return (
    <div className="all">
      <div className="titleWrapper">
        <h1>Мои закладки</h1>
      </div>
      <div className="allCards">
        {favorites.map((item, index) => (
          <CardProduct
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
