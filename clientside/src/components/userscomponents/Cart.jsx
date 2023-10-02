import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Cart.css";
import products from "../../images/p11.jpg";
import Footer from "../../pages/Footer";
import Button from "react-bootstrap/Button";
import { useGetTokenVerificationQuery } from "../../features/userQuery/signinupQuery";
import { useDispatch } from "react-redux";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { Link, useNavigate } from "react-router-dom";
import { cartInfo } from "../../features/userQuery/cartinfoSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  dispatch(getInfo());
  dispatch(cartInfo());
  const { data, isLoading } = useGetTokenVerificationQuery(token);

  const [cartProducts, setCartProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(true);

  let totalAmmount = 0;

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (data?.result === "please provide valid token") {
      navigate("/login");
    }
    const getCartProducts = JSON.parse(localStorage.getItem("cartproducts"));
    if (getCartProducts !== null) {
      setCartProducts(getCartProducts);
    }
    console.log(cartProducts);
  }, [data, click]);

  const toastNotification = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleIncrement = (product_id) => {
    const updatedCartProduct = cartProducts.map((obj) => {
      if (
        obj.product_id === product_id &&
        obj.quantity < obj.available_product
      ) {
        return { ...obj, quantity: obj.quantity + 1 };
      } else if (
        obj.product_id === product_id &&
        obj.quantity === obj.available_product
      ) {
        toastNotification(
          `${obj.available_product + 1} Products is not available`
        );
      }
      return { ...obj };
    });
    const updatedLocalStorage = JSON.stringify(updatedCartProduct);
    localStorage.setItem("cartproducts", updatedLocalStorage);
    //setCartProducts(updatedCartProduct);
    setClick(!click);
  };

  const handleDecrement = (product_id) => {
    const updatedCartProduct = cartProducts.map((obj) => {
      if (obj.product_id === product_id) {
        if (obj.quantity > 0) {
          return { ...obj, quantity: obj.quantity - 1 };
        }
      }
      return { ...obj };
    });
    const updatedLocalStorage = JSON.stringify(updatedCartProduct);
    localStorage.setItem("cartproducts", updatedLocalStorage);
    //setCartProducts(updatedCartProduct);
    setClick(!click);
  };

  const handleRemove = (product_id) => {
    console.log(product_id);
    const filteredProducts = cartProducts.filter(
      (cartProduct) => cartProduct.product_id !== product_id
    );
    console.log(filteredProducts);
    const updatedLocalStorage = JSON.stringify(filteredProducts);
    localStorage.setItem("cartproducts", updatedLocalStorage);
    //setCartProducts(filteredProducts);
    toast.success("Product is removed successfully from the cart", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setClick(!click);
  };

  return (
    <>
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-11 mx-auto">
              <div className="row mt-5 gx-3">
                <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
                  {cartProducts?.map((cartProduct) => {
                    const {
                      product_name,
                      quantity,
                      price,
                      discount,
                      product_id,
                    } = cartProduct;
                    return (
                      <>
                        <div className="card p-4">
                          <div className="row">
                            <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                              <img
                                src={products}
                                className="img-fluid"
                                alt="cart img"
                              />
                            </div>
                            <div className="col-md-7 col-11 mx-auto px-4 mt-2">
                              <div className="row">
                                <div className="col-6 card-title">
                                  <h1 className="mb-4 product_name">
                                    {product_name}
                                  </h1>
                                  <p className="mb-2">SHIRT - BLUE</p>
                                  <p className="mb-2">COLOR: BLUE</p>
                                  <p className="mb-3">SIZE: M</p>
                                </div>

                                <div className="col-6">
                                  <ul className="pagination justify-content-end set_quantity">
                                    <li className="page-item m-auto">
                                      <Button
                                        variant="light"
                                        onClick={() =>
                                          handleDecrement(product_id)
                                        }
                                      >
                                        <i className="fas fa-minus-circle"></i>
                                      </Button>
                                    </li>
                                    <li className="page-item m-auto ">
                                      <input
                                        type="text"
                                        name=""
                                        className="page-link m-auto"
                                        value={quantity}
                                        id="textbox1"
                                      />
                                    </li>
                                    <li className="page-item plus">
                                      <Button
                                        variant="light"
                                        onClick={() =>
                                          handleIncrement(product_id)
                                        }
                                      >
                                        <i className="fas fa-plus-circle"></i>
                                      </Button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-8 d-flex justify-content-between remove_wish">
                                  <p>
                                    <i
                                      onClick={() => handleRemove(product_id)}
                                      className="fas fa-trash-alt"
                                    ></i>{" "}
                                    REMOVE ITEM
                                  </p>
                                  <p>
                                    <i className="fas fa-heart"></i>MOVE TO WISH
                                    LIST
                                  </p>
                                </div>
                                <div className="col-4 d-flex justify-content-end price_money">
                                  <h3>
                                    Tk.
                                    <span id="itemval">
                                      {discount > 0
                                        ? price -
                                          Math.floor((price * discount) / 100)
                                        : price}
                                    </span>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </div>
                {cartProducts?.map((cartProduct) => {
                  const { discount, price, quantity } = cartProduct;
                  if (discount > 0) {
                    totalAmmount =
                      totalAmmount +
                      quantity * (price - Math.floor((price * discount) / 100));
                  } else {
                    totalAmmount = totalAmmount + quantity * price;
                  }
                })}
                <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                  <div className="right_side p-3 shadow bg-white">
                    <h2 className="product_name mb-5">The Total Amount Of</h2>
                    <div className="price_indiv d-flex justify-content-between">
                      <p>Product amount</p>
                      <p>
                        Tk. <span id="product_total_amt">{totalAmmount}</span>
                      </p>
                    </div>
                    <div className="price_indiv d-flex justify-content-between">
                      <p>Shipping Charge</p>
                      <p>
                        TK.
                        <span id="shipping_charge">
                          {Math.floor(totalAmmount * 0.05)}
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="total-amt d-flex justify-content-between font-weight-bold">
                      <p>The total amount of (including VAT)</p>
                      <p>
                        TK.
                        <span id="total_cart_amt">
                          {totalAmmount + Math.floor(totalAmmount * 0.05)}
                        </span>
                      </p>
                    </div>
                    {/* <button className="btn btn-primary text-uppercase">
                      Checkout
                    </button> */}
                    <Link
                      className="btn btn-primary text-uppercase"
                      to="/order-confirmation-form"
                    >
                      Checkout
                    </Link>
                  </div>

                  {/* <div className="discount_code mt-3 shadow">
                    <div className="card">
                      <div className="card-body">
                        <div
                          className="d-flex justify-content-between"
                          onClick={toggleCollapse}
                        >
                          Add a discount code (optional)
                          <span>
                            <i className="fas fa-chevron-down pt-1"></i>
                          </span>
                        </div>
                        <div className={`collapse ${isOpen ? "show" : ""}`}>
                          <div className="mt-3">
                            <input
                              type="text"
                              name=""
                              id="discount_code1"
                              className="form-control font-weight-bold"
                              placeholder="Enter the discount code"
                            />
                            <small id="error_trw" className="text-dark mt-3">
                              code is thapa
                            </small>
                          </div>
                          <button className="btn btn-primary btn-sm mt-3">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="mt-3 shadow p-3 bg-white">
                    <div className="pt-4">
                      <h5 className="mb-4">Expected delivery date</h5>
                      <p>July 27th 2020 - July 29th 2020</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
