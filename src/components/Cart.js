import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { IconButton, Button } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import { getAllCart, updateCartQty, deleteCartItem } from "./API/API";
import LoginButton from "./forms/LoginButton";

const Cart = () => {
  const { data } = useQuery("Cart", getAllCart);
  const mutation = useMutation(updateCartQty);
  const { mutate } = useMutation(deleteCartItem);
  const history = useHistory();

  // Grand Total
  const grandTotal = () => {
    let total = 0;
    data && data.map((item) => (total += item.price * item.cart_quantity));

    return total.toFixed(2);
  };
  // console.log(grandTotal());

  return (
    <div className="container cart-page">
      <div className="step-indicator">
        <div className="active-page">Bag</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div>Address</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div>Payment</div>
      </div>
      <div className="cart-items">
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
                    <div>Quantity:</div>
                    <br />
                    <div className="qtyBtnsCart">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          mutation.mutate({
                            quantity: (item.cart_quantity -= 1),
                            id: item.cart_id,
                          });
                        }}
                        style={
                          item.cart_quantity === 1
                            ? { border: "1px solid #B6B2B2" }
                            : null
                        }
                        disabled={item.cart_quantity === 1 ? "disabled" : null}
                      >
                        -
                      </button>
                      <div>{item.cart_quantity}</div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          mutation.mutate({
                            quantity: (item.cart_quantity += 1),
                            id: item.cart_id,
                          });
                        }}
                        style={
                          item.cart_quantity === 4
                            ? { border: "1px solid #B6B2B2" }
                            : null
                        }
                        disabled={item.cart_quantity === 4 ? "disabled" : null}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="secondPart-two">
                    <div style={{ textAlign: "right" }}>
                      <IconButton
                        onClick={() => {
                          mutate({
                            id: item.cart_id,
                          });
                          window.location.reload();
                        }}
                        style={{ color: "#F61D1D" }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </div>

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
          onClick={() => history.push("/checkout/address")}
          style={{
            width: "100%",
            backgroundColor: "#2D3035",
            padding: "0.6em",
            color: "#ffffff",
            borderRadius: "50px",
            fontFamily: "FiraSansExtraCondensed-Bold",
            letterSpacing: "2px",
            fontSize: "1.1em",
            marginTop: "30px",
          }}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default Cart;
