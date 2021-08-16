import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import AddressForm from "./forms/AddAddressForm";
import { getAllAddress, deleteAddress, getAllCart } from "./API/API";
import { DeleteForever, Close } from "@material-ui/icons";
import { Button, Modal, makeStyles, IconButton } from "@material-ui/core";
import LoginButton from "./forms/LoginButton";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "fit-content",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 6, 6),
    borderRadius: "3em",
    outline: "none",
  },
}));

const Address = () => {
  // const [displayModal, setDisplayModal] = useState("none");
  const { data } = useQuery("Address", getAllAddress);
  const { mutate } = useMutation(deleteAddress);
  const allCartData = useQuery("Cart", getAllCart);
  const history = useHistory();

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const cartData = allCartData.data;
  // console.log(data);

  // Grand Total
  const grandTotal = () => {
    let total = 0;
    cartData &&
      cartData.map((item) => (total += item.price * item.cart_quantity));

    return total.toFixed(2);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="formCloseButton">
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <AddressForm />
    </div>
  );

  return (
    <div className="container cart-page">
      <div className="step-indicator">
        <div>Bag</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div className="active-page">Address</div>
        &nbsp;
        <div>----------</div>
        &nbsp;
        <div>Payment</div>
      </div>

      <div className="cart-items">
        {data && data.length > 0 ? (
          data.map((address) => {
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
                <div>
                  <IconButton
                    onClick={() => {
                      mutate({ id: address.id });
                      window.location.reload();
                    }}
                    style={{ border: "none", color: "#F61D1D" }}
                  >
                    <DeleteForever />
                  </IconButton>
                </div>
              </div>
            );
          })
        ) : localStorage.getItem("token") ? (
          <div>
            <h2>Add your shipping address.</h2>
            <Button
              onClick={handleOpen}
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
              ADD ADDRESS
            </Button>
            <Modal open={open} onClose={handleClose}>
              {body}
            </Modal>
          </div>
        ) : (
          <div>
            <h2>Please Login to add shipping address.</h2>
            <LoginButton />
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <div
        className="summary"
        style={
          !localStorage.getItem("token")
            ? { display: "none" }
            : cartData && cartData.length < 1
            ? { display: "none" }
            : null
        }
      >
        <div className="summary-details">
          <h2>Summary</h2>
          {cartData &&
            cartData.map((cartItem) => {
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
            cartData && cartData.length < 1
              ? "disabled"
              : !localStorage.getItem("token")
              ? "disabled"
              : data && data.length < 1
              ? "disabled"
              : null
          }
          onClick={() => history.push("/checkout/payment")}
          style={
            data && data.length < 1
              ? {
                  width: "100%",
                  backgroundColor: "#5e636e",
                  padding: "0.6em",
                  color: "#9196a1",
                  borderRadius: "50px",
                  fontFamily: "FiraSansExtraCondensed-Bold",
                  letterSpacing: "2px",
                  fontSize: "1.1em",
                  marginTop: "30px",
                }
              : {
                  width: "100%",
                  backgroundColor: "#2D3035",
                  padding: "0.6em",
                  color: "#ffffff",
                  borderRadius: "50px",
                  fontFamily: "FiraSansExtraCondensed-Bold",
                  letterSpacing: "2px",
                  fontSize: "1.1em",
                  marginTop: "30px",
                }
          }
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default Address;
