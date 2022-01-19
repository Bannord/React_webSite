import CardProduct from "../components/userCard/CardProduct";
import React from "react";

function Favorites({ items }) {
  return (
    <div className="all">
      <div className="titleWrapper">
        <div className="allCards">
          {items.map((item, index) => (
            <CardProduct
              key={index}
              title={item.title}
              price={item.price}
              img={item.img}
              favorited={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
