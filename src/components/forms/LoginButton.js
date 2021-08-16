import React, { useState } from "react";
import { Button, Modal, makeStyles, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import LoginForm from "./LoginForm";

// Modal style
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

const LoginButton = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

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
      <LoginForm />
    </div>
  );

  return (
    <div>
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
        LOGIN
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default LoginButton;
