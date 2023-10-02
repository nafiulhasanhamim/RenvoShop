import React, { useState } from "react";
import { toast } from "react-toastify";
import BreadCrumb from "../../pages/BreadCrumb";
import Meta from "../../pages/Meta";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../pages/Container";
import { useGetSignupMutation } from "../../features/userQuery/signinupQuery";
const Signup = () => {
  const toastSuccessMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const navigate = useNavigate();
  const [signupUser, { isError, isLoading, data, error }] =
    useGetSignupMutation();
  // {
  //   data && console.log(data);
  // }
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    // phone_no: "",
  });

  const [secure, setSecure] = useState("");
  const [err, setErr] = useState("");
  const { name, email, password, address } = user;
  const handleChange = (e) => {
    setuser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isSecurePassword = (password) => {
    // Define a regular expression pattern for password validation
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    // Test the password against the regular expression
    return regex.test(password);
  };

  const testEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const testPhoneNumber = (phnno) => {
    const regex = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
    return regex.test(phnno);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSecurePass = isSecurePassword(password);
    console.log(email);
    const isEmail = testEmail(email);
    const isPhoneNumber = testPhoneNumber(email);
    console.log(isEmail);
    console.log(isPhoneNumber);

    if (!isSecurePass) {
      setSecure(
        "Password consists of atleast 6 characters, at least one number and one letter..."
      );
    }
    if (!isEmail && isSecurePass) {
      setSecure("");
      if (!isPhoneNumber) {
        setErr("Email or Phone.No is not valid...");
      } else {
        setSecure("");
        await signupUser(user);
        setErr("");
      }
    } else if (isEmail && isSecurePass) {
      setSecure("");
      await signupUser(user).then((data) => {
        toastSuccessMessage(data?.data?.message);
      });
      setErr("");
    }
  };

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              {isError && (
                <h5 style={{ color: "red" }}>{error.data.message}</h5>
              )}
              {err && <h5 style={{ color: "red" }}>{err}</h5>}
              {/* {data && <h5 style={{ color: "green" }}>{data.message}</h5>} */}
              {secure && <h5 style={{ color: "red" }}>{secure}</h5>}

              <form
                action=""
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  name="name"
                  required
                />

                <input
                  type="text"
                  value={email}
                  placeholder="Enter Email or Phone"
                  onChange={handleChange}
                  name="email"
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  required
                />
                <input
                  type="text"
                  value={address}
                  placeholder="Enter Your Address"
                  onChange={handleChange}
                  name="address"
                  required
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0 text-decoration-none">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              {/* <div className="not-member" style={{ textColor: "#131921" }}>
                Member? <Link to="/login">Signin</Link>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
