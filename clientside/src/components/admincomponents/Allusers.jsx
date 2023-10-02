import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../features/adminQuery/userhandlingQuery";
import style from "./admin.module.css";
import { Link } from "react-router-dom";

const Allusers = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState(0);

  const getAllUserQuery = useGetAllUsersQuery();
  useEffect(() => {
    // setUsers(getAllUserQuery?.data?.users);
    const update = getAllUserQuery?.data?.users?.slice(
      (pageNumber - 1) * 10,
      (pageNumber - 1) * 10 + 10
    );
    setProductLength((prev) => getAllUserQuery?.data?.users?.length);
    console.log(getAllUserQuery?.data);
    setUsers((prev) => update);
  }, [getAllUserQuery?.data, flag, pageNumber]);
  const handlePage = (action) => {
    if (action === "prev") {
      setPageNumber((prev) => prev - 1);
    } else {
      setPageNumber((prev) => prev + 1);
    }
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
          <div className={style.report_container}>
            <table className="table bg-white table-striped m-4">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    User Id
                  </th>
                  <th scope="col">Email or Phone</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  const { user_id, email, name } = user;
                  return (
                    <>
                      <tr>
                        <th scope="row">{user_id}</th>
                        <td>{email}</td>
                        <td>{name}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
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

                  {pageNumber === Math.ceil(productLength / 10) ? (
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
    </>
  );
};

export default Allusers;
