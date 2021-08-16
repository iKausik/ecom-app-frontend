import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Completed = () => {
  return (
    <div className="container success-page">
      <h2>Congratulations! Your order is placed.</h2>
      <p>
        We appreciate your business! If you have any questions,
        <br />
        please email at &nbsp;
        <a href="mailto:kausik@kausikdas.com">kausik@kausikdas.com</a>.
      </p>

      <div>
        <Link to="/orders">
          <Button className="oneBtn">YOUR ORDER</Button>
        </Link>
        <Link to="/shop/all">
          <Button>SHOP MORE</Button>
        </Link>
      </div>
    </div>
  );
};

export default Completed;
