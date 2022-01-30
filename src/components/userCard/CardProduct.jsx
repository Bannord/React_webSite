import React from "react";
import "./CardProduct.scss";
import ContentLoader from "react-content-loader";

import AppContext from "../context/context";

function CardProduct({
  id,

  img,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  isLoading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, img, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  return (
    <div className="card">
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="10" y="234" rx="8" ry="8" width="80" height="24" />
          <rect x="115" y="230" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="144" />
          <rect x="0" y="161" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="185" rx="3" ry="3" width="93" height="15" />
        </ContentLoader>
      ) : (
        <>
          {" "}
          <div className="fevorite">
            {onFavorite && (
              <img
                onClick={onClickFavorite}
                src={
                  isFavorite ? "/img/heardLiked.svg" : "/img/heardUnliked.svg"
                }
                alt="Unliked"
              />
            )}
          </div>
          <img className="cardImg" src={img} alt="Sneakers" />
          <p className="cardTitle">{title}</p>
          <div className="cardWrapper">
            <div className="cardInfo">
              <span>Цена:</span>
              <b>{price}руб.</b>
            </div>

            {onPlus && (
              <img
                className="btnPlus"
                onClick={onClickPlus}
                src={isItemAdded(id) ? "/img/btnchecked.svg" : "/img/plus.svg"}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CardProduct;
