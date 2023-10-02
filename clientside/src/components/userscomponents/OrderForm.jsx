import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../pages/Footer";
import { useDispatch } from "react-redux";
import { getInfo } from "../../features/userQuery/userinfoSlice";
import { useGetTokenVerificationQuery } from "../../features/userQuery/signinupQuery";
import { toast } from "react-toastify";
import { useReceivedOrderMutation } from "../../features/adminQuery/productsQuery";
const OrderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem("userinfo"));
  const token = obj?.token;
  dispatch(getInfo());
  const { data, isLoading } = useGetTokenVerificationQuery(token);
  const [flag, setFlag] = useState(false);
  const [order, setOrder] = useState({
    payment_method: "Bkash",
    payment_number: "",
    transaction_id: "",
    full_address: "",
    contact_number: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const [placeOrder, output] = useReceivedOrderMutation();
  useEffect(() => {
    if (data?.result === "please provide valid token") {
      navigate("/login");
    }

    if (output?.data?.message === "Order is placed successfully..") {
      localStorage.removeItem("cartproducts");
      navigate("/");
      toast.success("Order has been successfully placed", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    let amount = 0;
    const getCartProducts = JSON.parse(localStorage.getItem("cartproducts"));
    getCartProducts?.map((cp) => (amount += cp.price * cp.quantity));
    setTotalAmount(amount);
  }, [data, flag]);

  const handleChange = (e) => {
    setOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getCartProducts = JSON.parse(localStorage.getItem("cartproducts"));
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let body = {
      orderData: {},
      products: [],
    };
    if (order.payment_number.length) {
      body.products = getCartProducts;
      body.orderData = {
        ...order,
        user_id: userinfo.id,
      };
      await placeOrder(body);
      setFlag(!flag);
    }
  };
  const {
    payment_method,
    payment_number,
    transaction_id,
    full_address,
    contact_number,
  } = order;

  return (
    <>
      <h3 className="text-center mt-2">Some Instructions : </h3>
      <h5 className="text-center m-2 text-danger">
        Please , Pay First Before Confirming Your order.Otherwise your order
        will be declined..Choose Any Payment Method. Choose Send Money
        Option.Then , put your total amount. After sending money you've got a
        transaction number.You've to put this transaction number in this form.
      </h5>
      <p></p>
      <h3 className="text-center">For Bkash Payment : 01944700614</h3>
      <h3 className="text-center">For Nagad Payment : 01944700614</h3>
      <h3 className="text-center">For Rocket Payment : 01944700614</h3>
      <h1 className="text-center mt-5 text-danger">
        You have to pay Tk. {totalAmount}
      </h1>
      <div className="wrapper">
        <h3 className="p-1">Order Confirmation Form!</h3>

        {/* {isError && <h5 style={{ color: "red" }}>{error.data.message}</h5>}
        {data && <h5 style={{ color: "green" }}>{data.message}</h5>} */}
        <form onSubmit={handleSubmit}>
          <label>Select Payment option : </label>
          <select
            className="option"
            name="payment_method"
            value={payment_method}
            onChange={handleChange}
            style={{ width: "100px" }}
          >
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
          </select>
          <input
            type="text"
            value={payment_number}
            placeholder="Enter Payment Number."
            onChange={handleChange}
            name="payment_number"
            required
          />

          <input
            type="text"
            value={transaction_id}
            placeholder="Enter Transaction Number."
            onChange={handleChange}
            name="transaction_id"
            required
          />

          <input
            type="text"
            value={full_address}
            placeholder="Enter Delivery Address"
            onChange={handleChange}
            name="full_address"
            required
          />

          <input
            type="text"
            value={contact_number}
            placeholder="Phone No."
            onChange={handleChange}
            name="contact_number"
            required
          />

          <button type="submit">Confirm Order</button>
        </form>
      </div>
      <div className="mb-5 pb-5"></div>
      <Footer />
    </>
  );
};

export default OrderForm;
