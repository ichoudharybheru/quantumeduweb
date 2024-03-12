import React, { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(true);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormsubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  return (
    <form
      className="flex flex-col gap-y-5 w-full relative  px-16"
      onSubmit={onFormsubmit}
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
          Email address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className=" w-full rounded p-3 border border-richblack-400 "
        />
      </label>
      <label className=" space-y-3">
        <p>
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handleOnChange}
          className=" rounded w-full p-3 border border-richblack-400 "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className=" absolute right-20 translate-y-3 hover:cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} />
          ) : (
            <AiOutlineEye fontSize={24} />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-[15px] text-blue-100">
            Forgot Password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className=" bg-caribbeangreen-200 py-2 text-richblack-5 rounded font-bold hover:scale-95 transition-all duration-200 active:opacity-0"
      >
        Log in
      </button>
      <div className=" h-[1px] w-full bg-richblack-500"></div>
    </form>
  );
};

export default LoginForm;
