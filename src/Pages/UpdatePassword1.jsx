import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetUpdatePassword } from "../services/operations/authAPI";

const UpdatePassword1 = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const token = location.pathname.split("/").at(-1);
    dispatch(resetUpdatePassword(password, confirmPassword, navigate, token));
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      {loading ? (
        <div>
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-max gap-y-3">
          <h1 className=" text-richblack-5 text-xl font-bold italic">
            Choose new password
          </h1>
          <p className=" text-richblack-200">
            Almost done. Enter your new password and you <br />
            are all set.
          </p>
          <form className="flex flex-col gap-y-3" onSubmit={handleOnSubmit}>
            <label className="w-full relative text-richblack-25">
              <p>
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword1 ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 w-full p-3 text-black"
              ></input>
              <span
                onClick={() => setShowPassword1((prev) => !prev)}
                className="  hover:cursor-pointer absolute right-2 top-9 "
              >
                {showPassword1 ? (
                  <AiOutlineEyeInvisible fontSize={22} color="#010001" />
                ) : (
                  <AiOutlineEye fontSize={22} color="#010001" />
                )}
              </span>
            </label>
            <label className=" w-full relative text-richblack-25">
              <p>
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showPassword2 ? "text" : "password"}
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 w-full p-3 text-black"
              ></input>
              <span
                onClick={() => setShowPassword2((prev) => !prev)}
                className=" hover:cursor-pointer absolute right-2 top-9 "
              >
                {showPassword2 ? (
                  <AiOutlineEyeInvisible fontSize={22} color="#010001" />
                ) : (
                  <AiOutlineEye fontSize={22} color="#010001" />
                )}
              </span>
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
      )}
    </div>
  );
};

export default UpdatePassword1;
