import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { listCategories, listProducts } from "../actions";

export default function OrderScreen() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [product, setProduct] = useState({});

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;

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

  return (
    <div className="orderscreen">
      <div>
        <div>
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div onClick={() => categoryClickHandler("")}>전체</div>
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => categoryClickHandler(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </>
          )}
        </div>
        <div>
          {loadingProducts ? (
            <div></div>
          ) : errorProducts ? (
            <div>{errorProducts}</div>
          ) : (
            products.map((product) => (
              <div>
                <div>
                  <img src={product.image} alt={product.name} />
                </div>
                <div>
                  <div>{product.name}</div>
                  <div>{product.price} 원</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div>
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  );
}
