import React, { useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordToken } from "../services/operations/authAPI";
const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));

    console.log(email);
  };
  return (
    <div className="flex flex-1 justify-center items-center bg-richblack-800">
      <div>
        {loading ? (
          <div>
            {" "}
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : !emailSent ? (
          <div className="flex flex-col max-w-max gap-y-4">
            {" "}
            <h1 className=" text-richblack-5 text-xl font-semibold">
              Reset your password
            </h1>
            <p className=" text-richblack-100">
              Have no fear. We’ll email you instructions to reset<br></br> your
              password. If you dont have access to your <br></br> email we can
              try account recovery
            </p>
            <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
              <label>
                <p className="text-richblack-5">
                  Email address<sup className=" text-pink-400">*</sup>
                </p>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={email}
                  className="w-full rounded p-2"
                  required
                  onChange={handleOnChange}
                />
              </label>

              <button
                type="submit"
                className=" bg-caribbeangreen-200 text-white rounded p-3 font-semibold hover:scale-90 transition-all duration-200"
              >
                Reset Password
              </button>
            </form>
            <Link className="text-white" to={"/login"}>
              <div className=" flex flex-row items-center">
                <AiOutlineArrowLeft /> Back to Login
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col max-w-max gap-y-4">
            {" "}
            <h1 className=" text-richblack-5 text-xl font-semibold">
              Check Your Email
            </h1>
            <p className=" text-richblack-100">
              We have sent the reset email to
              <br />
              {email}
            </p>
            <button
              onClick={onFormSubmit}
              className=" bg-caribbeangreen-200 text-white rounded p-3 font-semibold hover:scale-90 transition-all duration-200"
            >
              Resend Email
            </button>
            <Link className="text-white" to={"/login"}>
              <div className=" flex flex-row items-center">
                <AiOutlineArrowLeft /> Back to Login
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
