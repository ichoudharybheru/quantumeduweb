import React from "react";
import Button from "./Button";
import { BsArrowRight } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
const CodeAnimationBlock = ({
  heading,
  position,
  btn1,
  btn2,
  code,
  codeColor,
  subheading,

  backgroundGradient,
}) => {
  return (
    <div
      className={` flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}
    >
      {/*section 1 */}
      <div className=" w-[50%] flex flex-col gap-12">
        {heading}
        <div className=" text-richblack-300 text-base font-bold  -mt-3 w-[85%]">
          {subheading}
        </div>
        {/*button 1 */}

        <div className=" flex flex-row items-center gap-5">
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className="flex flex-row items-center gap-1">
              {btn1.btnText}
              <BsArrowRight></BsArrowRight>
            </div>
          </Button>
          <Button active={btn2.active} linkto={btn2.linkto}>
            {btn2.btnText}
          </Button>
        </div>
      </div>

      {/*section 2 */}

      <div
        className={`h-fit  border border-richblack-600 flex flex-row py-3
       text-[10px] sm:text-sm leading-[18px] sm:leading-6 font-bold  ${backgroundGradient}
        relative w-[100%] lg:w-[470px]`}
      >
        {/* Indexing */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} relative pr-1`}
        >
          <TypeAnimation
            sequence={[code, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeAnimationBlock;
