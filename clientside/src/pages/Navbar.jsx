import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useGetTokenVerificationQuery } from "../features/userQuery/signinupQuery";
const Navbars = () => {
  const userinfo = useSelector((state) => state.userinfo.userinfo);
  const cartinfo = useSelector((state) => state.cartinfo.cartinfo);
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  const { data, isLoading } = useGetTokenVerificationQuery(token);

  const [cartLength, setCartLength] = useState(0);
  // useEffect(() => {
  //   const cartproducts = JSON.parse(localStorage.getItem("cartproducts"));
  //   if (cartproducts !== null) {
  //     setCartLength(cartproducts.length);
  //   }
  // });
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container py-2">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            Renvo Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              {/* {!userinfo?.name && (
                <Link
                  to="/login"
                  style={{ textDecoration: "none" }}
                  className="btn btn-outline-dark"
                >
                  <i className="fa fa-sign-in me-1"></i>Login
                </Link>
              )} */}

              {data?.result === "please provide valid token" && (
                <Link
                  to="/login"
                  style={{ textDecoration: "none" }}
                  className="btn btn-outline-dark"
                >
                  <i className="fa fa-sign-in me-1"></i>Login
                </Link>
              )}

              {data?.result === "token is verified" && (
                <Link
                  to="/logout"
                  style={{ textDecoration: "none" }}
                  className="btn btn-outline-dark"
                >
                  <i className="fa fa-sign-in me-1"></i>Logout
                </Link>
              )}

              {/* {userinfo?.name && (
                <Link
                  to="/logout"
                  style={{ textDecoration: "none" }}
                  className="btn btn-outline-dark"
                >
                  <i className="fa fa-sign-in me-1"></i>Logout
                </Link>
              )} */}
              <Link
                to="/cart-items"
                style={{ textDecoration: "none" }}
                className="btn btn-outline-dark ms-2"
              >
                <i className="fa fa-shopping-cart me-1"></i> Cart (
                {cartinfo.length})
              </Link>
            </div>
            {/* <NavLink className="navbar-brand mx-auto fw-bold" to="/">APPLE MART</NavLink> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbars;
