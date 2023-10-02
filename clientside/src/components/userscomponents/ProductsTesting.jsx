import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import productsimg from "../../images/p11.jpg";
import axios from "axios";
import "./style.css";
import { useGetAllCategoriesQuery } from "../../features/adminQuery/categorieQuery";
import { useGetAllProductQuery } from "../../features/adminQuery/productsQuery";
const ProductsTesting = () => {
  const categorieQuery = useGetAllCategoriesQuery();
  const [categorie, setCategorie] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [flag, setFlag] = useState(true);
  const [params, setParams] = useState({
    categorie: "",
    page: 1,
  });

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetAllProductQuery(params, { refetchOnMountOrArgChange: true });
  const debouncedRefetch = debounce(refetch, 300);

  useEffect(() => {
    refetch();
  }, [categorieQuery, refetch, params]);

  const handleClick = (c) => {
    setParams((prev) => ({
      ...prev,
      categorie: c,
      page: 1,
    }));
  };

  const handlePage = (action) => {
    if (action === "prev") {
      setParams((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
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
        </div>
      </div>
      <section className="container my-5">
        <div className="row row-cols-1 row-cols-md-2  row-cols-lg-3 g-4">
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

        {Number(products?.productLength) > 0 ? (
          <div class="d-flex justify-content-center mb-5 mt-5">
            <div className="btn-group justify-content-center">
              {params.page === 1 ? (
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

              {params.page ===
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
      </section>
    </>
  );
};

export default ProductsTesting;
