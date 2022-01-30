import React from "react";
import CardProduct from "../components/userCard/CardProduct";
import AppContext from "../components/context/context";

export default function Home({ onAddToFavorite, isLoading }) {
  const { items, AddToCart } = React.useContext(AppContext);

  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return (isLoading ? [...Array(10)] : filterItems).map((item, index) => (
      <CardProduct
        key={index}
        {...item}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => AddToCart(obj)}
        isLoading={isLoading}
      />
    ));
  };

  const [searchValue, setSearchValue] = React.useState("");

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

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
      <div className="allCards">{renderItems()}</div>
    </div>
  );
}
