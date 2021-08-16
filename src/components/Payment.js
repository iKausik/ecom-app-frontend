import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Button } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";

import { getAllCart, getAllAddress } from "./API/API";
import LoginButton from "./forms/LoginButton";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const API_URL = process.env.REACT_APP_API_URL;

const Payment = () => {
  const { data } = useQuery("Cart", getAllCart);
  const allAddressData = useQuery("Address", getAllAddress);

  const addressData = allAddressData.data;

  // const cartData = mutate();

  // Grand Total
  const grandTotal = () => {
    let total = 0;
    data && data.map((item) => (total += item.price * item.cart_quantity));

    return total.toFixed(2);
  };

  // Stripe Payment Link
  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const session = await res.json();
    // const session = mutate();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="container cart-page">
      <div className="step-indicator">
        <div>Bag</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div>Address</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div className="active-page">Payment</div>
      </div>

      <div className="cart-items">
        {localStorage.getItem("token") && (
          <h3 style={{ letterSpacing: "2px", textDecoration: "underline" }}>
            Confirm Details and Checkout
          </h3>
        )}
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div key={item.cart_id} className="cartItemDetail">
                {/* FIRST PART */}
                <div className="firstPart">
                  <img src={item.cart_image} alt={item.title} />
                </div>

                {/* MIDDLE DIV SEPARATOR */}
                <div className="sepDivCart"></div>

                {/* SECOND PART */}
                <div className="secondPart">
                  <div className="secondPart-one">
                    <h2>{item.title.toUpperCase()}</h2>
                    <div>Size: {item.size}</div>
                    <br />
                    <div>Quantity: {item.cart_quantity}</div>
                    {/* <br /> */}
                  </div>

                  <div
                    className="secondPart-two"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div>
                        ${item.price} x {item.cart_quantity}
                      </div>
                      <h4>
                        Total:&nbsp; $
                        {(item.cart_quantity * item.price).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : localStorage.getItem("token") ? (
          <div>
            <h2>It feels so light!</h2>
            <p>There's nothing in your bag. Let's add some items.</p>
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
            <h2>Please Login to add items to cart.</h2>
            <LoginButton />
          </div>
        )}
        {/* ADDRESS */}
        {addressData &&
          addressData.length > 0 &&
          addressData.map((address) => {
            return (
              <div key={address.id} className="cartItemDetail">
                <div>
                  <h2>SHIPPING ADDRESS</h2>
                  <p>{address.address}</p>
                  <p>{address.locality}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.zip}</p>
                </div>
              </div>
            );
          })}
      </div>

      <div
        className="summary"
        style={
          !localStorage.getItem("token")
            ? { display: "none" }
            : data && data.length < 1
            ? { display: "none" }
            : null
        }
      >
        <div className="summary-details">
          <h2>Summary</h2>
          {data &&
            data.map((cartItem) => {
              return (
                <div key={cartItem.id} className="summary-details-one">
                  <div>{cartItem.title.toUpperCase()}</div>
                  <div className="totalSummaryNums">
                    ${(cartItem.price * cartItem.cart_quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          <hr />
          <div className="summary-details-two">
            <div>
              <div>
                <b>Subtotal</b>
              </div>
              <div>Delivery Charges</div>
            </div>
            <div>
              <div className="totalSummaryNums">
                <b>${grandTotal()}</b>
              </div>
              <div className="totalSummaryNums">${(0).toFixed(2)}</div>
            </div>
          </div>
          <hr />
          <div className="summary-details-two">
            <div>
              <b>Grand Total</b>
            </div>
            <div className="totalSummaryNums">
              <b>${grandTotal()}</b>
            </div>
          </div>
        </div>

        {/* MIDDLE DIV SEPARATOR */}
        <div className="sepDivCart"></div>

        <Button
          disabled={
            data && data.length < 1
              ? "disabled"
              : !localStorage.getItem("token")
              ? "disabled"
              : null
          }
          onClick={handleClick}
          style={{
            width: "100%",
            backgroundColor: "#A8D50B",
            padding: "0.6em",
            color: "#131212",
            borderRadius: "50px",
            fontFamily: "FiraSansExtraCondensed-Bold",
            letterSpacing: "2px",
            fontSize: "1.1em",
            marginTop: "30px",
          }}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default Payment;
