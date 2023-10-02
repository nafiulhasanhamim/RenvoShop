import React, { useEffect, useState } from "react";
import moment from "moment";
import { useGetTokenVerificationQuery } from "../../features/userQuery/signinupQuery";
import { useNavigate } from "react-router-dom";
import { useGetAllUserOrdersQuery } from "../../features/adminQuery/productsQuery";

const Orderhistory = () => {
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState(0);
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  const { data, isLoading } = useGetTokenVerificationQuery(token);
  const params = {
    user_id: data?.id,
  };

  const orderQuery = useGetAllUserOrdersQuery(params);
  useEffect(() => {
    if (data?.result === "please provide valid token") {
      navigate("/login");
    }
    // Group the rows by order_id
    const groupedData = {};
    orderQuery?.data?.orders?.forEach((row) => {
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
  }, [orderQuery?.data, flag, pageNumber]);

  const handlePage = (action) => {
    if (action === "prev") {
      setPageNumber((prev) => prev - 1);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* bootstrap table */}
      <div className="container">
        <h1>Order History</h1>
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
                      <label>Order Status : </label>
                      <span
                        style={{
                          fontStyle: "italic",
                          marginLeft: "10px",
                          fontWeight: "600",
                          color: `${
                            row.status === "Pending" ? "red" : "green"
                          }`,
                        }}
                      >
                        {row.status}
                      </span>
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
    </>
  );
};

export default Orderhistory;
