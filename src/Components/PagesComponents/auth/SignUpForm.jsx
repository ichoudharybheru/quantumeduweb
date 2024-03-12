import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../redux/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
};
const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const sumbithandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    if (password.length < 9) {
      toast.error("password lenght should be 8");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };
    console.log(signupData);
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      tabName: "Student",
      tabType: ACCOUNT_TYPE.STUDENT,
    },
    {
      tabName: "Instructor",
      tabType: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];
  return (
    <div>
      <div className="  mx-auto p-7 flex flex-col gap-y-4 mt-9 rounded signupbox bg-richblack-800">
        <div className="flex flex-row max-w-max gap-3 bg-richblack-600 p-1 rounded-full">
          {tabData.map((tab, index) => (
            <div
              key={index}
              className={` ${
                accountType === tab.tabType
                  ? " bg-white text-richblack-700"
                  : " bg-richblack-600"
              } px-4 py-2 hover:cursor-pointer rounded-full`}
              onClick={() => setAccountType(tab.tabType)}
            >
              {tab.tabName}{" "}
            </div>
          ))}
        </div>
        <form className=" space-y-4" onSubmit={sumbithandler}>
          <div className="flex flex-col lg:flex-row w-full gap-x-3">
            <label className="w-full">
              <p>
                First Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleOnChange}
                value={firstName}
                className=" border rounded border-richblack-300 w-full p-2 text-richblack-700 "
              ></input>
            </label>
            <label className=" w-full">
              <p>
                Last Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 w-full p-2 text-richblack-700"
              ></input>
            </label>
          </div>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
              Email address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={handleOnChange}
              value={email}
              placeholder="Enter email address"
              className=" w-full rounded p-2 border border-richblack-400 text-richblack-700 "
            />
          </label>
          <div className="flex flex-col lg:flex-row w-full gap-x-6">
            <label className="w-full relative">
              <p>
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword1 ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 w-full p-3 text-richblack-700"
              ></input>
              <span
                onClick={() => setShowPassword1((prev) => !prev)}
                className=" hover:cursor-pointer absolute right-2 top-9 text-richblack-700 "
              >
                {showPassword1 ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>
            <label className=" w-full relative">
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
                className=" border rounded border-richblack-300 w-full p-3 text-richblack-700"
              ></input>
              <span
                onClick={() => setShowPassword2((prev) => !prev)}
                className=" hover:cursor-pointer absolute right-2 top-9 text-richblack-700 "
              >
                {showPassword2 ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>
          </div>

          <button className=" bg-caribbeangreen-200 py-2 text-richblack-5 rounded w-full font-bold hover:scale-95 transition-all duration-200 active:opacity-0">
            Sign Up
          </button>
        </form>
        <div className="mx-auto text-richblack-400 text-xs">
          <p>
            By signing up, you agree to our{" "}
            <span className=" underline">Terms of Use</span> and{" "}
            <span className=" underline"> Privacy Policy</span>.
          </p>
        </div>
        <div className="h-[1px] bg-richblack-400"></div>
        <div className="mx-auto">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className=" font-semibold text-caribbeangreen-200"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
