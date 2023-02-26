import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAlt />, name: "orders", func: orders },
    { icon: <Person />, name: "profile", func: account },
    { icon: <ShoppingCart />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToApp />, name: "logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("logout successfully");
    navigate("/");
  }

  function cart() {
    navigate("/cart");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt={user.name}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
