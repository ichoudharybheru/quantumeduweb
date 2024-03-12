import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import { getFullDetailsOfCourse } from "../../../../services/operations/coursesDetailAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const EnrolledCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [courseD, setCourseD] = useState(null);
  let res;
  const { token } = useSelector((state) => state.auth);
  const fetchFullcourseDetails = async () => {
    res = await getFullDetailsOfCourse(course._id, token);
    if (res) {
      setCourseD(res);
    }
  };
  useEffect(() => {
    fetchFullcourseDetails();
    //  console.log("courseD", courseD);
    //   console.log("section", courseD?.courseContent?.[0]?._id);
  }, []);
  return (
    <>
      <div className=" flex-row flex">
        <div
          className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
          onClick={() => {
            navigate(
              `/view-course/${course?._id}/section/${courseD.courseDetails.courseContent?.[0]?._id}/sub-section/${courseD.courseDetails.courseContent?.[0]?.subSection?.[0]?._id}`
            );
          }}
        >
          <img
            src={course.thumnail}
            alt="course_img"
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div className="flex max-w-xs flex-col gap-2">
            <p className="font-semibold">{course.courseName}</p>
            <p className="text-xs text-richblack-300">
              {course.courseDescripation.length > 50
                ? `${course.courseDescripation.slice(0, 50)}...`
                : course.courseDescripation}
            </p>
          </div>
        </div>
        <div className="w-1/4 px-2 py-3">{courseD?.totalDuration || 0}</div>
        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
          <p>Progress: {courseD?.progressPercentage || 0}%</p>
          <ProgressBar
            completed={courseD?.progressPercentage || 0}
            height="8px"
            isLabelVisible={false}
          />
        </div>
      </div>
    </>
  );
};

export default EnrolledCourseCard;
