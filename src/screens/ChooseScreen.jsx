import React, { useContext } from "react";
import { Store } from "../Store";
import { setOrderType } from "../actions";
import { useNavigate } from "react-router-dom";
import "../style.css";
import Header from "../Header";

const ChooseScreen = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    navigate("/order");
  };

  return (
    <div className="choose">
      <Header />
      <div className="selectarea">
        <div className="speech_bubble_choose">
          <img src="/images/speechbubble3.png" alt="" />
        </div>
        <div className="selectbox">
          <div onClick={() => chooseHandler("Eat in")}>
            <img src="/images/storefront.png" alt="" />
            <h1>매장</h1>
          </div>
          <div onClick={() => chooseHandler("Take out")}>
            <img src="/images/shopping_bag.png" alt="" />
            <h1>
              포장
              <br />
              (일회용)
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseScreen;
