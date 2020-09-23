import React from "react";
import "./Payment.css";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../StateProvider/StateProvider";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>{user?.address.line1}</p>
            <p>{user?.address.line2}</p>
            <p>{user?.address.pincode}</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <CheckoutProduct />
          </div>
        </div>
        <div className="payment__section"></div>
      </div>
    </div>
  );
};

export default Payment;
