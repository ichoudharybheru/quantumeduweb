import React from "react";
import HighLightText from "../Components/PagesComponents/HomePage/HighLightText";
import student1 from "../assets/Images/student1.jpeg";
import student2 from "../assets/Images/student2.jpeg";
import student3 from "../assets/Images/student3.jpeg";
import States from "../Components/PagesComponents/About/States";
import ContactUsForm from "../Components/PagesComponents/About/ContactUsForm";
import ReviewSlider from "../Components/common/ReviewSlider";
import Footer from "../Components/common/Footer";

const Aboutus = () => {
  return (
    <div>
      <div className="bg-richblack-800 pt-14">
        <div className="w-11/12 flex flex-col items-center mx-auto gap-6 relative h-[400px]">
          <h1 className=" text-center text-4xl font-bold text-white relative">
            Driving Innovation in Online Education for a<br />
            <HighLightText text={"Brighter Future"}></HighLightText>
          </h1>

          <p className=" text-center text-richblack-300 text-[15px] font-bold relative">
            Quantum is at the forefront of driving innovation in online
            education. We're passionate about creating a<br /> brighter future
            by offering cutting-edge courses, leveraging emerging technologies,
            and nurturing a vibrant <br /> learning community.
          </p>

          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={student1} alt="" />
            <img src={student2} alt="" />
            <img src={student3} alt="" />
          </div>
        </div>
      </div>
      <div className="mt-32 flex mx-auto items-center justify-center">
        <div className="text-white text-center text-3xl font-bold  mx-10">
          We are passionate about revolutionizing the way we learn. Our
          <br />
          innovative platform combines technology{" "}
          <HighLightText text={"combines technology"} />, expertise, and
          community to create an{" "}
          <HighLightText text={"unparalleled educational experience"} />.
        </div>
      </div>
      <div className="  h-[1px] bg-richblack-700 w-full my-14 "></div>
      <States></States>
      <div className=" text-center my-5">
        <p className=" text-white text-3xl font-semibold">Get in Touch</p>
        <ContactUsForm />
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
      <Footer />
    </div>
  );
};

export default Aboutus;
