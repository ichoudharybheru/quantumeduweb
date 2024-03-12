import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/sectionAndSubSectionApi";
import NestedView from "./NestedView";
import {
  setStep,
  setCourse,
  setEditCourse,
} from "./../../../../../redux/slices/coursesSlice";
import toast from "react-hot-toast";
const CourseBuilderForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();
  const cancleEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };
  const onFormSubmit = async (data) => {
    if (editSectionName) {
      const formData = new FormData();
      formData.append("sectionName", data.sectionName);
      formData.append("courseId", course._id);
      formData.append("sectionId", editSectionName);
      let result = await updateSection(formData, token);
      if (result) {
        dispatch(setCourse(result));
        //console.log(course.courseContent.sectionName);
        console.log("result", result);
        setValue("sectionName", "");
      }
      setEditSectionName(null);
    } else {
      const formData = new FormData();
      formData.append("sectionName", data.sectionName);
      formData.append("courseId", course._id);
      let result = await createSection(formData, token);
      if (result) {
        dispatch(setCourse(result));
        //console.log(course.courseContent.sectionName);
        console.log("result", result);
        setValue("sectionName", "");
      }
      // console.log("course", course);
    }
  };
  const onBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const onNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Atleast one section is required");
      return;
    }
    for (let section of course.courseContent) {
      if (section.subSection.length === 0) {
        toast.error("At least One Subsection is required");
        return;
      }
    }

    dispatch(setStep(3));
  };

  const handleForEditSection = (sectionName, sectionId) => {
    if (editSectionName === sectionId) {
      cancleEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };
  return (
    <div className=" text-richblack-5  bg-richblack-800 p-6 rounded space-y-4">
      <p className=" text-2xl font-bold italic">Course Builder</p>
      <form
        className=" bg-richblack-800 p-6 rounded border   border-richblack-700 space-y-4"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="space-y-1">
          <label htmlFor="sectionName" className="flex flex-row">
            <p>
              Section Name <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <input
            id="sectionName"
            type="text"
            name="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            className=" w-full p-2 rounded  text-richblack-500"
          />
          {errors.sectionName && (
            <span className=" contactus-error text-xs">
              Course title is required**
            </span>
          )}
        </div>
        <div className="flex flex-row gap-x-3 items-end">
          {" "}
          <button
            type="submit"
            className=" text-center border border-dashed border-caribbeangreen-200 text-caribbeangreen-200 rounded p-2 flex flex-row gap-x-2 items-center"
          >
            {editSectionName ? <p>Edit Section Name</p> : <p>Create section</p>}{" "}
            <IoIosAddCircleOutline size={24} />
          </button>
          {editSectionName && (
            <button
              className=" text-richblack-400 underline"
              onClick={cancleEdit}
            >
              {" "}
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <div>
        {course.courseContent.length > 0 && (
          <NestedView handleForEditSection={handleForEditSection} />
        )}
      </div>
      <div className=" flex justify-end gap-x-3">
        <button
          className=" px-3 py-1 rounded bg-richblack-400"
          onClick={onBack}
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-3 py-1 rounded bg-caribbeangreen-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
