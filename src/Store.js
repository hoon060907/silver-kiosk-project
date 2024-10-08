import { createContext, useReducer } from "react";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  ORDER_ADD_ITEM,
  ORDER_CLEAR,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_REMOVE_ITEM,
  ORDER_SET_TYPE,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./constants";

export const Store = createContext(null);

const initialState = {
  categoryList: { loading: true },
  productList: { loading: true },
  order: {
    orderType: "매장",
    orderItems: [],
  },
  orderCreate: { loading: true },
  orderList: { loading: true },
};

export function reducer(state, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        categoryList: { loading: true },
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: { loading: false, categories: action.payload },
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        categoryList: { loading: false, error: action.payload },
      };
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        productList: { loading: true },
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: { loading: false, products: action.payload },
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        productList: { loading: false, error: action.payload },
      };
    case ORDER_SET_TYPE:
      return {
        ...state,
        order: { ...state.order, orderType: action.payload },
      };
    case ORDER_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.order.orderItems.find(
        (x) =>
          x.name === item.name &&
          x.option1 === item.option1 &&
          x.option2 === item.option2
      );
      const orderItems = existItem
        ? state.order.orderItems.map((x) =>
            x.name === existItem.name &&
            x.option1 === item.option1 &&
            x.option2 === item.option2
              ? item
              : x
          )
        : [...state.order.orderItems, item];

      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const totalPrice = orderItems.reduce(
        (a, c) => a + c.quantity * c.price,
        0
      );

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          totalPrice,
          itemsCount,
        },
      };
    }
    case ORDER_REMOVE_ITEM: {
      const orderItems = state.order.orderItems.filter(
        (x) =>
          x.name !== action.payload.name ||
          x.option1 !== action.payload.option1 ||
          x.option2 !== action.payload.option2
      );

      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const totalPrice = orderItems.reduce(
        (a, c) => a + c.quantity * c.price,
        0
      );

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          totalPrice,
          itemsCount,
        },
      };
    }
    case ORDER_CLEAR:
      return {
        ...state,
        order: {
          orderItems: [],
          totalPrice: 0,
          itemsCount: 0,
        },
      };
    case ORDER_CREATE_REQUEST:
      return { ...state, orderCreate: { loading: true } };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderCreate: { loading: false, newOrder: action.payload },
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        orderCreate: { loading: false, error: action.payload },
      };

    case ORDER_LIST_REQUEST:
      return { ...state, orderList: { loading: true } };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: { loading: false, orders: action.payload },
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        orderList: { loading: false, error: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
