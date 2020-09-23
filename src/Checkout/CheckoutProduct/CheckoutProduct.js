import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../StateProvider/StateProvider";
import * as actionTypes from "../../StateProvider/actionTypes";
const CheckoutProduct = () => {
  const [{ basket }, dispatch] = useStateValue();
  const removeBasketItem = (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      id: id,
    });
  };
  return (
    <div className="checkoutProducts">
      {basket?.length == 0 ? (
        <div className="checkoutProduct__emptyBasket">
          <img src="%PUBLIC_URL%/emptyBasket.png" />
          Oh snap empty basket
        </div>
      ) : (
        basket.map((item) => (
          <div className="checkoutProduct" id={item.id}>
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
                  <small>$</small>
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
