import React from "react";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Tutotr from "../../../../assets/Images/Tutotr.png";
import { RiDraftLine } from "react-icons/ri";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getInstructorCourses } from "../../../../services/operations/coursesDetailAPI";
import { useNavigate } from "react-router-dom";

import { deleteCourse } from "../../../../services/operations/coursesDetailAPI";
import { formatDate } from "../../../../services/operations/formatDate";
const CoursesTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  console.log("table", courses);

  const TRUNCATE_LENGTH = 30;
  const navigate = useNavigate();

  const handleDeleteCourse = async (courseId) => {
    let res = await deleteCourse({ courseId, token });
    if (res) {
      let result = await getInstructorCourses(token);
      setCourses(result);
    }
  };

  return (
    <div>
      <Table className="rounded-xl border border-richblack-800 mt-5">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 ">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className=" text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className=" text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className=" text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course) => (
            <Tr
              key={course._id}
              className="flex gap-x-16 border-b border-richblack-800 px-6 py-8 "
            >
              <Td className="flex flex-1 gap-x-4">
                <img
                  src={course.thumnail ? course.thumnail : Tutotr}
                  alt="course img"
                  className="h-[150px] w-[220px] rounded-lg object-cover"
                ></img>
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescripation.split(" ").length >
                    TRUNCATE_LENGTH
                      ? course.courseDescripation
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : course.courseDescripation}
                  </p>
                  <p className="text-[12px] text-white">
                    Created:
                    {formatDate(course.createdAt)}
                  </p>
                  <div>
                    {course.status === "Draft" ? (
                      <div className="flex flex-row text-pink-100 items-center text-xs gap-x-1 bg-richblack-500 px-1 py-[1px] rounded-full">
                        <RiDraftLine />
                        <p>DRAFTED</p>
                      </div>
                    ) : (
                      <div className="flex flex-row text-caribbeangreen-100  items-center text-xs gap-x-1 bg-richblack-500 px-1 py-[1px] rounded-full">
                        <MdOutlinePublishedWithChanges />
                        <p>PUBLISHED</p>
                      </div>
                    )}
                  </div>
                </div>
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                <p>2h:30m</p>
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                ₹{course.price}
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                <button
                  className="px-2 transition-all duration-200 hover:scale-125 hover:text-caribbeangreen-300"
                  onClick={() => {
                    navigate(`/dashboard/edit-course/${course._id}`);
                  }}
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="px-1 transition-all duration-200 hover:scale-125 hover:text-[#ff0000]"
                >
                  <RiDeleteBinLine />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default CoursesTable;
