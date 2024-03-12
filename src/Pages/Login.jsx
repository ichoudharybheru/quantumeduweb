import React from "react";
import LoginForm from "../Components/PagesComponents/auth/LoginForm";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="  pb-9 pt-9 login">
        <div className=" relative  lg:w-[70%] m-auto lg:mx-auto flex flex-col lg:flex-row rounded ">
          <div className=" w-[50%] bg-richblack-700 text-richblack-5 flex flex-col gap-y-7 pt-20 p-24">
            <h1 className=" font-bold text-[35px] leading-snug">Log in</h1>
            <p>Good to see you again!</p>
            <p>
              By logging into Quantum, you agree to our{" "}
              <span className=" underline">Terms of use</span> and{" "}
              <span className=" underline">Privacy Policy</span>.
            </p>
          </div>
          <div className=" bg-richblack-5 w-[50%] flex flex-col justify-center items-center gap-y-8 pt-32 pb-16">
            <h1 className="font-bold italic text-[30px]">Welcome Back</h1>
            <LoginForm />
            <div>
              <p>
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-blue-400 font-bold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
