import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Canceled = () => {
  return (
    <div className="container success-page">
      <h2>Oops! Your payment has been cancelled.</h2>
      <p>
        Try again later, if problem persists <br /> contact us at &nbsp;
        <a href="mailto:kausik@kausikdas.com">kausik@kausikdas.com</a>.
      </p>
      <Link to="/checkout/cart">
        <Button>YOUR BAG</Button>
      </Link>
    </div>
  );
};

export default Canceled;
