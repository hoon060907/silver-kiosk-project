import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import {
  addToOrder,
  clearOrder,
  listCategories,
  listProducts,
  removeFromOrder,
} from "../actions";
import Header from "../Header";

export default function OrderScreen() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const callHandler = () => {
    setIsOpen(true);
  };

  const [categoryName, setCategoryName] = useState("햄버거");
  const [product, setProduct] = useState({ name: "", image: "" });
  const [side, setSide] = useState({ name: "", image: "" });
  const [beverage, setBeverage] = useState({ name: "", image: "" });

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;

  const { orderItems, itemsCount, totalPrice } = state.order;
  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch, categories, categoryName]);

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };

  const editOrderHandler = (item, quantity) => {
    if (quantity <= 0) {
      removeFromOrder(dispatch, item);
      console.log(orderItems);
    } else addToOrder(dispatch, { ...item, quantity });
  };

  const addToOrderHandler = (product) => {
    console.log("실행중");
    const item = orderItems.find(
      (orderItem) =>
        orderItem.name === product.name &&
        orderItem.option1 === product.option1 &&
        orderItem.option2 === product.option2
    );
    if (item) {
      editOrderHandler(item, item.quantity + 1);
      console.log("히히");
    } else {
      editOrderHandler(product, 1);
      console.log("해해");
      console.log(orderItems);
    }
  };

  const selectPaymentHandler = () => {
    navigate("/selectpayment");
  };

  return (
    <div
      className="orderscreen"
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      <Header step1={true} callHandler={callHandler} />
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
      <div className="orderburger">
        {/* 세트 or 단품 선택 */}
        <div className="burger_order_type">
          <button
            onClick={() => {
              document.querySelector(".burger_order_type").style.display =
                "none";
              document.querySelector(".select_side").style.display = "block";
              listProducts(dispatch, "곁들임");
            }}
          >
            <img src="/images/setmenu.png" alt="" />
            세트 주문
          </button>
          <button
            onClick={() => {
              addToOrderHandler(product);
              document.querySelector(".burger_order_type").style.display =
                "none";
              document.querySelector(".orderburger").style.display = "none";
              document.querySelector(".order_area").style.display = "flex";
            }}
          >
            <img src="/images/single_burger.png" alt="" />
            단품 주문
          </button>
        </div>
        {/* 세트->사이드 선택 */}
        <div className="select_side">
          <h1>곁들임 선택</h1>
          <div className="option_list">
            {loadingProducts ? (
              <div></div>
            ) : errorProducts ? (
              <div>{errorProducts}</div>
            ) : (
              products.map((product) => (
                <div
                  className="product"
                  onClick={() => {
                    setSide(product);
                    document.querySelector(".select_side").style.display =
                      "none";
                    document.querySelector(".select_beverage").style.display =
                      "block";
                    listProducts(dispatch, "음료");
                  }}
                >
                  <img src={product.image} alt={product.name} />
                  <h3 className="product_desc">{product.name}</h3>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="select_beverage">
          <h1>음료 선택</h1>
          <div className="option_list">
            {loadingProducts ? (
              <div></div>
            ) : errorProducts ? (
              <div>{errorProducts}</div>
            ) : (
              products.map((product) => (
                <div
                  className="product"
                  onClick={() => {
                    setBeverage(product);
                    document.querySelector(".select_beverage").style.display =
                      "none";
                    document.querySelector(".set_order").style.display = "flex";
                  }}
                >
                  <img src={product.image} alt={product.name} />
                  <h3 className="product_desc">{product.name}</h3>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="set_order">
          <h1>{`${product.name} 세트`}</h1>
          <div className="selected_options">
            <div>
              <img src={product.image} alt="" />
              <div>{product.name}</div>
            </div>
            <div>
              <img src={side.image} alt="" />
              <div>{side.name}</div>
            </div>
            <div>
              <img src={beverage.image} alt="" />
              <div>{beverage.name}</div>
            </div>
          </div>
          <div className="set_btn_area">
            <button
              onClick={() => {
                document.querySelector(".orderburger").style.display = "none";
                document.querySelector(".set_order").style.display = "none";
                document.querySelector(".order_area").style.display = "flex";
                setProduct({ name: "", image: "" });
                setSide({ name: "", image: "" });
                setBeverage({ name: "", image: "" });
                listProducts(dispatch, categoryName);
              }}
            >
              취소하기
            </button>
            <button
              onClick={() => {
                const set = {
                  ...product,
                  name: product.name + " 세트",
                  option1: side.name,
                  option2: beverage.name,
                };
                console.log(set);
                addToOrderHandler(set);
                document.querySelector(".orderburger").style.display = "none";
                document.querySelector(".set_order").style.display = "none";
                document.querySelector(".order_area").style.display = "flex";
                setProduct(product);
                setProduct({ name: "", image: "" });
                setSide({ name: "", image: "" });
                setBeverage({ name: "", image: "" });
                listProducts(dispatch, categoryName);
              }}
            >
              이대로 주문하기
            </button>
          </div>
        </div>
      </div>

      <div className="order_area">
        <div className="menu_select_area">
          <div className="category_list">
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                {categories.map((category) => (
                  <h3
                    key={category.name}
                    onClick={() => categoryClickHandler(category.name)}
                    className={`category ${
                      category.name === categoryName ? "selected" : ""
                    }`}
                  >
                    {category.name}
                  </h3>
                ))}
              </>
            )}
          </div>
          <div className="product_list">
            {loadingProducts ? (
              <div></div>
            ) : errorProducts ? (
              <div>{errorProducts}</div>
            ) : (
              products.map((product) => (
                <div
                  className="product"
                  onClick={() => {
                    if (product.category === "햄버거") {
                      document.querySelector(".orderburger").style.display =
                        "flex";
                      document.querySelector(
                        ".burger_order_type"
                      ).style.display = "flex";
                      document.querySelector(".order_area").style.display =
                        "none";
                      setProduct(product);
                    } else addToOrderHandler(product);
                  }}
                >
                  <img src={product.image} alt={product.name} />
                  <h3 className="product_desc">{product.name}</h3>
                  <h3 className="product_desc">{product.price} 원</h3>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="order_edit_area">
          <div className="order_list">
            {orderItems.map((orderItem) => (
              <div className="order_item">
                <div className="order_item_name">{orderItem.name}</div>
                <div className="order_item_num">{orderItem.quantity}</div>
                <div
                  className="order_item_num_edit"
                  onClick={() =>
                    editOrderHandler(orderItem, orderItem.quantity + 1)
                  }
                >
                  <HiPlusSm />
                </div>
                <div
                  className="order_item_num_edit"
                  onClick={() =>
                    editOrderHandler(orderItem, orderItem.quantity - 1)
                  }
                >
                  <HiMinusSm />
                </div>
                <div className="order_item_price">
                  {orderItem.quantity * orderItem.price}원
                </div>
              </div>
            ))}
          </div>
          <div className="order_info">
            <div>총 수량</div>
            <div>{itemsCount}</div>
          </div>
          <div className="order_info">
            <div>결제 예정 금액</div>
            <div>{totalPrice} 원</div>
          </div>
          <div className="order_btn_area">
            <button
              onClick={() => {
                clearOrder(dispatch);
                navigate("/");
              }}
            >
              취소하기
            </button>
            <button
              onClick={selectPaymentHandler}
              disabled={orderItems.length === 0}
              style={{ background: "#ff0000", color: "#fff" }}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
