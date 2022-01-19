import axios from "axios";
import React from "react";
import CardProduct from "../components/userCard/CardProduct";

export default function Home(setFavorites, setCartItems, cartItems) {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const onAddToFavorite = (obj) => {
    axios.post("https://61d88d72e6744d0017ba8bba.mockapi.io/favorites", obj);

    setFavorites((prev) => [...cartItems, obj]);
  };

  const AddToCart = (obj) => {
    axios.post("https://61d88d72e6744d0017ba8bba.mockapi.io/cart", obj);

    setCartItems((prev) => [...cartItems, obj]);
  };

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };
  React.useEffect(() => {
    axios
      .get("https://61d88d72e6744d0017ba8bba.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
  }, []);
  return (
    <div className="all">
      <div className="titleWrapper">
        {" "}
        <h1 className="cardTitle">
          {searchValue ? `Вы ищете товар: '${searchValue}'` : "Все товары"}
        </h1>
        <div className="searchBlock">
          <img src="./img/search.svg" alt="Search" />
          <input onChange={onChangeInput} placeholder="Поиск..." />
        </div>
      </div>
      <div className="allCards">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
          )
          .map((item, index) => (
            <CardProduct
              key={index}
              title={item.title}
              price={item.price}
              img={item.img}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => AddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}
