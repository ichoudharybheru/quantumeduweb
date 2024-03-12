import React from "react";
import CountUp from "react-countup";
const States = () => {
  return (
    <div>
      <div className="flex flex-row justify-evenly bg-richblack-800 py-7">
        <div className="flex flex-col  justify-center items-center">
          <div className="text-white text-2xl font-semibold">
            {" "}
            <CountUp end={5000} duration={1} enableScrollSpy={true} />+
          </div>
          <div className=" text-richblack-500 font-bold ">Active Students</div>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <div className="text-white text-2xl font-semibold">
            {" "}
            <CountUp end={150} duration={1} enableScrollSpy={true} />+
          </div>
          <div className=" text-richblack-500 font-bold ">Mentors</div>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <div className="text-white text-2xl font-semibold">
            {" "}
            <CountUp end={300} duration={1} enableScrollSpy={true} />+
          </div>
          <div className=" text-richblack-500 font-bold ">Courses</div>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <div className="text-white text-2xl font-semibold">
            {" "}
            <CountUp end={50} duration={1} enableScrollSpy={true} />+
          </div>
          <div className=" text-richblack-500 font-bold ">Awards</div>
        </div>
      </div>
    </div>
  );
};

export default States;
