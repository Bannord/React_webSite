import React from "react";
import "./CartDrawer.scss";
import axios from "axios";
import Info from "./info";

import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CartDrawer({ onClose, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isCompletedId, setIsCompletedId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickCompleted = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://61d88d72e6744d0017ba8bba.mockapi.io/orders`,
        { items: cartItems }
      );
      setIsCompletedId(data.id);
      setIsCompleted(true);
      setCartItems([]);
      // Не бейте))))) //
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://61d88d72e6744d0017ba8bba.mockapi.io/cart/` + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      console.log("Ошибка при создании заказа!");
    }
    setIsLoading(false);
  };

  const onRemoveAddCart = (id) => {
    axios.delete(`https://61d88d72e6744d0017ba8bba.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  return (
    <div className={`overlay ${opened ? `overlayVisible` : ""}`}>
      <div className="drawer">
        <h2 className="cartTitle">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn"
            src="/img/btnremove.svg"
            alt="Close"
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className="cartsRow">
              {cartItems.map((obj) => (
                <div className="cartItem" key={obj.id}>
                  <div
                    style={{ backgroundImage: `url(${obj.img})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="cartWrapper">
                    <p className="cartText">{obj.title}</p>
                    <b className="cartPrice">{obj.price}руб.</b>
                  </div>
                  <img
                    onClick={() => onRemoveAddCart(obj.id)}
                    className="removeBtn"
                    src="/img/btnremove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartFootWrapper">
              <ul className="cartFoot">
                <li className="cartFootTitle">
                  <span>Итого</span>
                  <div className="cartFootDashed"></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li className="cartFootTitle">
                  <span>На поесть </span>
                  <div className="cartFootDashed"></div>
                  <b>{(totalPrice / 100) * 2} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickCompleted}
                className="greenBtn"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isCompleted
                ? `Ваш заказ #${isCompletedId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы один товар, чтобы сделать заказ"
            }
            img={isCompleted ? "/img/complete.jpg" : "/img/empty_box.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
