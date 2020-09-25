import React, { useEffect } from "react";
import "./Order.css";
import moment from "moment";
const Order = ({ order }) => {
  useEffect(() => {}, [order]);
  return (
    <div className="order">
      <div className="order__orderList" key={order.id}>
        <div className="orderList__top">
          <h3>
            Amount paid ( {order.basket?.length} items ) : ₹{order.amount}
          </h3>
          <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
        </div>
        <div className="orderList__bottom">
          {order.basket?.map((item) => (
            <div className="orderList__items" key={item.id}>
              <div className="orderList__itemsImage">
                <img src={item.image} />
              </div>
              <div className="orderList__itemsInfo">
                <p className="orderList__itemsTitle">
                  {item.title.slice(0, 200)}
                  {item.title.length > 200 ? "..." : null}
                </p>
                <p className="orderList__itemsPrice">
                  <strong> Item Cost : </strong>₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Order;
