import React from "react";
import Routers from "./routes/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTokenVerificationQuery } from "./features/userQuery/signinupQuery";
import { useDispatch } from "react-redux";
import { getRoleInfo } from "./features/userQuery/roleSlice";
function App() {
  console.log("App is called");
  const dispatch = useDispatch();
  dispatch(getRoleInfo());
  return (
    <>
      <Routers />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
