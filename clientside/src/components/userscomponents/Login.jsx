import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../../pages/BreadCrumb";
import { toast } from "react-toastify";
import Meta from "../../pages/Meta";
import Container from "../../pages/Container";
import "../../App.css";
import {
  useGetLoginMutation,
  useGetTokenVerificationQuery,
} from "../../features/userQuery/signinupQuery";
import { useDispatch } from "react-redux";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { getRoleInfo } from "../../features/userQuery/roleSlice";
// import CustomInput from "../components/CustomInput";

const Login = () => {
  const [loginUser, { isError, isLoading, isSuccess, data, error }] =
    useGetLoginMutation();
  const [err, setErr] = useState("");
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const { data: tokenResult } = useGetTokenVerificationQuery(token);

  useEffect(() => {
    if (tokenResult?.result === "token is verified") {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = user;
  const handleChange = (e) => {
    setuser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(user).then((data) => {
      {
        data.data.userinfo?.name && console.log(data.data.userinfo.name);
      }
      if (data?.data?.token) {
        const userinfo = {
          id: data.data.userinfo.user_id,
          name: data.data.userinfo.name,
          token: data.data.token,
          role: data.data.userinfo.access,
        };
        const string = JSON.stringify(userinfo);
        localStorage.setItem("userinfo", string);
      }
      {
        data?.data?.message && setErr(data.data.message);
        const info = {
          id: data.data.userinfo?.user_id,
          name: data.data.userinfo?.name,
        };
        if (data.data.message === "User is logged in successfully") {
          toast.success("Successfully Logged In", {
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
          if (data?.data?.userinfo?.access === "user") {
            navigate("/");
          } else if (data?.data?.userinfo?.access === "admin") {
            navigate("/admin/home");
          }
        }
      }
    });
  };

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              {err && (
                <h5 className="text-center" style={{ color: "red" }}>
                  {err}
                </h5>
              )}
              <form
                action=""
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div>
                  <input
                    type="text"
                    value={email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                    name="email"
                    required
                  />
                </div>{" "}
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  required
                />
                <div>
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button" type="submit">
                      Login
                    </button>
                    <Link
                      to="/signup"
                      className="button signup "
                      style={{ textDecoration: "none" }}
                    >
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
