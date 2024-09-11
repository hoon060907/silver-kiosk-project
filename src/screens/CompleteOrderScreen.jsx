import React, { useContext, useEffect } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { createOrder } from "../actions";

export default function CompleteOrderScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { order } = state;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      console.log(order);
      createOrder(dispatch, order);
    }
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [order, dispatch]);

  return (
    <div className="complete_order_screen">
      <Header step3={true} />
      <div className="complete_order_area">
        <img src="/images/check.png" alt="check" />
        <h1>
          주문이 완료되었습니다. <br />
          영수증을 출력합니다.
        </h1>
        <h1>5초 후 종료됩니다.</h1>
      </div>
    </div>
  );
}
