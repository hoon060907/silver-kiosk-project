import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <div className="notice_screen">
      <h1 style={{ marginBottom: "70px", fontSize: "50px" }}>
        무인주문기(키오스크) 결제 안내
      </h1>
      <h2 style={{ marginBottom: "50px", fontSize: "34px" }}>
        무인주문기 에서는 현금결제가{" "}
        <span style={{ color: "red" }}>불가능</span>
        합니다.
        <br />
        현금 주문은 매장 카운터에서 도와드리겠습니다.
      </h2>
      <button
        style={{
          width: "200px",
          height: "80px",
          backgroundColor: "#4C956C",
          border: "none",
          borderRadius: "10px",
          fontSize: "30px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/choose");
        }}
      >
        <h4>확인</h4>
      </button>
    </div>
  );
}
