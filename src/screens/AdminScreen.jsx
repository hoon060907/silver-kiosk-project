import React, { useContext, useEffect } from "react";
import { Store } from "../Store";
import { listOrders } from "../actions";
import Axios from "axios";

export default function AdminScreen() {
  const { state, dispatch } = useContext(Store);

  const { orders, loading, error } = state.orderList;

  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]);

  const orderDeliverHandler = async (order) => {
    try {
      await Axios.put("/api/orders/" + order._id);
      listOrders(dispatch);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="adminscreen">
      {loading ? (
        <div></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="table">
          <div className="thead">
            <div className="th">주문번호</div>
            <div className="th">종류</div>
            <div className="th">메뉴</div>
            <div className="th">주문유형</div>
            <div className="th">배달</div>
          </div>
          <div className="tbody">
            {orders.map((order) => (
              <div className="tr" key={order.name}>
                <div className="td">{order.number}</div>
                <div className="td">{order.orderItems.length}</div>
                <div className="td">
                  {order.orderItems.map((item) => (
                    <div>
                      {`${item.name} ${
                        item.option1 ? "(" + item.option1 + "," : ""
                      } ${item.option2 ? item.option2 + ")" : ""}`}
                      {item.quantity}개
                    </div>
                  ))}
                </div>
                <div className="td">{order.orderType}</div>
                <div className="td">
                  <button onClick={() => orderDeliverHandler(order)}>
                    배달
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
