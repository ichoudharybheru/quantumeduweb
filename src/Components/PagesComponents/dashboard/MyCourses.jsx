import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { getInstructorCourses } from "../../../services/operations/coursesDetailAPI";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import CoursesTable from "./InstructorCourse/CoursesTable";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const getAllcourse = async () => {
    let result = await getInstructorCourses(token);
    if (result) {
      setCourses(result);
      console.log(result);
    }
  };
  useEffect(() => {
    getAllcourse();
  }, []);
  return (
    <div>
      <div>
        <div className=" text-white flex justify-between items-center">
          <p className=" italic text-2xl font-semibold ">My Courses</p>
          <Link to={"/dashboard/add-course"}>
            <button className="flex flex-row gap-x-1 bg-caribbeangreen-200 items-center p-3 rounded">
              <p>Add Course</p>
              <FiPlus size={24} />
            </button>
          </Link>
        </div>
        <div className=" h-[2px] bg-richblack-200 w-full mt-4"></div>
        <div className="text-white">
          {courses.length > 0 ? (
            <CoursesTable courses={courses} setCourses={setCourses} />
          ) : (
            <div>
              <p>not courses</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
