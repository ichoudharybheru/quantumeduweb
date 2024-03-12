import React, { useEffect, useState } from "react";
import { getAllCourse } from "../../../services/operations/coursesDetailAPI";
import CourseSlider from "../Category/CourseSlider";
const MoreCourse = ({ instructorId, courseId }) => {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    let result = await getAllCourse();
    if (result) {
      let newCourses = result.filter((course) => {
        return (
          course._id !== courseId && course.instructor._id === instructorId
        );
      });
      setCourses(newCourses);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, [courseId, instructorId]);
  return (
    <div>{courses && <CourseSlider Courses={courses}></CourseSlider>}</div>
  );
};

export default MoreCourse;
