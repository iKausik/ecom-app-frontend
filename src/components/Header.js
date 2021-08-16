import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useQuery } from "react-query";

import { getAllCart } from "./API/API";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

import {
  AppBar,
  IconButton,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
} from "@material-ui/core";
import { AccountCircleOutlined, Close } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

import Nike from "../assets/Nike.svg";
import CustomBadge from "./forms/CustomBadge";

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

const Header = () => {
  const { data } = useQuery("Cart", getAllCart);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const history = useHistory();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [signupFormOpen, setSignupFormOpen] = useState(false);

  const handleLoginFormOpen = () => {
    setLoginFormOpen(true);
  };
  const handleLoginFormClose = () => {
    setLoginFormOpen(false);
  };
  const handleSignupFormOpen = () => {
    setSignupFormOpen(true);
  };
  const handleSignupFormClose = () => {
    setSignupFormOpen(false);
  };

  const loginFormbody = (
    <div style={modalStyle} className={classes.paper}>
      <div className="formCloseButton">
        <IconButton onClick={handleLoginFormClose}>
          <Close />
        </IconButton>
      </div>
      <LoginForm />
    </div>
  );
  const signupFormbody = (
    <div style={modalStyle} className={classes.paper}>
      <div className="formCloseButton">
        <IconButton onClick={handleSignupFormClose}>
          <Close />
        </IconButton>
      </div>
      <SignupForm />
    </div>
  );

  // cart counts
  const showCartLength = () => {
    return data && Object.keys(data).length;
  };
  const cartLength = showCartLength();

  // log out
  const logMeOut = () => {
    localStorage.removeItem("token");

    history.push("/");
    window.location.reload();
  };

  // profile dropdown menu - start
  //
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  // profile dropdown menu - end
  //

  //
  // Side Drawer on mobile
  const toggleDrawer = (anchor, openDrawer) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: openDrawer });
  };

  //
  //
  const men = <NavLink to="/shop/men">MEN</NavLink>;
  const women = <NavLink to="/shop/women">WOMEN</NavLink>;
  const shop = <NavLink to="/shop/all">SHOP</NavLink>;
  const account = <NavLink to="/profile">My Account</NavLink>;
  const orders = <NavLink to="/orders">My Orders</NavLink>;
  const login = (
    <>
      <Link onClick={handleLoginFormOpen}>LOGIN</Link>
      <Modal open={loginFormOpen} onClose={handleLoginFormClose}>
        {loginFormbody}
      </Modal>
    </>
  );
  const signup = (
    <>
      <Link onClick={handleSignupFormOpen}>SIGN UP</Link>
      <Modal open={signupFormOpen} onClose={handleSignupFormClose}>
        {signupFormbody}
      </Modal>
    </>
  );
  const signout = <Link onClick={logMeOut}>Sign out</Link>;
  //
  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[men, women, shop].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          account,
          orders,
          localStorage.getItem("token") ? signout : login,
          !localStorage.getItem("token") && signup,
        ].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="fixed" color="white" className="appBar">
        <div className="hideInMobile">
          <div className="topbar">
            <div>
              {localStorage.getItem("token") ? (
                <Link onClick={logMeOut}>SIGN OUT</Link>
              ) : (
                <>
                  <Link onClick={handleLoginFormOpen}>LOGIN</Link>
                  <Modal open={loginFormOpen} onClose={handleLoginFormClose}>
                    {loginFormbody}
                  </Modal>
                  &nbsp;&nbsp;
                  <b>|</b>
                  &nbsp;&nbsp;
                  <Link onClick={handleSignupFormOpen}>SIGN UP</Link>
                  <Modal open={signupFormOpen} onClose={handleSignupFormClose}>
                    {signupFormbody}
                  </Modal>
                </>
              )}
            </div>
          </div>

          <div className="header">
            <div>
              <div>
                <Link to="/">
                  <img src={Nike} alt="NIKE" width="50" height="50" />
                </Link>
              </div>

              <div>
                <NavLink to="/shop/men">MEN</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/shop/women">WOMEN</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/shop/all">SHOP</NavLink>
              </div>

              <div>
                <IconButton
                  color="inherit"
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <AccountCircleOutlined />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper className="profile-dropdown">
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <NavLink to="/profile">
                              <MenuItem onClick={handleClose}>
                                My Account
                              </MenuItem>
                            </NavLink>
                            <NavLink to="/orders">
                              <MenuItem onClick={handleClose}>
                                My Orders
                              </MenuItem>
                            </NavLink>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <NavLink to="/checkout/cart">
                  <CustomBadge LengthOfCart={cartLength} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* For Mobile */}
        <div className="header hideInLarge">
          <div>
            <IconButton color="inherit" onClick={toggleDrawer("left", true)}>
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
            >
              {list("left")}
            </SwipeableDrawer>
          </div>

          <div>
            <Link to="/">
              <img src={Nike} alt="NIKE" width="50" height="50" />
            </Link>
          </div>

          <div>
            <NavLink to="/checkout/cart">
              <CustomBadge LengthOfCart={cartLength} />
            </NavLink>
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
