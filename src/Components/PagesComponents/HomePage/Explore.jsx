import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard";
const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const Explore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  function setCard(value) {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <div className="text-4xl font-bold text-white">
        Unlock the <HighLightText text={" power of Code"}></HighLightText>
      </div>
      <div className="  text-richblack-300 text-xl font-semibold mt-2">
        Learn to build anything you can imagine
      </div>
      <div
        className={` text-richblack-300  flex flex-row  bg-richblack-800 p-1 px-2 rounded-lg gap-3 mt-5 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-3`}
      >
        {tabName.map((element, index) => {
          return (
            <div
              className={`text-[16px]  rounded-full ${
                element === currentTab
                  ? "text-richblack-5 font-medium bg-richblack-900"
                  : "bg-richblack-800"
              }  px-6 py-2  hover:cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-white`}
              key={index}
              onClick={() => setCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[250px]"></div>
      <div className=" absolute -bottom-32">
        <div className="  flex flex-row gap-10 justify-between w-full ">
          {courses.map((element, index) => {
            return (
              <CourseCard
                data={element}
                currentCard={currentCard}
                key={index}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
