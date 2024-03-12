import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

import { FaClockRotateLeft } from "react-icons/fa6";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { signUp } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";

import { useDispatch, useSelector } from "react-redux";
const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    console.log("otp", otp);
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="flex flex-1  justify-center items-center bg-richblack-800">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className=" max-w-max flex flex-col gap-y-3">
          <h1 className=" text-richblack-5 text-xl italic font-semibold">
            Verify email
          </h1>
          <p className=" text-richblack-200">
            A verification code has been sent to you. Enter the <br /> code
            below
          </p>
          <form
            onSubmit={handleVerifyAndSignup}
            className="flex flex-col gap-y-3"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-700 rounded-[0.5rem]
                   text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-caribbeangreen-200"
                />
              )}
            />

            <button className=" bg-caribbeangreen-200 py-2 rounded font-bold hover:scale-95 transition-all duration-200 active:opacity-0">
              Verify Email
            </button>
          </form>
          <div className="flex flex-row justify-between">
            <Link className="text-white" to={"/login"}>
              <div className=" flex flex-row items-center">
                <AiOutlineArrowLeft /> Back to Login
              </div>
            </Link>
            <button
              className=" text-blue-400 flex flex-row justify-center items-center gap-x-1"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <FaClockRotateLeft></FaClockRotateLeft>Resend Otp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
