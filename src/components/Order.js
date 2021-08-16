import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Button } from "@material-ui/core";

import { getAllOrders } from "./API/API";
import LoginButton from "./forms/LoginButton";

const Order = () => {
  const { data } = useQuery("Orders", getAllOrders);

  return (
    <div className="container cart-page">
      {localStorage.getItem("token") && (
        <div
          className="step-indicator"
          style={{ justifyContent: "flex-start" }}
        >
          <h2>YOUR ORDERS</h2>
        </div>
      )}
      <div className="cart-items">
        {data && data.length > 0 ? (
          data.map((order) => {
            return (
              <div key={order.order_id} className="cartItemDetail">
                {/* FIRST PART */}
                <div className="firstPart">
                  <img src={order.order_image} alt={order.title} />
                </div>

                {/* MIDDLE DIV SEPARATOR */}
                <div className="sepDivCart"></div>

                <div className="secondPart">
                  <div className="secondPart-one">
                    <h2>{order.title.toUpperCase()}</h2>
                    <div>Size: {order.order_size}</div>
                    <br />
                    <div>Quantity: {order.order_quantity}</div>
                    <p>
                      Status:{" "}
                      <b>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </b>
                    </p>
                    <p>Date: {order.order_date.split("T")[0]}</p>
                  </div>
                  <div
                    className="secondPart-two"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div>
                        ${order.price} x {order.order_quantity}
                      </div>
                      <h4>Total:&nbsp; ${order.total_price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : localStorage.getItem("token") ? (
          <div>
            <h2>You don't have any active order yet!</h2>
            <Link to="/shop/all" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  borderRadius: "50px",
                  backgroundColor: "#A8D50B",
                  color: "#131212",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  marginBottom: "2em",
                }}
              >
                ADD ITEMS FROM SHOP
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Please Login to place order.</h2>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
