import React, { useState, useEffect } from "react";
import "./Payment.css";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./../axios";
import * as actionTypes from "./../StateProvider/actionTypes";
import { useStateValue } from "../StateProvider/StateProvider";
import { getBasketTotal } from "./../StateProvider/Reducers/reducer";
import { db } from "../firebase";
const Payment = () => {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [{ basket, authuser }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const getClientSecrect = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects  the total in a currencies subunits (1 dollar => 100 cents)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecrect();
  }, [basket, authuser]);
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
    // console.log("card >>>> ", elements.getElement(CardElement));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(
        ({ paymentIntent }) => {
          db.collection("users")
            .doc(authuser?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
          setSucceeded(true);
          setProcessing(false);
          setError(null);
          dispatch({ type: actionTypes.EMPTY_BASKET });

          history.replace("/orders");
        },
        (error) => {
          setSucceeded(false);
          setProcessing(false);
          setError(error);
        }
      );
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h2>Delivery Address</h2>
          </div>
          <div className="payment__address">
            <p>{authuser?.email}</p>
            <p>{authuser?.address?.line1 || "Line 1"}</p>
            <p>{authuser?.address?.line2 || "Line 2"}</p>
            <p>{authuser?.address?.pincode || "Pincode"}</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h2>Review items and delivery</h2>
          </div>
          <div className="payment__items">
            <CheckoutProduct />
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h2>Payment Method</h2>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3> Order Total : {value} </h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"₹"}
                />
                <button
                  className="payment__button"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p> Processing... </p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
