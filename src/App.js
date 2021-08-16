import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// import SignupForm from "./components/forms/SignupForm";
// import LoginForm from "./components/forms/LoginForm";
import Profile from "./components/Profile";

import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Men from "./components/Men";
import Women from "./components/Women";

import Cart from "./components/Cart";
import Address from "./components/Address";
import Order from "./components/Order";
import Success from "./components/Success";
import Canceled from "./components/Canceled";
import Payment from "./components/Payment";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Fira Sans Extra Condensed
import "./fonts/Fira-Sans-Extra-Condensed/FiraSansExtraCondensed-SemiBold.ttf";
import "./fonts/Fira-Sans-Extra-Condensed/FiraSansExtraCondensed-Medium.ttf";
import "./fonts/Fira-Sans-Extra-Condensed/FiraSansExtraCondensed-Regular.ttf";
import "./fonts/Fira-Sans-Extra-Condensed/FiraSansExtraCondensed-Light.ttf";
import "./fonts/Fira-Sans-Extra-Condensed/FiraSansExtraCondensed-Bold.ttf";
// Roboto
import "./fonts/Roboto/Roboto-Medium.ttf";
import "./fonts/Roboto/Roboto-Bold.ttf";
import "./fonts/Roboto/Roboto-Regular.ttf";

import "./App.css";

// create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Switch>
          {/* <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route> */}
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop/men">
            <Men />
          </Route>
          <Route exact path="/shop/women">
            <Women />
          </Route>
          <Route exact path="/shop/all">
            <Products />
          </Route>
          <Route exact path="/shop">
            <Redirect to="/shop/all" />
          </Route>
          <Route path="/shop/:productId">
            <ProductDetail />
          </Route>
          <Route exact path="/checkout/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Redirect to="/checkout/cart" />
          </Route>
          <Route exact path="/checkout/address">
            <Address />
          </Route>
          <Route exact path="/checkout/payment">
            <Payment />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/canceled">
            <Canceled />
          </Route>
          <Route exact path="/orders">
            <Order />
          </Route>
        </Switch>
        <Footer />
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
