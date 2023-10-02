import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import "../App.css";
import { useGetAllProductQuery } from "../features/adminQuery/productsQuery";
import Navbars from "./Navbars";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { productsLength } from "../features/userQuery/productslengthSlice";
const ProductCard = (props) => {
  const filteredInfo = useSelector((state) => state.filteredInfo.filteredInfo);
  const dispatch = useDispatch();
  const { grid, filteredOptions } = props;
  const {
    data: products,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllProductQuery(filteredInfo, {
    refetchOnMountOrArgChange: true,
  });

  const debouncedRefetch = debounce(refetch, 10000);

  // useEffect(() => {
  //   console.log(filteredOptions);
  //   refetch();
  // }, [filteredOptions, refetch]);
  useEffect(() => {
    // debouncedRefetch();
    refetch();
  }, [refetch, filteredInfo]);
  console.log(products);
  dispatch(productsLength(products?.productLength));
  const handlePage = (action) => {
    if (action === "prev") {
      props.onChangeFilteredOptions("page", filteredInfo.page - 1);
    } else {
      props.onChangeFilteredOptions("page", filteredInfo.page + 1);
    }
  };

  let location = useLocation();

  return (
    <>
      {isLoading && (
        <i
          style={{ marginLeft: "400px" }}
          className="justify-content-center fas fa-stroopwafel fa-3x fa-spin"
        ></i>
      )}

      {products?.products?.map((product) => {
        const {
          product_name,
          product_image,
          product_id,
          product_description,
          price,
          discount,
          available_product,
          categorie_name,
        } = product;
        return (
          <div
            className={` ${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <Link
              style={{ textDecoration: "none" }}
              // to={`${
              //   location.pathname == "/"
              //     ? "/product/:id"
              //     : location.pathname == "/product/:id"
              //     ? "/product/:id"
              //     : ":id"
              // }`}
              className="product-card position-relative"
            >
              <div className=" wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                <img src={watch} className="img-fluid" alt="product image" />
                <img src={watch2} className="img-fluid" alt="product image" />
              </div>
              <div className="product-details">
                <Link
                  to="/product-details"
                  style={{ color: "red", textDecoration: "none" }}
                  className="brand"
                  state={{ product }}
                >
                  {product_name}
                </Link>
                <br />
                <Link
                  to="/product-details"
                  style={{ color: "red", textDecoration: "none" }}
                  className="brand"
                  state={{ product }}
                >
                  <h5 className="product-title">
                    Kids headphones bulk 10 pack multi colored for students
                  </h5>
                </Link>
                <h6 className="brand">Categorie : {categorie_name}</h6>
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                >
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt...
                </p>
                <p className="price">
                  {product.discount > 0 ? (
                    <>
                      <strike className="m-2">Tk.{product.price}</strike>
                      Tk.
                      {product.price -
                        Math.floor((product.price * product.discount) / 100)}
                    </>
                  ) : (
                    <> Tk.{product.price}</>
                  )}
                </p>
                <p className="price">
                  {product.available_product > 0 ? (
                    <>{product.available_product} Pieces available</>
                  ) : (
                    <>Out Of Stock</>
                  )}
                </p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>

                  {product.available_product === 0 ? (
                    <Link to="" style={{ pointerEvents: "none" }}>
                      <img src={addcart} alt="addcart" />
                    </Link>
                  ) : (
                    <Link to="/add-to-cart" state={{ product }}>
                      <img src={addcart} alt="addcart" />
                    </Link>
                  )}

                  {/* <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button> */}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
      <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      ></div>
      <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      ></div>
      <div
        className={` ${location.pathname == "/product" ? `gr-4` : "col-5"} `}
      ></div>
      {/* {Number(products?.productLength) > 0 ? (
        <div class="d-flex justify-content-center mb-5 mt-5">
          <div className="btn-group justify-content-center">
            {filteredOptions.page === 1 ? (
              <button
                className="btn btn-outline-dark"
                style={{ pointerEvents: "none" }}
              >
                Previous
              </button>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => handlePage("prev")}
              >
                Previous
              </button>
            )}

            {filteredOptions.page ===
            Math.ceil(Number(products?.productLength) / 10) ? (
              <button
                className="btn btn-outline-dark"
                style={{ pointerEvents: "none" }}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => handlePage("next")}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )} */}
      {Number(products?.productLength) > 10 ? (
        <div class="d-flex justify-content-center mb-5 mt-5">
          <div className="btn-group justify-content-center">
            {filteredInfo.page === 1 ? (
              <button
                className="btn btn-outline-dark"
                style={{ pointerEvents: "none" }}
              >
                Previous
              </button>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => handlePage("prev")}
              >
                Previous
              </button>
            )}

            {filteredInfo.page ===
            Math.ceil(Number(products?.productLength) / 10) ? (
              <button
                className="btn btn-outline-dark"
                style={{ pointerEvents: "none" }}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => handlePage("next")}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCard;
