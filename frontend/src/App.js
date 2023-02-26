import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Products from "./component/Product/Products";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import webFont, { load } from "webfontloader";
import React, { useEffect, useState } from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user, loaing } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/stripeapikey",
      config
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />

        <Route path="success" element={<OrderSuccess/>} />

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="//admin/orders" element={<OrderList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />

        <Route path="/process/payment" element={<Payment />}></Route>
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
