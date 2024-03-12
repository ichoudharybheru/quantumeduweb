import React, { useEffect, useState } from "react";
import { getAllEnrollCourse } from "../../../services/operations/profileApi";
import { useSelector } from "react-redux";

import EnrolledCourseCard from "./EnrolledCourses/EnrolledCourseCard";
const EnrolledCourses = () => {
  //const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const fetchData = async () => {
    try {
      //setLoading(true);
      const res = await getAllEnrollCourse(token);

      if (res) {
        setEnrolledCourses(res);
        // console.log(res);
      }
    } catch (error) {
      console.error("Error while fetching enrolled courses:", error);
    } finally {
      //  setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" text-white">
      <div>
        <p className=" text-white text-2xl pb-4 ">Enrolled Courses</p>
      </div>
      <div className="flex flex-col border border-richblack-300 rounded ">
        <div className="flex flex-row bg-richblack-700 p-3 justify-between border rounded-t">
          <p>Course Name</p>
          <p>Duration</p>
          <p>Progress</p>
        </div>
        <div>
          {!enrolledCourses ? (
            <div>loading</div>
          ) : !enrolledCourses.length ? (
            <div className=" text-center pt-9 pb-9">
              You have not enrolled in any course yet.
            </div>
          ) : (
            <div>
              {enrolledCourses?.map((course, i) => (
                <>
                  <EnrolledCourseCard course={course} key={course._id} />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
