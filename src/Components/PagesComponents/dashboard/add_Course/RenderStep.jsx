import React from "react";
import { useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import CourseInformationForm from "./courseinformation/CourseInformationForm";
import CourseBuilderForm from "./courseBuilder/CourseBuilderForm";
import PublishCourse from "./courseinformation/PublishCourse";

const RenderStep = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Courses Information" },
    { id: 2, title: "Courses Builder" },
    { id: 3, title: "Publish" },
  ];
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div className="flex flex-col items-center " key={item.id}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? " border-caribbeangreen-50  bg-caribbeangreen-900 text-caribbeangreen-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${
                  step > item.id &&
                  "bg-caribbeangreen-50 text-caribbeangreen-50"
                }} `}
              >
                {step > item.id ? (
                  <GiCheckMark className="font-bold text-caribbeangreen-400 " />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id
                      ? "border-caribbeangreen-50"
                      : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="flex justify-between w-full text-white mb-16 text-sm relative">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            {" "}
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderStep;
