import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import logo5 from "../../../assets/Images/TimelineImage.png";
import CountUp from "react-countup";
const timeline = [
  {
    logo: logo1,
    heading: "LeaderShip",
    Descripation: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    Descripation: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    Descripation: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    Descripation: "Code your way to a solution",
  },
];

const TimeSection = () => {
  return (
    <div className="pb-16 pt-9">
      {/*section 2 */}
      <div className="flex flex-col gap-10 lg:gap-15 lg:flex-row items-center mx-4 lg:mx-auto justify-evenly ">
        <div className="flex flex-col w-[45%] gap-8">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full ">
                  <img src={element.logo} alt="" />
                </div>
                <div className=" flex flex-col">
                  <div className=" font-semibold">{element.heading}</div>
                  <div className=" text-richblack-600">
                    {element.Descripation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" relative ">
          <div className="object-fill w-[600px] h-[445px] relative shadow-[10px_-5px_50px_-5px] shadow-blue-200 overflow-y-hidden pptop ">
            <div className="absolute w-full h-[150px] top-0 z-50 pptop"></div>
            <img
              src={logo5}
              alt=""
              className="absolute object-cover h-auto companiesList "
            ></img>
            <div className="absolute w-full h-[150px] bottom-0 z-10 ppbot"></div>
          </div>

          <div className=" absolute w-[412px] h-[100px] z-20 bg-caribbeangreen-700 flex flex-row items-center justify-evenly right-20 top-[400px]">
            <div className="text-white font-bold text-3xl">12</div>
            <div className=" text-caribbeangreen-500 text-sm">
              YEARS OF <br />
              EXPERIENCE
            </div>
            <div className="w-[44px] h-[1px] bg-caribbeangreen-500 rotate-90 "></div>

            <div className="text-white font-bold text-3xl">
              {" "}
              <CountUp end={300} duration={1} enableScrollSpy={true} />
            </div>
            <div className=" text-caribbeangreen-500 text-sm">
              TYPE OF <br />
              COURSES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSection;
