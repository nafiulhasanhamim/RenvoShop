import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetTokenVerificationQuery } from "../features/userQuery/signinupQuery";
import { useGetAllCategoriesQuery } from "../features/adminQuery/categorieQuery";
import { changeCategory } from "../features/userQuery/filteredOptionsSlice";
const Navbars = () => {
  const userinfo = useSelector((state) => state.userinfo.userinfo);
  const filteredInfo = useSelector((state) => state.filteredInfo.filteredInfo);
  const cartinfo = useSelector((state) => state.cartinfo.cartinfo);
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  const categorieQuery = useGetAllCategoriesQuery();
  const { data, isLoading } = useGetTokenVerificationQuery(token);

  const handleCategorie = (e, categorie_name) => {
    console.log(categorie_name);
    dispatch(changeCategory(categorie_name));
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-2 col-sm-4">
              <h2>
                <Link className="text-white text-decoration-none">
                  Dev Corner
                </Link>
              </h2>
            </div>
            <div className="col-lg-5 col-md-3 col-sm-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-lg-5 col-md-7 col-sm-4 ">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/order-history"
                    className="text-decoration-none d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0 text-white">
                      Order <br /> History
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="text-decoration-none d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0 text-white">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  {data?.result === "please provide valid token" && (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white text-decoration-none"
                    >
                      <img src={user} alt="user" />
                      <p className="mb-0 text-white">
                        Log in <br /> My Account
                      </p>
                    </Link>
                  )}
                  {data?.result === "token is verified" && (
                    <Link
                      to="/logout"
                      className="d-flex align-items-center gap-10 text-white text-decoration-none"
                    >
                      <img src={user} alt="user" />
                      <p className="mb-0 text-white">
                        Log Out <br /> My Account
                      </p>
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart-items"
                    className="d-flex align-items-center gap-10 text-white text-decoration-none"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartinfo.length}
                      </span>
                      {/* <p className="mb-0">$ 500</p> */}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {categorieQuery?.data?.categories?.map((categorie) => {
                        return (
                          <li>
                            <Link
                              className="dropdown-item text-white"
                              to="/product"
                              style={{ textDecoration: "none" }}
                              onClick={(e) => {
                                handleCategorie(e, categorie.categorie_name);
                              }}
                            >
                              {categorie.categorie_name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15 text-decoration-none">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      Home
                    </NavLink>
                    <NavLink to="/product" style={{ textDecoration: "none" }}>
                      Our Store
                    </NavLink>
                    <NavLink to="/blogs" style={{ textDecoration: "none" }}>
                      Blogs
                    </NavLink>
                    <NavLink to="/contact" style={{ textDecoration: "none" }}>
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbars;
