import React, { useState, useEffect } from "react";
import "./Orders.css";
import { auth, db } from "./../firebase";
import { useStateValue } from "../StateProvider/StateProvider";
import Order from "./Order/Order";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ basket, authuser }, dispatch] = useStateValue();
  useEffect(() => {
    if (authuser) {
      db.collection("users")
        .doc(authuser?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((items) => ({ id: items.id, ...items.data() }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [authuser]);
  return (
    <div className="orders">
      {orders.map((order) => (
        <Order order={order} />
      ))}
    </div>
  );
};

export default Orders;
