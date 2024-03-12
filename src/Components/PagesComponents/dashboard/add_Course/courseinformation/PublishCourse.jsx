import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../../../redux/slices/coursesSlice";
import { setCourse } from "../../../../../redux/slices/coursesSlice";
import { useForm } from "react-hook-form";
import { resetCourseState } from "../../../../../redux/slices/coursesSlice";

import { updateCourse } from "../../../../../services/operations/coursesDetailAPI";
import { useNavigate } from "react-router-dom";
const PublishCourse = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onBack = () => {
    dispatch(setStep(2));
  };
  const { course } = useSelector((state) => state.course);

  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (course?.status === "Published") {
      setValue("public", true);
    }
  }, []);

  const goToMyCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      (currentValues.public && course.status === "Published") ||
      (!currentValues.public && course.status === "Draft")
    ) {
      return false;
    }
    return true;
  };
  const onFormSubmit = async (data) => {
    if (isFormUpdated()) {
      const formData = new FormData();
      const currentValues = getValues();
      currentValues.public
        ? formData.append("status", "Published")
        : formData.append("status", "Draft");
      formData.append("courseId", course._id);

      const result = await updateCourse(formData, token);
      if (result) {
        // dispatch(setStep(2));
        dispatch(setCourse(result));
      }
    } else {
      console.log(" not updated");
    }
    goToMyCourse();
    return;
  };
  return (
    <div className=" bg-richblack-800 p-6 rounded text-white">
      <div>
        <p className=" text-2xl font-semibold italic">Publish Setting</p>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="my-6 mb-8">
            <label
              htmlFor="public"
              className="inline-flex items-center text-lg"
            >
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
              />
              <span className="ml-2 text-richblack-400">
                Make this course as public
              </span>
            </label>
          </div>
          <div className=" flex justify-end gap-x-3">
            <button
              type="button"
              className=" px-3 py-1 rounded bg-richblack-400"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-caribbeangreen-100"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishCourse;
