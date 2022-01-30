import React from "react";
import AppContext from "../context/context";

const Info = ({ img, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="empty">
      <img src={img} alt="box" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenBtn">
        <img src="/img/arrow_back.svg" alt="arrow" />
        Вертнуться назад
      </button>
    </div>
  );
};

export default Info;
