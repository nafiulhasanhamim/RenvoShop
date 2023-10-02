import React from "react";
import { BsSearch } from "react-icons/bs";
import "./Header.css";
import "../App.css";
import user from "../images/user.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../features/adminQuery/categorieQuery";
import { useGetTokenVerificationQuery } from "../features/userQuery/signinupQuery";
import {
  changeCategory,
  changeSearchBarValue,
} from "../features/userQuery/filteredOptionsSlice";
const Header = () => {
  const navigate = useNavigate();
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

  const handleSearchBarValue = (e) => {
    dispatch(changeSearchBarValue(e.target.value));
    navigate("/product");
  };

  const userName = () => {
    const words = userinfo.name.split(" ");
    const selectedWords = words.slice(0, 2);
    return selectedWords.join(" ");
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
                Hotline :
                <a className="text-white" href="tel:+91 8264954234">
                  01944700614
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="main-navbar shadow-sm sticky-top">
        <div className="top-navbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                <Link to="/" className="text-decoration-none">
                  <h5 className="brand-name">Renvo Shop</h5>{" "}
                </Link>
              </div>
              <div className="col-md-5 my-auto mb-2 mt-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control py-2"
                    onChange={handleSearchBarValue}
                    placeholder="Search Product Here..."
                    aria-label="Search Product Here..."
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text p-3" id="basic-addon2">
                    <BsSearch className="fs-6" />
                  </span>
                </div>
              </div>
              <div className="col-md-5 my-auto">
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-decoration-none"
                      to="/cart-items"
                    >
                      <i className="fa fa-shopping-cart"></i> Cart (
                      {cartinfo.length})
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-decoration-none" href="#">
                      <i className="fa fa-heart"></i> Wishlist (0)
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    {data?.result === "please provide valid token" && (
                      <Link
                        to="/login"
                        className="d-flex align-items-center gap-10 text-white text-decoration-none"
                      >
                        <img src={user} style={{ width: "30px" }} alt="user" />
                        <p className="mb-0 mt-2 text-white">Log in</p>
                      </Link>
                    )}
                    {data?.result === "token is verified" && (
                      <Link
                        className="nav-link text-decoration-none dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-user"></i> {userName()}
                      </Link>
                    )}

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none"
                          href="#"
                        >
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none"
                          to="/order-history"
                        >
                          <i className="fa fa-list"></i> My Orders
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" href="#">
                          <i className="fa fa-heart"></i> My Wishlist
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link className="dropdown-item" to="/cart-items">
                          <i className="fa fa-shopping-cart"></i> My Cart
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none"
                          to="/logout"
                        >
                          <i className="fa fa-sign-out"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link
              className="navbar-brand d-block d-sm-block d-md-none d-lg-none"
              to="/"
            >
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link text-decoration-none dropdown-toggle text-decoration-none"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i> SHOP CATEGORIES
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {categorieQuery?.data?.categories?.map((categorie) => {
                      return (
                        <li>
                          <Link
                            className="dropdown-item"
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
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-decoration-none" to="/">
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-decoration-none" to="/product">
                    OUR STORE
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-decoration-none" to="/blogs">
                    BLOGS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-decoration-none" to="/contact">
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
