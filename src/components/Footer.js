import React from "react";
import { NavLink } from "react-router-dom";
import { Instagram, Twitter, LinkedIn } from "@material-ui/icons";

const Footer = () => {
  return (
    <div className="bottomNav">
      <div className="bottomNavLinks">
        <NavLink to="#">ABOUT</NavLink>
        <NavLink to="#">FAQ</NavLink>
        <NavLink to="#">CONTACT</NavLink>
        <NavLink to="#">PRIVACY POLICY</NavLink>
        <NavLink to="#">TERMS & CONDITIONS</NavLink>
      </div>
      <p class="bottomNavText">
        <a
          href="https://instagram.com/ikausik"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://twitter.com/kausik47" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://linkedin.com/in/ikausik"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
        <br />
        <br /> © {new Date().getFullYear()} Built by{" "}
        <a href="https://kausikdas.com" target="_blank" rel="noreferrer">
          &nbsp;<span id="me">KAUSIK DAS</span>
        </a>
      </p>
    </div>
  );
};

export default Footer;
