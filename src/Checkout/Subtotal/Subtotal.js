import React, { useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./../../StateProvider/StateProvider";
import { getBasketTotal } from "./../../StateProvider/Reducers/reducer";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {}, [basket]);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length || 0} items) :
              <strong>{`${value} `}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button
        onClick={(e) => {
          console.log(history);
          history.push("/payment");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
