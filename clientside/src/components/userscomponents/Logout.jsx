import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { getRoleInfo } from "../../features/userQuery/roleSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = JSON.parse(localStorage.getItem("userinfo"));
    if (logout === null) {
      navigate("/login");
    } else {
      localStorage.removeItem("userinfo");
      toast.success("Logged Out Successfully", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(getInfo());
      dispatch(getRoleInfo());
      navigate("/");
    }
  });
  return;
  <></>;
};

export default Logout;
