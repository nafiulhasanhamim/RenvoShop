import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsimg from "../../images/p11.jpg";
import axios from "axios";
import "./style.css";
import { useGetAllCategoriesQuery } from "../../features/adminQuery/categorieQuery";
import { useGetAllProductsQuery } from "../../features/adminQuery/productsQuery";
const Products = () => {
  const categorieQuery = useGetAllCategoriesQuery();
  const { data } = useGetAllProductsQuery();

  const [categorie, setCategorie] = useState("");
  const [products, setProducts] = useState([]);
  const [fetchproducts, setFetchProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState(0);

  useEffect(() => {
    if (data || categorie === "All" || categorie.length === 0) {
      const update = data?.products.slice(
        (pageNumber - 1) * 10,
        (pageNumber - 1) * 10 + 10
      );
      setProductLength((prev) => data?.products.length);
      setProducts((prev) => update);
      setFetchProducts(data?.products);
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
  }, [categorieQuery, data, categorie, pageNumber]);

  const handleClick = (c) => {
    setCategorie(c);
    setPageNumber(1);
    setProductLength(0);
  };

  const handlePage = (action) => {
    if (action === "prev") {
      setPageNumber((prev) => prev - 1);
      // if (categorie.length === 0 || categorie === "All") {
      //   const filteredProducts = products.filter(
      //     (product) => product.product_category === "All"
      //   );
      //   setProducts((prev) => filteredProducts.slice(firstIndex, lastIndex));
      // }
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className=" row row-cols-1 buttons d-flex justify-content-center mb-5 pb-5 row-cols-md-2 row-cols-lg-3 g-2">
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
          {/* <form className="d-flex" id="search">
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
      <section className="container my-5">
        <div className="row row-cols-1 row-cols-md-2  row-cols-lg-3 g-4">
          {products?.map((product) => {
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
              <div className="col" key={product.product_id}>
                <div className="card h-100 my-card shadow-lg border-0">
                  <img
                    src={product.product_image}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">{product.product_description}</p>
                    <h5 className="card-text">
                      Categorie : {product.categorie_name}
                    </h5>
                    {product.available_product > 0 ? (
                      <h5 className="card-text mt-1">
                        {product.available_product} Pieces available
                      </h5>
                    ) : (
                      <h5 className="card-text">Out Of Stock</h5>
                    )}
                  </div>
                  <div className="m-2">
                    <h5 className="card-title ">
                      {product.discount > 0 ? (
                        <>
                          <strike className="m-2">
                            Price : Tk.{product.price}
                          </strike>
                          Price : Tk.
                          {product.price -
                            Math.floor(
                              (product.price * product.discount) / 100
                            )}
                        </>
                      ) : (
                        <>Price : Tk.{product.price}</>
                      )}
                    </h5>

                    {product.available_product === 0 ? (
                      <Link
                        to="/cart-items"
                        style={{ pointerEvents: "none" }}
                        className="btn btn-outline-dark m-1"
                      >
                        Add To Cart
                      </Link>
                    ) : (
                      <Link
                        to="/add-to-cart"
                        state={{ product }}
                        className="btn btn-outline-dark m-1"
                      >
                        Add To Cart
                      </Link>
                    )}
                    <div className="btn btn-outline-dark m-2">View Details</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {productLength > 0 ? (
          <div class="d-flex justify-content-center mb-5 mt-5">
            <div className="btn-group justify-content-center">
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
      </section>
    </>
  );
};

export default Products;
