import React from "react";
import Button from "../Components/PagesComponents/HomePage/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate(-1);
  return (
    <div className="flex flex-1 justify-center items-center text-white text-3xl">
      <div className="flex flex-col gap-y-3">
        <p> Error 404 - Page Not Found</p>
        <div className="flex flex-row gap-x-3">
          <Button active={true} linkto={"/"}>
            <div className="flex flex-row items-center gap-x-3">
              <AiOutlineArrowLeft /> Back To Home
            </div>
          </Button>
          <Button active={true} linkto={navigate}>
            <div className="flex flex-row items-center gap-x-3">
              <AiOutlineArrowLeft /> Go Back
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
