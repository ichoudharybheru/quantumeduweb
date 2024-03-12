import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const CourseCard = ({ data, currentCard, setCurrentCard }) => {
  return (
    <div
      className={` group w-[360px]  transition-all duration-200  ${
        currentCard === data.heading
          ? "bg-white coursecard hover:bg-richblack-5"
          : " bg-richblack-800 hover:bg-richblack-5 "
      } text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(data.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={`${
            currentCard === data.heading ? "text-richblack-800" : ""
          } font-semibold text-[20px] group-hover:text-black`}
        >
          {data.heading}
        </div>
        <div className=" text-richblack-400 ">{data.description}</div>
      </div>
      <div
        className={`flex flex-row p-4 justify-between ${
          currentCard === data.heading ? "text-blue-300" : "text-blue-400"
        }`}
      >
        <div className="flex flex-row items-center gap-2 text-[16px]">
          {" "}
          <HiUsers />
          {data.level}
        </div>
        <div className="flex flex-row gap-2 items-center text-[16px]">
          {" "}
          <ImTree />
          {data.lessionNumber} Lession
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
