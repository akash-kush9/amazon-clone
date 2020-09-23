import React, { useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./../../StateProvider/StateProvider";
import * as actionTypes from "./../../StateProvider/actionTypes";
const Product = ({ id, title, price, image, rating }) => {
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };
  return (
    <div className="product" id={id}>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price} </strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={() => addToBasket()}>Add to Basket</button>
    </div>
  );
};

export default Product;
