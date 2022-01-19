import React from "react";
import "./CardProduct.scss";

function CardProduct({ img, title, price, onPlus, onFavorite, favorited }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus({ img, title, price });
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({ img, title, price });
  };

  return (
    <div className="card">
      <div className="fevorite">
        <img
          onClick={onClickFavorite}
          src={isFavorite ? "/img/heardLiked.svg" : "/img/heardUnliked.svg"}
          alt="Unliked"
        />
      </div>
      <img className="cardImg" src={img} alt="Sneakers" />
      <p className="cardTitle">{title}</p>
      <div className="cardWrapper">
        <div className="cardInfo">
          <span>Цена:</span>
          <b>{price}руб.</b>
        </div>

        <img
          className="btnPlus"
          onClick={onClickPlus}
          src={isAdded ? "/img/btnchecked.svg" : "/img/plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
}

export default CardProduct;
