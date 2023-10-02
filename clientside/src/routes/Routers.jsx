import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/userscomponents/Home";
import About from "../components/userscomponents/About";
import Error from "../components/userscomponents/Error";
import Contact from "../components/userscomponents/Contact";
import Navbar from "../pages/Navbar";
import Login from "../components/userscomponents/Login";
import Signup from "../components/userscomponents/Signup";
import Profile from "../components/userscomponents/Profile";
import Navbars from "../pages/Navbars";
import Logout from "../components/userscomponents/Logout";
import Cart from "../components/userscomponents/Cart";
import Addtocart from "../components/userscomponents/Addtocart";
import OrderForm from "../components/userscomponents/OrderForm";
import { useGetTokenVerificationQuery } from "../features/userQuery/signinupQuery";
import AdminHome from "../components/admincomponents/AdminHome";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import Orderhandling from "../components/admincomponents/Orderhandling";
import MainLayout from "../components/admincomponents/MainLayout";
import Allusers from "../components/admincomponents/Allusers";
import Resetpassword from "../components/admincomponents/ResetPassword";
import ProductUI from "../components/userscomponents/ProductUI";
import Allproducts from "../components/admincomponents/Allproducts";
import ForgetPassword from "../components/userscomponents/ForgetPassword";
import OurStore from "../pages/OurStore";
import Orderhistory from "../components/userscomponents/Orderhistory";
import SingleProduct from "../pages/ProductDetails";
import Header from "../pages/Header";

const Routers = () => {
  const roleinfo = useSelector((state) => state.roleinfo.roleinfo);
  return (
    <BrowserRouter>
      {roleinfo?.role !== "admin" && <Header />}
      <Routes>
        {roleinfo?.role !== "admin" && <Route path="/" element={<Home />} />}
        {roleinfo?.role !== "admin" && (
          <Route path="/product" element={<OurStore />} />
        )}
        {roleinfo?.role !== "admin" && (
          <Route path="/order-history" element={<Orderhistory />} />
        )}
        {roleinfo?.role !== "admin" && (
          <Route path="/product-details" element={<SingleProduct />} />
        )}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart-items" element={<Cart />} />
        <Route path="/add-to-cart" element={<Addtocart />} />
        <Route path="/order-confirmation-form" element={<OrderForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        {/* <Route
          path="/admin/home"
          element={
            <ProtectedRoutes role={roleinfo?.role}>
              <AdminHome />
            </ProtectedRoutes>
          }
        /> */}

        {/* admin routes */}

        {roleinfo?.role === "admin" && (
          <Route path="/admin/orders" element={<Orderhandling />} />
        )}

        {roleinfo?.role === "admin" && (
          <Route path="/admin/home" element={<AdminHome />} />
        )}

        {roleinfo?.role === "admin" && (
          <Route path="/admin/all-users" element={<Allusers />} />
        )}

        {roleinfo?.role === "admin" && (
          <Route path="/reset-password/:user_id" element={<Resetpassword />} />
        )}

        {roleinfo?.role === "admin" && (
          <Route path="/admin/all-products" element={<Allproducts />} />
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
