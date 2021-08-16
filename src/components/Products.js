import React from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import { getAllProducts, addToCart, getAllCart } from "./API/API";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const Products = () => {
  const { data } = useQuery("Products", getAllProducts);
  const mutation = useMutation(addToCart);
  const cartQuery = useQuery("Cart", getAllCart);
  const history = useHistory();

  const cartData = cartQuery.data;

  // console.log(cartData);
  // console.log(data);

  // disable btn after added to cart
  const disableBtn = (prodId) => {
    let btnStatus;
    cartData &&
      cartData.filter((item) =>
        item.product_id === prodId ? (btnStatus = "disabled") : null
      );
    return btnStatus;
  };

  // change btn text after added to cart
  const changeBtnText = (prodId, prodPrice) => {
    let btnText = `ADD TO CART — $${prodPrice}`;
    cartData &&
      cartData.filter((item) =>
        item.product_id === prodId
          ? (btnText = `ADDED TO CART — $${prodPrice}`)
          : null
      );
    return btnText;
  };

  return (
    <div className="container shopDesktop">
      <div className="shopHead">ALL SHOES</div>
      <div className="prodBox">
        {data &&
          data.map((product) => {
            return (
              <div key={product.id} className="prodItem">
                <Link to={`/shop/${product.id}`}>
                  <div className="prodImg">
                    {localStorage.setItem(
                      `prod-${product.id}-img`,
                      product.image1
                    )}
                    {localStorage.setItem(
                      `prod${product.id}btn_color1`,
                      product.btn_color1
                    )}
                    {localStorage.setItem(
                      `prod${product.id}btn_color1`,
                      product.btn_color1
                    )}
                    <img src={product.image1} alt={product.title} width="70%" />
                  </div>

                  <div
                    className="prodTitle"
                    style={{
                      fontFamily: "FiraSansExtraCondensed-Regular",
                      fontSize: "1.4em",
                    }}
                  >
                    {product.title.toUpperCase()}
                  </div>
                </Link>

                <Button
                  className="prodBtn"
                  style={{
                    backgroundColor: product.btn_color1,
                    borderRadius: "0 0 2.5em 2.5em",
                    fontFamily: "FiraSansExtraCondensed-Bold",
                    fontSize: "1em",
                  }}
                  onClick={
                    localStorage.getItem("token")
                      ? () => {
                          mutation.mutate({
                            product_id: product.id,
                            size: 8,
                            cart_image: product.image1,
                          });

                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        }
                      : () => history.push("/checkout/cart")
                  }
                  disabled={disableBtn(product.id)}
                >
                  {changeBtnText(product.id, product.price)}
                </Button>
              </div>
            );
          })}
      </div>

      <div className="scrollTextShop">
        <br /> SCROLL DOWN
      </div>
      <div className="iconsShop">
        <br />
        <a href="/" target="_blank" rel="noreferrer">
          <Instagram style={{ color: "#131212" }} />
        </a>
        <br />
        <br />
        <a href="/" target="_blank" rel="noreferrer">
          <Twitter style={{ color: "#131212" }} />
        </a>
        <br />
        <br />
        <a href="/" target="_blank" rel="noreferrer">
          <Facebook style={{ color: "#131212" }} />
        </a>
      </div>
    </div>
  );
};

export default Products;
