import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { useGetTokenVerificationQuery } from "../../features/userQuery/signinupQuery";

const Addtocart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  dispatch(getInfo());
  const { data, isLoading } = useGetTokenVerificationQuery(token);

  useEffect(() => {
    const toastNotification = (message) => {
      toast.success(message, {
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

    if (data?.result === "please provide valid token") {
      navigate("/login");
    } else if (data?.result === "token is verified") {
      const storage = JSON.parse(localStorage.getItem("cartproducts"));
      if (storage !== null) {
        const checkexisting = storage.filter(
          (p) => p.product_id === location.state.product.product_id
        );
        if (checkexisting.length === 0) {
          const product = {
            ...location.state.product,
            quantity: 1,
          };
          const products = [...storage, product];
          const set = JSON.stringify(products);
          localStorage.setItem("cartproducts", set);
          toastNotification("Product Added to cart");
        } else {
          toast.error("Product was already added to cart", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        const product = {
          ...location.state.product,
          quantity: 1,
        };
        const products = [product];
        const set = JSON.stringify(products);
        console.log(products);
        localStorage.setItem("cartproducts", set);
        toastNotification("Product Added to cart");
      }

      navigate("/");
    }
  }, [data]);
  return <></>;
};

export default Addtocart;
