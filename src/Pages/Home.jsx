import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import HighLightText from "../Components/PagesComponents/HomePage/HighLightText";
import Button from "../Components/PagesComponents/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeAnimationBlock from "../Components/PagesComponents/HomePage/CodeAnimationBlock";
import TimeSection from "../Components/PagesComponents/HomePage/TimeSection";
import Template from "../Components/PagesComponents/HomePage/Template";
import Teacher from "../assets/Images/Tutotr.png";
import { TypeAnimation } from "react-type-animation";
import Explore from "../Components/PagesComponents/HomePage/Explore";
import { getAllCourse } from "../services/operations/coursesDetailAPI";

import HomeCourseSlide from "../Components/PagesComponents/HomePage/HomeCourseSlide";
import { CheckForUser } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
import ReviewSlider from "../Components/common/ReviewSlider";
import Footer from "../Components/common/Footer";
const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);
  const getAllCourses = async () => {
    let result = await getAllCourse();
    if (result) {
      setCourses(result);
      // console.log(Courses);
    }
  };
  useEffect(() => {
    getAllCourses();
    CheckForUser(token, navigate);
  }, []);
  return (
    <div>
      {/*section 1 */}
      <div className=" relative flex flex-col items-center w-11/12 mx-auto justify-between gap-5 ">
        {token === null && (
          <Link to={"/signup"}>
            <div
              className=" group p-1 mt-16 mx-auto drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]	 rounded-full bg-richblack-800
            font-bold text-richblack-200  hover:scale-95 transition-all duration-200 w-fit  hover:drop-shadow-none
          "
            >
              <div className=" flex flex-row items-center  rounded-full px-12 py-[12px] gap-3  group-hover:bg-richblack-900 transition-all duration-200">
                {" "}
                <p>Become an Instructor</p>
                <BsArrowRight></BsArrowRight>
              </div>
            </div>
          </Link>
        )}

        <div className=" text-white flex flex-row gap-1 items-center mt-6 font-bold text-4xl">
          Empower your Future with <HighLightText text={"  Coding Skills"} />
        </div>
        <div className=" w-[90%] font-bold text-richblue-300 text-lg mx-auto text-center mt-6">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className=" flex flex-row mx-auto gap-7 mt-8 ">
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>
          <Button active={false} linkto={"/login"}>
            Book a Demo
          </Button>
        </div>
        {/*  */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          {Courses.length > 0 ? (
            <HomeCourseSlide Courses={Courses}></HomeCourseSlide>
          ) : (
            <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200 mx-auto">
              <video
                muted
                loop
                autoPlay
                className="shadow-[20px_20px_rgba(253,259,245)]"
              >
                {" "}
                <source src={Banner} type="video/mp4"></source>
              </video>
            </div>
          )}
          {/* ) : (
           
          )} */}
        </div>
        {/*animation code blocks */}
        <div className=" mx-auto w-11/12 flex flex-col gap-12 mt-8 ">
          <div>
            {" "}
            <CodeAnimationBlock
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold text-white   ">
                  Unlock your <HighLightText text={"coding potential  "} />
                  withour online courses.
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              btn1={{
                btnText: "Try it Yourself",
                linkto: "/signup",
                active: true,
              }}
              btn2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body><div>hello</div>
  </body>
</html>
`}
              codeColor={"text-blue-300"}
              backgroundGradient={"gg1"}
            ></CodeAnimationBlock>
          </div>
          <div>
            {" "}
            <CodeAnimationBlock
              position={"lg:flex-row-reverse "}
              heading={
                <div className="text-4xl font-semibold text-white">
                  Start <HighLightText text={"coding in seconds  "} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              btn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              btn2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              code={`import matplotlib.pyplot as plt
import numpy
from sklearn import metrics
actual = numpy.random.binomial(1,.9,size = 1000)
predicted = numpy.random.binomial(1,.9,size = 1000)
confusion_matrix = metrics.confusion_matrix(actual, predicted)
cm_display = metrics.ConfusionMatrixDisplay(confusion_matrix = confusion_matrix, display_labels = [False, True])
cm_display.plot()
plt.show`}
              codeColor={"text-yellow-25"}
              backgroundGradient={"gg2"}
            ></CodeAnimationBlock>
          </div>
        </div>
        <div>
          <Explore></Explore>
        </div>
      </div>
      {/*section 2 */}
      <div className=" bg-pure-greys-5">
        {/*section 2 part-1 */}
        <div className=" h-[310px] homepage_bg ">
          <div className="flex flex-row gap-5 justify-center pt-[200px]">
            <Button active={true} linkto={"/signup"}>
              {" "}
              <div className="flex flex-row items-center gap-1">
                Explore Full Catlog
                <BsArrowRight></BsArrowRight>
              </div>
            </Button>
            <Button active={false} linkto={"/signup"}>
              Learn More
            </Button>
          </div>{" "}
        </div>
        {/*section 2 part-2*/}
        <div className="flex lg:flex-row  flex-col lg:items-center mx-auto w-11/12 justify-between py-24 items-center  gap-10 max-w-maxContent">
          <div className=" text-4xl font-bold text-richblack-700 text-center">
            Get the Skills you need for a{" "}
            <HighLightText text={"Job that is in demand"}></HighLightText>
          </div>
          <div className="flex flex-col justify-center pr-8 gap-5 items-start w-[50%]">
            <div className=" text-richblack-600">
              The modern <HighLightText text={"Quantum"}></HighLightText> is the
              dictates its own terms. Today, to be a competitive specialist
              requires more than professional skills.
            </div>
            <Button active={true} linkto={"/signup"}>
              Learn more
            </Button>
          </div>
        </div>
        {/*section 2 part 3*/}
        <div className=" w-11/12 mx-auto">
          <TimeSection></TimeSection>
          <Template></Template>
        </div>
      </div>
      {/*section 3 */}
      <div className="flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-between gap-16">
        <div className="flex flex-col lg:flex-row mt-12 lg:mt-24 justify-between items-center">
          <div className=" w-[45%]  shadow-[10px_-5px_50px_-5px] shadow-caribbeangreen-300 ">
            <img
              src={Teacher}
              alt=""
              className=" object-fill shadow-pure-greys-100 shadow-[-20px_-20px_0_0]"
              height={900}
            ></img>
          </div>
          <div className="flex flex-col justify-evenly items-start gap-8">
            <h1 className=" text-4xl text-white  font-bold">
              Become an
              <br />
              <div className=" textgradient">
                <TypeAnimation
                  sequence={["Instructor", 1200, ""]}
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                  }}
                />
              </div>
            </h1>
            <p className=" text-richblack-500  font-bold">
              Instructors from around the world teach millions of students on
              <br />
              Quantum. We provide the tools and skills to teach what you love.
            </p>
            <div>
              <Button active={true} linkto={"/signup"}>
                {" "}
                <div className="flex flex-row items-center gap-1">
                  Start Teaching Today
                  <BsArrowRight></BsArrowRight>
                </div>
              </Button>
            </div>
          </div>
        </div>
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

export default Home;
