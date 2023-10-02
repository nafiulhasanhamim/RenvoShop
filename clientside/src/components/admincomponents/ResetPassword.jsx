import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/adminQuery/userhandlingQuery";
import { toast } from "react-toastify";

const Resetpassword = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [resetPassword, output] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      user_id,
      password,
    };
    await resetPassword(body).then((res) => {
      res?.data?.message === "Password is reset Successfully" &&
        navigate("/admin/all-users");
      toast.success("Password has been reset Successfully...", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  return (
    <>
      <div className="wrapper">
        <h5 className="text-center">Enter your Password</h5>
        {err && <h5 style={{ color: "red" }}>{err}</h5>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Resetpassword;
