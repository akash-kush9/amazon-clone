import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../StateProvider/StateProvider";
import * as actionTypes from "../../StateProvider/actionTypes";
import { Link } from "react-router-dom";

const CheckoutProduct = () => {
  const [{ basket }, dispatch] = useStateValue();
  const removeBasketItem = (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      id: id,
    });
  };
  return (
    /* background-image: url(""); */

    <div className="checkoutProducts">
      {basket?.length == 0 ? (
        <div className="checkoutProduct__emptyBasket">
          <div className="checkoutProduct__empMsg">
            OH SNAP!! YOU HAVE EMPTY BASKET{" "}
          </div>
          <div className="checkoutProduct__empMsg">
            <Link
              className="checkoutProduct__navLink"
              to="/"
            >{`<<-- Add new items in Basket -->>`}</Link>
          </div>
          <img
            className="checkoutProduct__empImg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT05yb5FU6uPjE4OiD-Ea6Vwqs1fK80m4xHQw&usqp=CAU"
          />
        </div>
      ) : (
        basket.map((item) => (
          <div className="checkoutProduct" key={item.id} id={item.id}>
            <small
              onClick={() => {
                removeBasketItem(item.id);
              }}
            >
              X
            </small>
            <div className="checkoutProduct__left">
              <img src={item.image} />
            </div>
            <div className="checkoutProduct__right">
              <div className="checkoutProduct__info">
                <p>{item.title}</p>
                <p className="checkoutProduct__price">
                  <small>₹</small>
                  <strong> {item.price}</strong>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CheckoutProduct;
