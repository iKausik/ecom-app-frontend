import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Button } from "@material-ui/core";

import {
  singleProduct,
  addToCart,
  getAllCart,
  getAllProducts,
} from "./API/API";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const sizes = [
  { id: 1, title: "8" },
  { id: 2, title: "8.5" },
  { id: 3, title: "9" },
  { id: 4, title: "9.5" },
  { id: 5, title: "10" },
  { id: 6, title: "10.5" },
  { id: 7, title: "11" },
  { id: 8, title: "11.5" },
  { id: 9, title: "12" },
  { id: 10, title: "12.5" },
];
localStorage.setItem("sizeValue", sizes[0].title);

const colorData = (color1, color2, color3, color4) => {
  const colors = [
    { id: 1, title: color1 },
    { id: 2, title: color2 },
    { id: 3, title: color3 },
    { id: 4, title: color4 },
  ];
  return colors;
};

// Persistent color data
const defaultColor = (prodId) => {
  const localColor = String(localStorage.getItem(`prod${prodId}btn_color1`));
  return localColor;
};

const defaultImage = (prodId) => {
  const localImg = String(localStorage.getItem(`prod-${prodId}-img`));
  return localImg;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [selected, setSelected] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedImage, setSelectedImage] = useState(defaultImage(productId));
  const [selectedBtnColor, setSelectedBtnColor] = useState(
    defaultColor(productId)
  );

  const { data } = useQuery(["Product", productId], () =>
    singleProduct(productId)
  );
  const mutation = useMutation(addToCart);
  const cartQuery = useQuery("Cart", getAllCart);
  const allProducts = useQuery("Products", getAllProducts);
  const history = useHistory();

  const cartData = cartQuery.data;
  const products = allProducts.data;

  // select size border
  const handleBorderColor = (row) => {
    setSelected(row.id);
  };
  // shoe size selection from local storage
  const handleSize = (shoeSize) => {
    localStorage.removeItem("sizeValue");
    localStorage.setItem("sizeValue", shoeSize);
  };

  // select color border
  const handleColorBorder = (row) => {
    setSelectedColor(row.id);
  };
  // color storage in local storage
  const storeDefaultColor = (row) => {
    if (row.id === 1) {
      localStorage.setItem(`prod${productId}btn_color1`, row.title);
    }
  };

  // select image
  const handleImage = (row, img1, img2, img3, img4) => {
    if (row.id === 1) {
      setSelectedImage(img1);
    } else if (row.id === 2) {
      setSelectedImage(img2);
    } else if (row.id === 3) {
      setSelectedImage(img3);
    } else if (row.id === 4) {
      setSelectedImage(img4);
    }
  };

  // select btn color
  const handleBtnColor = (row) => {
    if (row.id === 1) {
      setSelectedBtnColor(row.title);
    } else if (row.id === 2) {
      setSelectedBtnColor(row.title);
    } else if (row.id === 3) {
      setSelectedBtnColor(row.title);
    } else if (row.id === 4) {
      setSelectedBtnColor(row.title);
    }
  };

  // add selected image to local storage for add to cart
  const selectedImgForCart = (row, img1, img2, img3, img4) => {
    if (row.id === 1) {
      localStorage.removeItem(`prod-${productId}-add2CartImg`);
      localStorage.setItem(`prod-${productId}-add2CartImg`, img1);
    } else if (row.id === 2) {
      localStorage.removeItem(`prod-${productId}-add2CartImg`);
      localStorage.setItem(`prod-${productId}-add2CartImg`, img2);
    } else if (row.id === 3) {
      localStorage.removeItem(`prod-${productId}-add2CartImg`);
      localStorage.setItem(`prod-${productId}-add2CartImg`, img3);
    } else if (row.id === 4) {
      localStorage.removeItem(`prod-${productId}-add2CartImg`);
      localStorage.setItem(`prod-${productId}-add2CartImg`, img4);
    }
  };

  // add to cart
  const handleAddToCart = () => {
    mutation.mutate({
      product_id: productId,
      size: localStorage.getItem("sizeValue"),
      cart_image:
        localStorage.getItem(`prod-${productId}-add2CartImg`) ||
        setSelectedImage(defaultImage(productId)),
    });
    window.location.reload();
  };

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

  // reset to default values on every page render
  useEffect(() => {
    const setDefaultStates = async () => {
      // size
      await setSelected(1);
      await localStorage.removeItem("sizeValue");
      await localStorage.setItem("sizeValue", sizes[0].title);
      // color
      await setSelectedColor(1);
      // image
      await setSelectedImage(defaultImage(productId));
      // button color
      await setSelectedBtnColor();
    };
    setDefaultStates();
  }, [productId]);

  //
  return (
    <>
      {data && (
        <div className="container singleProd">
          <div className="scrollTextSingleProd">
            <br /> SCROLL DOWN
          </div>

          {/* PRODUCT SPECS */}
          <div className="firstContainer hideInMobile">
            {/* LEFT DIV */}
            <div className="leftDiv">
              <small className="catText">
                {data.category.toUpperCase()}'S SHOE
              </small>
              <h1 className="prodTitleText">{data.title.toUpperCase()}</h1>
              <div className="prodDescText">{data.description}</div>
            </div>

            {/* MIDDLE DIV SEPARATOR */}
            <div className="sepDiv"></div>

            {/* RIGHT DIV */}
            <div className="rightDiv">
              <small className="prodSizeText">SELECT SIZE (US)</small>

              <div className="prodSizes">
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    onClick={() => {
                      handleSize(size.title);
                      handleBorderColor(size);
                    }}
                    style={{
                      border: size.id === selected ? "2px solid #131212" : "",
                    }}
                  >
                    {size.title}
                  </div>
                ))}
              </div>

              <small className="prodColorText">SELECT COLOR</small>

              <div className="prodColors">
                {colorData(
                  data.btn_color1,
                  data.btn_color2,
                  data.btn_color3,
                  data.btn_color4
                ).map((thisColor) => (
                  <div
                    key={thisColor.id}
                    onClick={() => {
                      storeDefaultColor(thisColor);
                      handleColorBorder(thisColor);
                      handleImage(
                        thisColor,
                        data.image1,
                        data.image2,
                        data.image3,
                        data.image4
                      );
                      handleBtnColor(thisColor);
                      selectedImgForCart(
                        thisColor,
                        data.image1,
                        data.image2,
                        data.image3,
                        data.image4
                      );
                    }}
                    style={{
                      backgroundColor: thisColor.title,
                      border:
                        thisColor.id === selectedColor
                          ? "2px solid #131212"
                          : "",
                    }}
                  ></div>
                ))}
              </div>

              <div className="singleCartBtn">
                <Button
                  onClick={
                    localStorage.getItem("token")
                      ? handleAddToCart
                      : () => history.push("/checkout/cart")
                  }
                  disabled={disableBtn(data.id)}
                  style={{
                    backgroundColor: selectedBtnColor || data.btn_color1,
                    padding: "1em 1.8em",
                    borderRadius: "50px",
                    fontFamily: "FiraSansExtraCondensed-Bold",
                  }}
                >
                  {changeBtnText(data.id, data.price)}
                </Button>
              </div>
            </div>
          </div>

          {/* MOBILE VERSION START */}
          {/* MOBILE VERSION START */}
          {/* MOBILE VERSION START */}
          {/* PRODUCT SPECS */}
          <div className="firstContainerMobile hideInLarge">
            {/* LEFT DIV */}
            <div className="leftDiv">
              <small className="catText">
                {data.category.toUpperCase()}'S SHOE
              </small>
              <h1 className="prodTitleText">{data.title.toUpperCase()}</h1>
              <div className="prodDescText">{data.description}</div>
            </div>

            {/* MIDDLE DIV SEPARATOR */}
            <div className="sepDiv"></div>

            {/* CENTER DIV IMAGE */}
            {/* Image */}
            <div className="imageMobile">
              <img src={selectedImage || data.image1} alt={data.title} />
            </div>

            {/* MIDDLE DIV SEPARATOR */}
            <div className="sepDiv"></div>

            {/* RIGHT DIV */}
            <div className="rightDiv">
              <small className="prodSizeText">SELECT SIZE (US)</small>

              <div className="prodSizes">
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    onClick={() => {
                      handleSize(size.title);
                      handleBorderColor(size);
                    }}
                    style={{
                      border: size.id === selected ? "2px solid #131212" : "",
                    }}
                  >
                    {size.title}
                  </div>
                ))}
              </div>

              <small className="prodColorText">SELECT COLOR</small>

              <div className="prodColors">
                {colorData(
                  data.btn_color1,
                  data.btn_color2,
                  data.btn_color3,
                  data.btn_color4
                ).map((thisColor) => (
                  <div
                    key={thisColor.id}
                    onClick={() => {
                      storeDefaultColor(thisColor);
                      handleColorBorder(thisColor);
                      handleImage(
                        thisColor,
                        data.image1,
                        data.image2,
                        data.image3,
                        data.image4
                      );
                      handleBtnColor(thisColor);
                      selectedImgForCart(
                        thisColor,
                        data.image1,
                        data.image2,
                        data.image3,
                        data.image4
                      );
                    }}
                    style={{
                      backgroundColor: thisColor.title,
                      border:
                        thisColor.id === selectedColor
                          ? "2px solid #131212"
                          : "",
                    }}
                  ></div>
                ))}
              </div>

              <div className="singleCartBtn">
                <Button
                  onClick={
                    localStorage.getItem("token")
                      ? handleAddToCart
                      : () => history.push("/checkout/cart")
                  }
                  disabled={disableBtn(data.id)}
                  style={{
                    backgroundColor: selectedBtnColor || data.btn_color1,
                    padding: "1em 1.8em",
                    borderRadius: "50px",
                    fontFamily: "FiraSansExtraCondensed-Bold",
                  }}
                >
                  {changeBtnText(data.id, data.price)}
                </Button>
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
          {/* MOBILE VERSION END */}
          {/* MOBILE VERSION END */}
          {/* MOBILE VERSION END */}

          {/* Image */}
          <div className="secondContainer hideInMobile">
            <img src={selectedImage || data.image1} alt={data.title} />
          </div>

          {/* PRODUCT RECOMMENDATIONS */}
          <div className="thirdContainer">
            <div className="recomText">YOU MIGHT ALSO LIKE</div>

            <div className="recomProd prodBox">
              {products &&
                products.map((product) => {
                  return (
                    product.category === data.category &&
                    product.id !== data.id && (
                      <div key={product.id} className="prodItem">
                        <Link to={`/shop/${product.id}/`}>
                          <div className="prodImg">
                            <img
                              src={product.image1}
                              alt={product.title}
                              width="70%"
                            />
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
                    )
                  );
                })}
            </div>
          </div>

          {/* social share icons */}
          <div className="iconsSingleProd">
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
      )}
    </>
  );
};

export default ProductDetail;
