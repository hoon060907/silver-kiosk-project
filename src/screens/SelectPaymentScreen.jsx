import React, { useContext, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { FaCheckCircle } from "react-icons/fa";

export default function SelectPaymentScreen() {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("");

  const { state } = useContext(Store);
  const { orderItems, itemsCount, totalPrice } = state.order;

  const [isOpen, setIsOpen] = useState(false);
  const callHandler = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="selectpaymentscreen"
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      <Header step2={true} callHandler={callHandler} />
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
      <div className="selectpaymentarea">
        <div className="order_review_area">
          <div className="review_item_list">
            {orderItems.map((orderItem) => (
              <div className="review_item">
                <div className="review_item_name">{orderItem.name}</div>
                <div className="review_item_num">{orderItem.quantity}</div>
                <div className="review_item_price">
                  {orderItem.quantity * orderItem.price}원
                </div>
              </div>
            ))}
          </div>
          <div className="order_info" style={{ width: "100%" }}>
            <div>총 수량</div>
            <div>{itemsCount}</div>
          </div>
          <div className="order_info" style={{ width: "100%" }}>
            <div>결제 예정 금액</div>
            <div>{totalPrice} 원</div>
          </div>
        </div>
        <div className="select_payment_area">
          <h1>결제 방법 선택</h1>
          <div className="card_and_qoupon">
            <img
              src="/images/card.png"
              alt="card"
              onClick={() => {
                setOrderType("card");
                document.querySelector(".card_check").style.display = "block";
                document.querySelector(".qoupon_check").style.display = "none";
              }}
            />
            <FaCheckCircle className="card_check check" />
          </div>
          <div className="card_and_qoupon">
            <img
              src="/images/coupon.png"
              alt="coupon"
              onClick={() => {
                setOrderType("coupon");
                document.querySelector(".qoupon_check").style.display = "block";
                document.querySelector(".card_check").style.display = "none";
              }}
            />
            <FaCheckCircle className="qoupon_check check" />
          </div>
          <img src="/images/about_cash.png" alt="" />
          <div className="order_btn_area">
            <button
              onClick={() => {
                navigate("/order");
              }}
            >
              돌아가기
            </button>
            <button
              onClick={() => {
                navigate("/complete");
              }}
              style={{ background: "#ff0000", color: "#fff" }}
              disabled={!orderType}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
