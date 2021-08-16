import React from "react";
import { useQuery } from "react-query";
import { Avatar } from "@material-ui/core";

import { profile } from "./API/API";
import LoginButton from "./forms/LoginButton";

const Profile = () => {
  const { data } = useQuery("Profile", profile);

  return (
    <div className="container cart-page">
      {localStorage.getItem("token") && (
        <div
          className="step-indicator"
          style={{ justifyContent: "flex-start" }}
        >
          <h2>MY PROFILE</h2>
        </div>
      )}
      <div className="cart-items">
        {data && localStorage.getItem("token") ? (
          <div
            className="cartItemDetail"
            style={{ width: "fit-content", padding: "3em" }}
          >
            {/* FIRST PART */}
            <div className="firstPart" style={{ fontSize: "1.2em" }}>
              <Avatar
                style={{
                  fontSize: "3em",
                  padding: "10px",
                  backgroundColor: "#A852F2",
                }}
              >
                {data.firstname.charAt(0).toUpperCase()}
              </Avatar>

              <p>
                <b>Username: {data.username}</b>
              </p>
              <p>Firstname: {data.firstname}</p>
              <p>Lastname: {data.lastname}</p>
              <p>Email: {data.email}</p>
              <p>Phone: {data.phone || "No Number"}</p>
            </div>
          </div>
        ) : (
          <div>
            <h2>Please Login to see profile.</h2>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
