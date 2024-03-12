import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={` btn text-center text-[17px] px-6 py-3 text-white font-bold 
        rounded-md drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]  transition-all duration-500 hover:text-black
        ${active ? " bg-caribbeangreen-200  " : "bg-richblack-800"}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
