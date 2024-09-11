import React from "react";
import "./style.css";
import classNames from "classnames";

export default function Header({ nostep, step1, step2, step3, callHandler }) {
  const opacity = { opacity: "1" };
  const display = { display: "none" };
  return (
    <div className="header">
      <ul className={classNames("steplist", { nostep })}>
        <li className="step" style={step1 && opacity}>
          <img src="images/num1.png" className="step_num" alt="" />
          <h1 className="step_name">메뉴선택</h1>
        </li>
        <li className="step" style={step2 && opacity}>
          <img src="images/num2.png" className="step_num" alt="" />
          <h1 className="step_name">결제하기</h1>
        </li>
        <li className="step" style={step3 && opacity}>
          <img src="images/num3.png" className="step_num" alt="" />
          <h1 className="step_name">완료</h1>
        </li>
      </ul>
      <button className="header_call" style={step3 && display}>
        <h5
          onClick={() => {
            callHandler();
          }}
        >
          호출
        </h5>
      </button>
    </div>
  );
}
