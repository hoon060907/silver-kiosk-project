import React, { useContext, useState } from "react";
import { Store } from "../Store";
import { setOrderType } from "../actions";
import { useNavigate } from "react-router-dom";
import "../style.css";
import Header from "../Header";

const ChooseScreen = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const callHandler = () => {
    setIsOpen(true);
  };

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    navigate("/order");
  };

  return (
    <div
      className="choose"
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      <Header nostep={true} callHandler={callHandler} />
      <div style={{ display: isOpen ? "flex" : "none" }} className="modal">
        <h1>직원을 호출하였습니다.</h1>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          닫기
        </button>
      </div>
      <div className="selectarea">
        <div className="speech_bubble_choose">
          <img src="/images/speechbubble3.png" alt="" />
        </div>
        <div className="selectbox">
          <div onClick={() => chooseHandler("매장")}>
            <img src="/images/storefront.png" alt="" />
            <h1>매장</h1>
          </div>
          <div onClick={() => chooseHandler("포장")}>
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
