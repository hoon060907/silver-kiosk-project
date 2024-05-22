import React from "react";
import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <ul className="steplist">
        <li className="step">
          <h1 className="step_num">1</h1>
          <h1 className="step_name">메뉴선택</h1>
        </li>
        <li className="step">
          <h1 className="step_num">2</h1>
          <h1 className="step_name">결제하기</h1>
        </li>
        <li className="step">
          <h1 className="step_num">3</h1>
          <h1 className="step_name">완료</h1>
        </li>
      </ul>
      <button className="header_call">
        <h5>호출</h5>
      </button>
    </div>
  );
}
