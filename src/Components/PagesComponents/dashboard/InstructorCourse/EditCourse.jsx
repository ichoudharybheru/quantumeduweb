import React, { useEffect, useState } from "react";
import Spinner from "../../../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import RenderStep from "../../../PagesComponents/dashboard/add_Course/RenderStep";
import {
  setCourse,
  setEditCourse,
} from "../../../../redux/slices/coursesSlice";

import { getCourseAllDetails } from "../../../../services/operations/coursesDetailAPI";
import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const { token } = useSelector((state) => state.auth);

  const fetchcourse = async () => {
    setLoading(true);
    let result = await getCourseAllDetails(courseId);

    if (result) {
      dispatch(setCourse(result));
      dispatch(setEditCourse(true));
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchcourse();
    console.log(course);
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const result = await getFullDetailsOfCourse(courseId, token);
  //     if (result?.courseDetails) {
  //       dispatch(setEditCourse(true));
  //       dispatch(setCourse(result?.courseDetails));
  //     }
  //     setLoading(false);
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <div className="text-white text-xl font-semibold italic">
        <p>Edit Course</p>
      </div>
      <div className="w-full h-[1px] bg-richblack-300 my-3"></div>
      {loading ? (
        <div className="flex items-center mt-40 mx-40">
          {" "}
          <Spinner></Spinner>
        </div>
      ) : course ? (
        <RenderStep></RenderStep>
      ) : (
        <div className="text-white text-xl font-semibold italic">No Course</div>
      )}
    </div>
  );
};

export default EditCourse;
