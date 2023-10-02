import React from "react";
import { useDispatch } from "react-redux";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { useGetTokenVerificationQuery } from "../../features/userQuery/signinupQuery";
import Products from "./Products";
import Footer from "../../pages/Footer";
import { cartInfo } from "../../features/userQuery/cartinfoSlice";
import { getRoleInfo } from "../../features/userQuery/roleSlice";
import ProductsTesting from "./ProductsTesting";
const Home = () => {
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  dispatch(getInfo());
  dispatch(cartInfo());
  const { data, isLoading } = useGetTokenVerificationQuery(token);
  {
    data && console.log(data);
  }

  return (
    <>
      {/* <Products /> */}
      <ProductsTesting />
      <Footer />
    </>
  );
};

export default Home;
