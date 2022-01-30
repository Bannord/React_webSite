import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./orders.scss";

import CardProduct from "../components/userCard/CardProduct";

function Favorites() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get(
          "https://61d88d72e6744d0017ba8bba.mockapi.io/orders"
        );

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch {
        alert("Ошибка при запросе заказов");
        console.error("error");
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="all">
      <div className="titleWrapper">
        <h1>Мои Заказы</h1>
      </div>
      <div className="allCards">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <CardProduct key={index} {...item} isLoading={isLoading} />
        ))}
      </div>
      {orders.length === 0 ? (
        <div className="infoRow">
          <img src="/img/sad.jpg" alt="sad" width={70} height={70} />

          <h2>У вас нет заказов</h2>
          <div className="textInfo">
            Вы нищеброд? Оформите хотя бы один заказ.
          </div>
          <Link to="/">
            <button className="greenBtn">
              <img src="img/arrow_back.svg" alt="Arrow" />
              Вернутся назад
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Favorites;
