import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import style from "./admin.module.css";
import { debounce } from "lodash";
import {
  useChangeOrderStatusMutation,
  useGetAllOrdersQuery,
} from "../../features/adminQuery/productsQuery";

const Orderhandling = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [params, setParams] = useState({
    status: "All",
  });
  const { data, refetch } = useGetAllOrdersQuery(params, {
    refetchOnMountOrArgChange: true,
  });
  const debouncedRefetch = debounce(refetch, 10000);
  const [changeOrderStatus, output] = useChangeOrderStatusMutation();
  const [orderedItems, setOrderedItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState(0);

  useEffect(() => {
    refetch();
    // Group the rows by order_id
    const groupedData = {};
    data?.orders?.forEach((row) => {
      const {
        order_id,
        user_id,
        order_date,
        product_id,
        product_image,
        product_name,
        status,
        payment_method,
        transaction_id,
        payment_number,
        quantity,
        price,
      } = row;
      if (!groupedData[order_id]) {
        groupedData[order_id] = {
          order_id,
          status,
          user_id,
          order_date,
          payment_method,
          transaction_id,
          payment_number,
          products: [
            { product_id, product_image, product_name, quantity, price },
          ],
        };
      } else {
        groupedData[order_id].products.push({
          product_id,
          product_image,
          product_name,
          quantity,
          price,
        });
      }
    });

    // Convert the groupedData object into an array of rows
    const orders = Object.values(groupedData);
    const update = orders.slice((pageNumber - 1) * 6, (pageNumber - 1) * 6 + 6);
    setProductLength((prev) => orders.length);
    setRows((prev) => update);
  }, [data, refetch, flag, pageNumber]);

  const handleChange = async (e, order_id) => {
    const body = {
      order_id,
      status: e.target.value,
    };

    await changeOrderStatus(body);
    setFlag(!flag);
  };

  const handlePage = (action) => {
    if (action === "prev") {
      setPageNumber((prev) => prev - 1);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleFilteringStatus = (status) => {
    setParams((prev) => ({
      status,
    }));
    setPageNumber(1);
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.logosec}>
          <div className={style.logo}>Admin Panel</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className={style.icn + " " + style.menuicn}
            id={style.menuicn}
            alt="menu-icon"
            onClick={handleToggle}
          />
        </div>

        <div className={style.searchbar}>
          <input type="text" placeholder="Search by Name or Email" />
          <div className={style.searchbtn}>
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className={style.icn + " " + style.srchicn}
              alt="search-icon"
            />
          </div>
        </div>
      </header>

      <div className={style.main_container}>
        <div
          className={`${style.navcontainer} ${isNavOpen ? style.navclose : ""}`}
        >
          <nav className={style.nav}>
            <div className={style.nav_upper_options}>
              <div className={style.nav_option + " " + style.option1}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className={style.nav_img}
                  alt="dashboard"
                />
                <h3>
                  {" "}
                  <Link to="/admin/home">Dashboard </Link>
                </h3>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-products"
                    style={{ textDecoration: "none" }}
                  >
                    All Products
                  </Link>{" "}
                </h5>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-users"
                    style={{ textDecoration: "none" }}
                  >
                    All Users
                  </Link>{" "}
                </h5>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/add-product"
                    style={{ textDecoration: "none" }}
                  >
                    Add Product
                  </Link>{" "}
                </h5>
              </div>

              <div className={style.nav_option + " " + style.option3}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  className={style.nav_img}
                  alt="report"
                />
                <h5>
                  {" "}
                  <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                    View Orders
                  </Link>{" "}
                </h5>
              </div>

              {/* <div className={style.nav_option + " " + style.option4}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  className={style.nav_img}
                  alt="institution"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/create-classroom"
                    style={{ textDecoration: "none" }}
                  >
                    Create Classroom
                  </Link>{" "}
                </h5>
              </div> */}

              <div className={style.nav_option + " " + style.logout}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className={style.nav_img}
                  alt="logout"
                />
                <h5>
                  {" "}
                  <Link to="/logout" style={{ textDecoration: "none" }}>
                    Logout
                  </Link>{" "}
                </h5>
              </div>
            </div>
          </nav>
        </div>
        <div className={style.main}>
          <div
            className={style.report_container}
            style={{ paddingTop: "10px" }}
          >
            <div className="container my-5">
              <div className=" row row-cols-1 buttons d-flex justify-content-center   row-cols-md-2 row-cols-lg-3 g-2">
                <button
                  type="button"
                  onClick={() => handleFilteringStatus("All")}
                  className="btn btn-outline-dark me-2 "
                >
                  All
                </button>

                <button
                  type="button"
                  onClick={() => handleFilteringStatus("Pending")}
                  className="btn btn-outline-dark me-2 "
                >
                  Pending
                </button>
                <button
                  type="button"
                  onClick={() => handleFilteringStatus("Delivered")}
                  className="btn btn-outline-dark me-2 "
                >
                  Delivered
                </button>
                <button
                  type="button"
                  onClick={() => handleFilteringStatus("Shipping")}
                  className="btn btn-outline-dark me-2 "
                >
                  Shipping
                </button>
                <button
                  type="button"
                  onClick={() => handleFilteringStatus("Cancel")}
                  className="btn btn-outline-dark me-2 "
                >
                  Cancel
                </button>
              </div>
            </div>
            <h1>Order History</h1>
            <h1>
              Total {params.status === "All" ? "" : `${params.status}`} items :{" "}
              {productLength}{" "}
            </h1>{" "}
            {rows.map((row) => {
              let total = 0;
              row.products.map((pr) => (total += pr.price));
              return (
                <>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card mb-3">
                        <div className="card-header">
                          <h2>Order ID: {row.order_id}</h2>
                          <label>Status : </label>
                          <select
                            className="option"
                            name="status"
                            value={row.status}
                            onChange={(e) => handleChange(e, row.order_id)}
                            style={{ width: "120px" }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <span
                            style={{
                              fontStyle: "italic",
                              marginLeft: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Payment Type : {row.payment_method}
                          </span>
                          <span
                            style={{
                              fontStyle: "italic",
                              marginLeft: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Payment Number : {row.payment_number}
                          </span>
                          <span
                            style={{
                              fontStyle: "italic",
                              marginLeft: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Transaction ID : {row.transaction_id}
                          </span>
                          <span
                            style={{
                              fontStyle: "italic",
                              marginLeft: "10px",
                              fontWeight: "600",
                            }}
                          >
                            Order Date (YYYY-MM-DD) :{" "}
                            {moment(row.order_date).format("YYYY-MM-DD")}
                          </span>
                        </div>

                        <div className="card-body">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Product ID</th>
                                <th>Product Image </th>
                                <th>Product Name </th>
                                <th>Quantity</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.products.map((pr) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{pr.product_id}</td>
                                      <td>
                                        {" "}
                                        <img
                                          src={pr.product_image}
                                          style={{
                                            maxWidth: "80px",
                                            maxHeight: "50px",
                                          }}
                                        />
                                      </td>
                                      <td>{pr.product_name}</td>
                                      <td>{pr.quantity}</td>
                                      <td>{pr.price}</td>
                                    </tr>
                                  </>
                                );
                              })}
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="pl-5">Total Price :</td>
                                <td>{total}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            {productLength > 0 ? (
              <div class="d-flex justify-content-center mb-5">
                <div className="btn-group ">
                  {pageNumber === 1 ? (
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

                  {pageNumber === Math.ceil(productLength / 6) ? (
                    <button
                      className="btn btn-outline-dark"
                      style={{
                        pointerEvents: "none",
                      }}
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
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-2 mt-5 m-3">
          <div className="filter-card mb-3">
            <h3 className="filter-title">Filtering By OrderStatus</h3>
            <div>
              <ul className="ps-0">
                <li onClick={() => handleFilteringStatus("All")}>All</li>
                <li onClick={() => handleFilteringStatus("Pending")}>
                  Pending
                </li>
                <li onClick={() => handleFilteringStatus("Delivered")}>
                  Delivered
                </li>
                <li onClick={() => handleFilteringStatus("Shipping")}>
                  Shipping
                </li>
                <li onClick={() => handleFilteringStatus("Cancel")}>Cancel</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-9">
          <h1>Order History</h1>
          <h1>
            Total {params.status === "All" ? "" : `${params.status}`} items :{" "}
            {productLength}{" "}
          </h1>{" "}
          {rows.map((row) => {
            let total = 0;
            row.products.map((pr) => (total += pr.price));
            return (
              <>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h2>Order ID: {row.order_id}</h2>
                        <label>Status : </label>
                        <select
                          className="option"
                          name="status"
                          value={row.status}
                          onChange={(e) => handleChange(e, row.order_id)}
                          style={{ width: "120px" }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <span
                          style={{
                            fontStyle: "italic",
                            marginLeft: "10px",
                            fontWeight: "600",
                          }}
                        >
                          Payment Type : {row.payment_method}
                        </span>
                        <span
                          style={{
                            fontStyle: "italic",
                            marginLeft: "10px",
                            fontWeight: "600",
                          }}
                        >
                          Payment Number : {row.payment_number}
                        </span>
                        <span
                          style={{
                            fontStyle: "italic",
                            marginLeft: "10px",
                            fontWeight: "600",
                          }}
                        >
                          Transaction ID : {row.transaction_id}
                        </span>
                        <span
                          style={{
                            fontStyle: "italic",
                            marginLeft: "10px",
                            fontWeight: "600",
                          }}
                        >
                          Order Date (YYYY-MM-DD) :{" "}
                          {moment(row.order_date).format("YYYY-MM-DD")}
                        </span>
                      </div>

                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Product ID</th>
                              <th>Product Image </th>
                              <th>Product Name </th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.products.map((pr) => {
                              return (
                                <>
                                  <tr>
                                    <td>{pr.product_id}</td>
                                    <td>
                                      {" "}
                                      <img
                                        src={pr.product_image}
                                        style={{
                                          maxWidth: "80px",
                                          maxHeight: "50px",
                                        }}
                                      />
                                    </td>
                                    <td>{pr.product_name}</td>
                                    <td>{pr.quantity}</td>
                                    <td>{pr.price}</td>
                                  </tr>
                                </>
                              );
                            })}
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="pl-5">Total Price :</td>
                              <td>{total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div> 


      {productLength > 0 ? (
        <div class="d-flex justify-content-center mb-5">
          <div className="btn-group ">
            {pageNumber === 1 ? (
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

            {pageNumber === Math.ceil(productLength / 6) ? (
              <button
                className="btn btn-outline-dark"
                style={{
                  pointerEvents: "none",
                }}
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
    </>
  );
};

export default Orderhandling;
