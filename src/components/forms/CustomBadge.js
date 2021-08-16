import React from "react";
import { Badge, IconButton, makeStyles } from "@material-ui/core";
import { LocalMallOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  badgeColor: {
    backgroundColor: "#A8D50B",
    color: "#131212",
    fontWeight: "bold",
  },
}));

const CustomBadge = ({ LengthOfCart }) => {
  const classes = useStyles();

  return (
    <>
      <IconButton color="inherit">
        <Badge
          classes={{ badge: classes.badgeColor }}
          badgeContent={LengthOfCart}
        >
          <LocalMallOutlined />
        </Badge>
      </IconButton>
    </>
  );
};

export default CustomBadge;
