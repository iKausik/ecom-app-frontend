import React from "react";
import { NavLink } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "@material-ui/icons";

import hero from "../assets/hero.svg";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import img4 from "../assets/img4.svg";

const Home = () => {
  return (
    <>
      <div className="container homeDesktop hideInMobile">
        <div className="heroImg1">
          <NavLink to="/shop/all">
            <img src={hero} alt="hero" width="100%" />
          </NavLink>
        </div>

        <div className="verticalText1">
          <br />
          SCROLL DOWN &nbsp;&nbsp;&nbsp;&nbsp;
          <br />
        </div>

        <div className="featuredText">
          <h3>FEATURED</h3>
        </div>

        <div className="verticalIcon1">
          <p class="bottomNavText">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/" target="_blank" rel="noreferrer">
              <Instagram style={{ color: "#131212" }} />
            </a>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/" target="_blank" rel="noreferrer">
              <Twitter style={{ color: "#131212" }} />
            </a>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/" target="_blank" rel="noreferrer">
              <Facebook style={{ color: "#131212" }} />
            </a>
            <br />
          </p>
        </div>

        <div className="img1">
          <NavLink to="/shop/2">
            <img src={img1} alt="image1" width="100%" />
          </NavLink>
        </div>

        <div className="img2">
          <NavLink to="/shop/2">
            <img src={img2} alt="image2" width="100%" />
          </NavLink>
        </div>

        <div className="img3">
          <NavLink to="/shop/2">
            <img src={img3} alt="image3" width="100%" />
          </NavLink>
        </div>

        <div className="img4">
          <NavLink to="/shop/2">
            <img src={img4} alt="image4" width="100%" />
          </NavLink>
        </div>
      </div>

      {/* For Mobile */}
      <div className="container homeMobile hideInLarge">
        <div className="heroImg1">
          <NavLink to="/shop/all">
            <img src={hero} alt="hero" width="100%" />
          </NavLink>
        </div>

        <div className="featuredText">
          <h3>FEATURED</h3>
        </div>

        <div className="img img1">
          <NavLink to="/shop/2">
            <img src={img1} alt="image1" width="100%" />
          </NavLink>
        </div>

        <div className="img img2">
          <NavLink to="/shop/2">
            <img src={img2} alt="image2" width="100%" />
          </NavLink>
        </div>

        <div className="img img3">
          <NavLink to="/shop/2">
            <img src={img3} alt="image3" width="100%" />
          </NavLink>
        </div>

        <div className="img img4">
          <NavLink to="/shop/2">
            <img src={img4} alt="image4" width="100%" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
