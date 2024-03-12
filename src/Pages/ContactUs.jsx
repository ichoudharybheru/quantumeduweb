import React from "react";
import { PiWechatLogo } from "react-icons/pi";
import { PiPhoneCallFill } from "react-icons/pi";
import ContactUsForm from "../Components/PagesComponents/About/ContactUsForm";
import ReviewSlider from "../Components/common/ReviewSlider";
import { FaGlobeAmericas } from "react-icons/fa";
const ContactUs = () => {
  return (
    <div className=" relative  w-11/12 mx-auto  gap-5  ">
      <div className=" flex flex-col lg:flex-row justify-evenly w-full mt-16">
        {" "}
        <div className=" bg-richblack-700 p-4 rounded-md flex flex-col gap-y-10 h-max">
          <div className=" text-richblack-100">
            <div className=" flex flex-row gap-x-3 items-center text-blue-300">
              <PiWechatLogo size={24} />
              <p className=" text-white">Chat on us</p>
            </div>
            <p>Our friendly team is here to help.</p>
            <p className=" font-semibold">info.quantumedu.com</p>
          </div>
          <div className=" text-richblack-100">
            <div className=" flex flex-row gap-x-3 items-center">
              <FaGlobeAmericas size={24} />
              <p className=" text-white">Visit us</p>
            </div>
            <p>Come and say hello at our office HQ..</p>
            <p className=" font-semibold">
              1600 Amphitheatre Parkway Mountain View, <br />
              CA 94043, USA{" "}
            </p>
          </div>
          <div className=" text-richblack-100">
            <div className=" flex flex-row gap-x-3 items-center text-caribbeangreen-100">
              <PiPhoneCallFill size={24} />
              <p className=" text-white">Call us</p>
            </div>
            <p>Mon - Fri From 8am to 5pm</p>
            <p className=" font-semibold">+123 456 789</p>
          </div>
        </div>
        <div className=" bg-richblack-700 p-7 rounded">
          <p className=" text-white text-3xl font-semibold">
            Reach Our Team Easily
          </p>
          <ContactUsForm />
        </div>
      </div>
      <div className=" my-8">
        {" "}
        <h1 className="text-white text-4xl text-center font-bold">
          Reviews from Other Learners
        </h1>
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <ReviewSlider />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
