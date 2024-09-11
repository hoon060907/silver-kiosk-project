import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const callHandler = () => {
    setIsOpen(true);
  };
  return (
    <div
      className="homescreen"
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
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
      <div className="img_area">
        <img src="/images/homeimg.png" />
      </div>
      <div className="start_area">
        <div className="start_btn_area">
          <h3 className="speech_bubble">
            <img src="/images/speechbubble1.png" alt="" />
          </h3>
          <button
            className="start_button home_btn"
            onClick={() => navigate("/notice")}
          >
            <h1>주문 시작하기</h1>
          </button>
        </div>
        <div className="call_btn_area">
          <h3 className="speech_bubble">
            <img src="/images/speechbubble2.png" alt="" />
          </h3>
          <button className="call_button home_btn" onClick={callHandler}>
            <h1>직원 호출</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
