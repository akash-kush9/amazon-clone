import React from "react";
import { useStateValue } from "../StateProvider/StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import Subtotal from "./Subtotal/Subtotal";
const Checkout = () => {
  const [{ authuser }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img15/home/LA/exchange_offers._V278112460_.jpg"
        />
        <div>
          <h3 className="checkout__title">
            Hello, {authuser?.displayName || authuser?.email.split("@")[0]}
          </h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
        </div>
        <CheckoutProduct />
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
