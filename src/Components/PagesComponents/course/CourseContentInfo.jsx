import React, { useEffect, useRef, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
const CourseContentInfo = ({ section, isActive, handleActive }) => {
  const contentEl = useRef(null);
  //console.log(isActive);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isActive?.includes(section._id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [isActive]);
  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="text-white">
      <div
        onClick={() => {
          handleActive(section._id);
        }}
        className="flex flex-row justify-between items-center border-x border-t bg-richblack-700 p-5 border-richblack-600 text-xl cursor-pointer"
      >
        {" "}
        <div className=" flex flex-row gap-2 items-center">
          <IoIosArrowDown className={` ${active && " rotate-180"}`} />
          {section.sectionName}
        </div>
        <p className=" text-caribbeangreen-100">
          {`${section.subSection.length || 0} lesson(s)`}
        </p>
      </div>
      <div
        ref={contentEl}
        style={{
          height: sectionHeight,
        }}
        className={`relative h-0 overflow-hidden border-x border-b border-richblack-600 bg-richblack-900 transition-all duration-[0.35s] ease-[ease]`}
      >
        {section.subSection &&
          section.subSection.map((subsection) => (
            <div className=" flex flex-row  p-4 items-center gap-1 ">
              {" "}
              <IoVideocam color="#44E4BF" />
              {subsection.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseContentInfo;

/* <details
            className="transition-all duration-500 custom-details"
            key={section._id}
          >
            <summary className="flex flex-row justify-between items-center border bg-richblack-700 p-3 border-richblack-600 ">
              <div>{section.sectionName}</div>
              <p className=" text-caribbeangreen-100">
                {" "}
                {section.subSection.length} Lesson(s)
              </p>
            </summary>
            <div className=" border border-richblack-600 ">
              {section.subSection &&
                section.subSection.map((subsection) => (
                  <div className=" flex flex-row  p-4 items-center gap-1 ">
                    {" "}
                    <IoVideocam color="#44E4BF" />
                    {subsection.title}
                  </div>
                ))}
            </div>
          </details> */
