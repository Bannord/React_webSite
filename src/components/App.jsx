import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main.scss";
import axios from "axios";

import Headers from "./header/header";
import CartDrawer from "./cartDrawer/CartDrawer";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";

function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [cartOpened, setCartOpened] = React.useState(false);

  const onRemoveAddCart = (id) => {
    axios.delete(`https://61d88d72e6744d0017ba8bba.mockapi.io/cart ${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  React.useEffect(() => {
    axios
      .get("https://61d88d72e6744d0017ba8bba.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://61d88d72e6744d0017ba8bba.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/favorites"
          element={<Favorites items={favorites} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
