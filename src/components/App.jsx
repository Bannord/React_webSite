import React from "react";
import "./main.scss";
import axios from "axios";
import CardProduct from "./userCard/CardProduct";
import Headers from "./header/header";
import CartDrawer from "./cartDrawer/CartDrawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://61d88d72e6744d0017ba8bba.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://61d88d72e6744d0017ba8bba.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const AddToCart = (obj) => {
    axios.post("https://61d88d72e6744d0017ba8bba.mockapi.io/cart", obj);

    setCartItems((prev) => [...cartItems, obj]);
  };

  const onAddToFavorite = (obj) => {
    axios.post("https://61d88d72e6744d0017ba8bba.mockapi.io/favorites", obj);

    setFavorites((prev) => [...cartItems, obj]);
  };

  const onRemoveAddCart = (id) => {
    axios.delete(`https://61d88d72e6744d0017ba8bba.mockapi.io/cart/ ${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="mane-wrapper">
      {cartOpened ? (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveAddCart}
        />
      ) : null}
      <Headers onClickCart={() => setCartOpened(true)} />

      {/* потом будет как компонент */}

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
    </div>
  );
}

export default App;
