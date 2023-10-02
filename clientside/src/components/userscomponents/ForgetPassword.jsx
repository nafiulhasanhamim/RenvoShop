import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../pages/Footer";
import {
  useRecoverPasswordEmailMutation,
  useUpdatedPasswordMutation,
  useVerifyOTPMutation,
} from "../../features/userQuery/recoverPasswordQuery";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [forgetPasswordInfo, setForgetPasswordInfo] = useState({
    email: "",
    OTP: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const { email, OTP, newPassword, retypeNewPassword } = forgetPasswordInfo;
  const [recoverPasswordEmail, recoverPasswordEmailData] =
    useRecoverPasswordEmailMutation();
  const [verificationOTP, verifyOTPData] = useVerifyOTPMutation();
  const [updatedPass, updatedPassData] = useUpdatedPasswordMutation();

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

  const toastErrorMessage = (message) => {
    toast.error(message, {
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

  useEffect(() => {
    if (recoverPasswordEmailData?.data?.message) {
      setResponse(recoverPasswordEmailData?.data?.message);
    }
    if (verifyOTPData?.data?.message) {
      setResponse(verifyOTPData?.data?.message);
    }
  }, [recoverPasswordEmailData, verifyOTPData]);

  const handleChange = (e) => {
    setForgetPasswordInfo((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (response.length === 0) {
      await recoverPasswordEmail(forgetPasswordInfo).then((data) =>
        toastSuccessMessage("An OTP is sent to your email")
      );
    }
    if (response === `An OTP is sent to your email address`) {
      const body = {
        ...forgetPasswordInfo,
        usedfor: "recover_password",
      };
      await verificationOTP(body).then((data) => {
        if (data?.data?.message === "OTP is not matched") {
          toastErrorMessage(data?.data?.message);
        } else {
          toastSuccessMessage(data?.data?.message);
        }
        setForgetPasswordInfo((prev) => ({
          ...prev,
          OTP: "",
        }));
      });
    }
    if (response === `OTP is successfully verified`) {
      if (newPassword === retypeNewPassword) {
        const isSecurePass = isSecurePassword(newPassword);
        if (isSecurePass) {
          const body = {
            email,
            newPassword,
          };
          await updatedPass(body).then((data) => {
            navigate("/login");
            toastSuccessMessage("Password is Successfully updated");
          });
        } else {
          toastErrorMessage(
            "Password should be 6 characters , atleast 1 digit and 1 letter"
          );
        }
      } else {
        toastErrorMessage("Password Mismatched");
      }
    }
  };
  return (
    <>
      <div className="wrapper">
        <h3>Password Recovery!</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={handleChange}
            placeholder="Enter Your Email"
            value={email}
            name="email"
            required
          />

          {response === `An OTP is sent to your email address` && (
            <input
              type="text"
              placeholder="Enter OTP"
              name="OTP"
              onChange={handleChange}
              value={OTP}
              required
            />
          )}

          {response === `OTP is successfully verified` && (
            <input
              type="password"
              placeholder="Enter New Password"
              name="newPassword"
              onChange={handleChange}
              value={newPassword}
              required
            />
          )}

          {response === `OTP is successfully verified` && (
            <input
              type="password"
              placeholder="Retype New Password"
              name="retypeNewPassword"
              onChange={handleChange}
              value={retypeNewPassword}
              required
            />
          )}

          <button type="submit">
            {response === `OTP is successfully verified`
              ? "Recover Password"
              : "Next"}
          </button>
        </form>
      </div>
      <div className="mb-5 pb-5"></div>
      <Footer />
    </>
  );
};

export default ForgetPassword;
