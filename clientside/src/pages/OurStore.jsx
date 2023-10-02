import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "./Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "./ProductCard";
import Color from "./Color";
import Container from "./Container";
import "../App.css";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import watch from "../images/watch.jpg";
import gr from "../images/gr.svg";
import gr2 from "../images/gr2.svg";
import gr3 from "../images/gr3.svg";
import gr4 from "../images/gr4.svg";
import { useGetAllCategoriesQuery } from "../features/adminQuery/categorieQuery";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  changeCheckBoxes,
  changePage,
  changePriceFrom,
  changePriceTo,
  changeSortBy,
} from "../features/userQuery/filteredOptionsSlice";

const OurStore = () => {
  const filteredInfo = useSelector((state) => state.filteredInfo.filteredInfo);
  const productsLength = useSelector(
    (state) => state.productsInfo.productsLength.length
  );
  const categorieQuery = useGetAllCategoriesQuery();
  const [grid, setGrid] = useState(4);
  const location = useLocation();
  const dispatch = useDispatch();
  // const [filteredOptions, setFilteredOptions] = useState({
  //   categorie: "",
  //   priceFrom: "",
  //   priceTo: "",
  //   sortBy: "Price, high to low",
  //   page: 1,
  //   checkboxes: "",
  // });
  // console.log(filteredOptions);
  // const [checkboxes, setCheckboxes] = useState([]);
  // const [flag, setFlag] = useState(true);
  // useEffect(() => {
  //   console.log(filteredOptions);
  // }, [flag]);
  const handleCategory = (categorie_name) => {
    // setFilteredOptions((prev) => ({
    //   ...prev,
    //   categorie: categorie_name,
    //   page: 1,
    // }));
    dispatch(changeCategory(categorie_name));
  };

  const handleChangeFilteredOptions = (type, value) => {
    if (type === "page") {
      // setFilteredOptions((prev) => ({
      //   ...prev,
      //   page: value,
      // }));
      dispatch(changePage(value));
    }
  };
  const prevCheckboxesRef = useRef("");
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // setFilteredOptions((prevOptions) => {
    //   // Store the previous checkboxes value in the ref
    //   prevCheckboxesRef.current = prevOptions.checkboxes[0];
    //   const updatedCheckboxes = checked ? value : "";
    //   // Return the updated state object
    //   return {
    //     ...prevOptions,
    //     page: 1,
    //     checkboxes: updatedCheckboxes,
    //   };
    // });
    if (checked) {
      dispatch(changeCheckBoxes(value));
    } else {
      dispatch(changeCheckBoxes(""));
    }
  };

  const handlePriceFilter = debounce((action, value) => {
    if (Number(value) < 0) {
      //toast message
      toast.warn("Put a positive number for getting products...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (action === "from") {
        // setFilteredOptions((prev) => ({
        //   ...prev,
        //   priceFrom: value,
        //   page: 1,
        // }));
        dispatch(changePriceFrom(value));
      } else {
        // setFilteredOptions((prev) => ({
        //   ...prev,
        //   priceTo: value,
        //   page: 1,
        // }));
        dispatch(changePriceTo(value));
      }
    }
  }, 300);

  const handleSelectedOption = (e) => {
    // setFilteredOptions((prev) => ({
    //   ...prev,
    //   sortBy: e.target.value,
    //   page: 1,
    // }));
    dispatch(changeSortBy(e.target.value));
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li onClick={() => handleCategory("All")}>All</li>
                  {categorieQuery.data?.categories?.map((categorie) => {
                    return (
                      <li
                        onClick={() => handleCategory(categorie.categorie_name)}
                      >
                        {categorie.categorie_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      // checked={filteredOptions.checkboxes.includes("In Stock")}
                      checked={filteredInfo.checkboxes === "In Stock"}
                      value="In Stock"
                      onChange={handleCheckboxChange}
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Out of Stock"
                      // checked={filteredOptions.checkboxes.includes(
                      //   "Out of Stock"
                      // )}
                      checked={filteredInfo.checkboxes === "Out of Stock"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      onChange={(e) =>
                        handlePriceFilter("from", e.target.value)
                      }
                      // value={filteredOptions.priceFrom}
                      value={filteredInfo.priceFrom}
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      onChange={(e) => handlePriceFilter("to", e.target.value)}
                      // value={filteredOptions.priceTo}
                      value={filteredInfo.priceTo}
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div> 

                 <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>  
                </div>
                 */}
              </div>
            </div>
            {/* <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Headphone
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Laptop
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Mobile
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Wire
                  </span>
                </div>
              </div>
            </div> */}
            {/*
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                 <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img src={watch} className="img-fluid" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div> 
                 <div className="random-products d-flex">
                  <div className="w-50">
                    <img src={watch} className="img-fluid" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div> 
              </div>  
            </div>  */}
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4 ">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10 ">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name="sortBy"
                    // value={filteredOptions.sortBy}
                    value={filteredInfo.sortBy}
                    onChange={handleSelectedOption}
                    className="form-control form-select"
                    id=""
                  >
                    {/* <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option> */}
                    <option className="form-control" value="Price, low to high">
                      Price, low to high
                    </option>
                    <option className="form-control" value="Price, high to low">
                      Price, high to low
                    </option>
                    {/* <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option> */}
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 ">
                  <p className="totalproducts mb-0">
                    {productsLength} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src={gr4}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src={gr3}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src={gr2}
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src={gr}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  onChangeFilteredOptions={handleChangeFilteredOptions}
                  // filteredOptions={filteredOptions}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
