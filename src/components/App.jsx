import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main.scss";
import axios from "axios";

import Header from "./header/header";
import CartDrawer from "./cartDrawer/CartDrawer";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Orders from "../pages/Orders";
import AppContext from "./context/context";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(
          `https://61d88d72e6744d0017ba8bba.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://61d88d72e6744d0017ba8bba.mockapi.io/favorites",
          obj
        );

        setFavorites((cartItems) => [...cartItems, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };
  const AddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );
    if (findItem) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      );

      await axios.delete(
        `https://61d88d72e6744d0017ba8bba.mockapi.io/cart/${findItem.id}`
      );
    } else {
      const { data } = await axios.post(
        "https://61d88d72e6744d0017ba8bba.mockapi.io/cart",
        obj
      );
      setCartItems((cartItems) => [...cartItems, data]);
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://61d88d72e6744d0017ba8bba.mockapi.io/cart"),
            axios.get("https://61d88d72e6744d0017ba8bba.mockapi.io/favorites"),
            axios.get("https://61d88d72e6744d0017ba8bba.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch {
        alert("Ошибка при запросе данных, повторите попытку позже :)");
      }
    }
    fetchData();
  }, []);

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorited = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToFavorite,
        AddToCart,
        isItemFavorited,
      }}
    >
      <div className="mane-wrapper">
        <CartDrawer onClose={() => setCartOpened(false)} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home onAddToFavorite={onAddToFavorite} isLoading={isLoading} />
            }
          ></Route>
          <Route
            path="/favorites"
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          ></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
