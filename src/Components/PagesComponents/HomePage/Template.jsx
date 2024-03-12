import React from "react";
import Button from "./Button";
import HighLightText from "./HighLightText";
import temp1 from "../../../assets/Images/Know_your_progress.png";
import temp2 from "../../../assets/Images/Plan_your_lessons.png";
import temp3 from "../../../assets/Images/Compare_with_others.png";
const Template = () => {
  return (
    <div>
      <div className="flex flex-col w-11/12 mx-auto items-center py-10 gap-3">
        <h1 className="text-4xl text-richblack-700 font-bold ">
          Your Swiss Knife for{" "}
          <HighLightText text={"learning any language"}></HighLightText>
        </h1>
        <p className=" text-center text-richblack-800">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking,
          <br /> custom schedule and more.
        </p>
        <div className="flex flex-col lg:flex-row  items-center justify-center mt-2">
          <img
            src={temp1}
            alt=""
            className=" object-contain -mr-32 hover:scale-110 z-0 transition-all duration-200"
          ></img>
          <img
            src={temp3}
            className=" object-contain -mr-32 z-20 hover:scale-110  transition-all duration-200"
            alt=""
          ></img>
          <img
            src={temp2}
            alt=""
            className=" object-contain  hover:scale-110 transition-all duration-200 z-40"
          ></img>
        </div>
        <div>
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Template;
