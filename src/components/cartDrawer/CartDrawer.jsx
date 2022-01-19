import "./CartDrawer.scss";

function CartDrawer({ onRemove, onClose, items = [] }) {
  return (
    <div className="overlay">
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

        {items.length > 0 ? (
          <div className="cartsRow">
            <div className="">
              {items.map((obj) => (
                <div className="cartItem">
                  <div
                    style={{ backgroundImage: `url(${obj.img})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="cartWrapper">
                    <p className="cartText">{obj.title}</p>
                    <b className="cartPrice">{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
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
                  <b>21 498 руб. </b>
                </li>
                <li className="cartFootTitle">
                  <span>Налог </span>
                  <div className="cartFootDashed"></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenBtn">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="empty">
            <img src="/img/empty_box.jpg" alt="box" />
            <h2>Корзина Пустая</h2>
            <p>Добавьте хотя бы 1 товар, чтобы сделать заказ</p>
            <button onClick={onClose} className="greenBtn">
              <img src="/img/arrow_back.svg" alt="arrow" />
              Вертнуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
