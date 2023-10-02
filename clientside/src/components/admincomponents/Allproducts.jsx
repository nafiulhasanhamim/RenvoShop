import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../features/adminQuery/userhandlingQuery";
import { Link } from "react-router-dom";
import style from "./admin.module.css";
import {
  useGetAllProductsQuery,
  useSoldAllProductsQuery,
} from "../../features/adminQuery/productsQuery";
import { useGetAllCategoriesQuery } from "../../features/adminQuery/categorieQuery";
import AdminHome from "./AdminHome";

const Allproducts = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState(0);
  const [fetchproducts, setFetchProducts] = useState([]);
  const [categorie, setCategorie] = useState("");

  const categorieQuery = useGetAllCategoriesQuery();
  const getAllProductsQuery = useGetAllProductsQuery();
  const soldAllProducts = useSoldAllProductsQuery();
  const [soldProducts, setSoldProducts] = useState({});
  useEffect(() => {
    const productsObject = soldAllProducts?.data?.products?.reduce(
      (obj, product) => {
        obj[product.product_id] = product;
        return obj;
      },
      {}
    );
    setSoldProducts(productsObject);

    if (
      getAllProductsQuery?.data ||
      categorie === "All" ||
      categorie.length === 0
    ) {
      const update = getAllProductsQuery?.data?.products.slice(
        (pageNumber - 1) * 10,
        (pageNumber - 1) * 10 + 10
      );
      setProductLength((prev) => getAllProductsQuery?.data?.products.length);
      setProducts((prev) => update);
      setFetchProducts(getAllProductsQuery?.data?.products);
    }
    if (categorie !== "All" && categorie.length > 0) {
      const filteredProducts = fetchproducts?.filter(
        (p) => p.categorie_name.toLowerCase() === categorie.toLowerCase()
      );
      const update = filteredProducts.slice(
        (pageNumber - 1) * 10,
        (pageNumber - 1) * 10 + 10
      );
      setProductLength((prev) => filteredProducts.length);
      setProducts((prev) => update);
    }
  }, [
    getAllProductsQuery,
    flag,
    pageNumber,
    categorie,
    categorieQuery,
    soldAllProducts,
  ]);

  const handleClick = (c) => {
    setCategorie(c);
    setPageNumber(1);
    setProductLength(0);
  };

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
          <input
            type="text"
            placeholder="Search by Products Name or Category"
          />
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
            {/* <div className={style.report_header}>
              <h1 className={style.recent_Articles}>Recent Articles</h1>
              <button className={style.view}>View All</button>
            </div> */}
            <div className="container my-5">
              <div className=" row row-cols-1 buttons d-flex justify-content-center   row-cols-md-2 row-cols-lg-3 g-2">
                <button
                  type="button"
                  onClick={() => handleClick("All")}
                  className="btn btn-outline-dark me-2 "
                >
                  All
                </button>
                {categorieQuery.data?.categories?.map((categorie) => {
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => handleClick(categorie.categorie_name)}
                        className="btn btn-outline-dark me-2 "
                      >
                        {categorie.categorie_name}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>

            <h3 className="text-center ">Total Products : {productLength}</h3>
            <table className="table bg-white table-striped m-4">
              <thead>
                <tr>
                  <th scope="col">Product Image</th>
                  <th scope="col" className="text-center">
                    Product ID
                  </th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category Name</th>
                  <th scope="col" className="text-center">
                    Available Products
                  </th>
                  <th scope="col">Discount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Price After dis.</th>
                  <th scope="col">Total Orders</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  const {
                    product_image,
                    product_id,
                    product_name,
                    categorie_name,
                    available_product,
                    discount,
                    price,
                  } = product;
                  return (
                    <>
                      <tr>
                        <td>
                          <img
                            src={product_image}
                            style={{
                              maxWidth: "80px",
                              maxHeight: "50px",
                            }}
                          />
                        </td>
                        <th scope="row">{product_id}</th>
                        <td>{product_name}</td>
                        <td>{categorie_name}</td>
                        <td className="text-center">{available_product}</td>
                        <td className="text-center">{discount}</td>
                        <td>{price}</td>
                        <td className="text-center">
                          {product.price -
                            Math.floor(
                              (product.price * product.discount) / 100
                            )}
                        </td>
                        <td className="text-center">
                          {soldProducts?.[product.product_id]
                            ? soldProducts?.[product.product_id].total_quantity
                            : 0}
                        </td>
                        <td>
                          <Link
                            to={`/reset-password/${product_id}`}
                            className="btn btn-outline-dark"
                          >
                            Edit
                          </Link>
                        </td>
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

      {/* <div className="container my-5">
        <div className=" row row-cols-1 buttons d-flex justify-content-center   row-cols-md-2 row-cols-lg-3 g-2">
          <button
            type="button"
            onClick={() => handleClick("All")}
            className="btn btn-outline-dark me-2 "
          >
            All
          </button>
          {categorieQuery.data?.categories?.map((categorie) => {
            return (
              <>
                <button
                  type="button"
                  onClick={() => handleClick(categorie.categorie_name)}
                  className="btn btn-outline-dark me-2 "
                >
                  {categorie.categorie_name}
                </button>
              </>
            );
          })}
        </div>
      </div>
      <h3 className="text-center ">Total Products : {productLength}</h3>
      <table className="table bg-white table-striped m-4">
        <thead>
          <tr>
            <th scope="col">Product Image</th>
            <th scope="col" className="text-center">
              Product ID
            </th>
            <th scope="col">Product Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Available Products</th>
            <th scope="col">Discount</th>
            <th scope="col">Price</th>
            <th scope="col">Price After dis.</th>
            <th scope="col">Total Orders</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            const {
              product_image,
              product_id,
              product_name,
              categorie_name,
              available_product,
              discount,
              price,
            } = product;
            return (
              <>
                <tr>
                  <td>
                    <img
                      src={product_image}
                      style={{
                        maxWidth: "80px",
                        maxHeight: "50px",
                      }}
                    />
                  </td>
                  <th scope="row">{product_id}</th>
                  <td>{product_name}</td>
                  <td>{categorie_name}</td>
                  <td className="text-center">{available_product}</td>
                  <td>{discount}</td>
                  <td>{price}</td>
                  <td className="text-center">
                    {product.price -
                      Math.floor((product.price * product.discount) / 100)}
                  </td>
                  <td className="text-center">
                    {soldProducts?.[product.product_id]
                      ? soldProducts?.[product.product_id].total_quantity
                      : 0}
                  </td>
                  <td>
                    <Link
                      to={`/reset-password/${product_id}`}
                      className="btn btn-outline-dark"
                    >
                      Edit
                    </Link>
                  </td>
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
      )} */}
    </>
  );
};

export default Allproducts;
