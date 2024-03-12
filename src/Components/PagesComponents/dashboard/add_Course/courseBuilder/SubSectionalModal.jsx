import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import {
  updateSubSection,
  createSubSection,
} from "../../../../../services/operations/sectionAndSubSectionApi";
import { setCourse } from "../../../../../redux/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Upload from "../Upload";
const SubSectionalModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lessonTitle", modalData.title);
      setValue("lessonDescripation", modalData.descripation);
      setValue("lessonVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lessonTitle !== modalData.title ||
      currentValues.lessonDescripation !== modalData.descripation ||
      currentValues.lessonVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async (data) => {
    if (view) {
      return;
    } else if (edit) {
      if (isFormUpdated()) {
        const formData = new FormData();
        const currentValues = getValues();
        if (currentValues.lessonTitle !== modalData.title) {
          formData.append("title", data.lessonTitle);
        }
        if (currentValues.lessonDescripation !== modalData.descripation) {
          formData.append("descripation", data.lessonDescripation);
        }
        if (currentValues.lessonVideo !== modalData.videoUrl) {
          formData.append("lessonVideo", data.lessonVideo);
        }
        formData.append("subSectionId", modalData._id);
        formData.append("sectionId", modalData.sectionId);

        const result = await updateSubSection(formData, token);
        if (result) {
          // console.log("result", result)
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? result : section
          );
          const updatedCourse = {
            ...course,
            courseContent: updatedCourseContent,
          };
          dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
      } else {
        toast.error("No changes made to the Lesson info");
      }
    } else {
      const formData = new FormData();
      formData.append("title", data.lessonTitle);
      formData.append("descripation", data.lessonDescripation);
      formData.append("lessonVideo", data.lessonVideo);
      formData.append("sectionId", modalData);
      const result = await createSubSection(formData, token);
      if (result) {
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
      }
      setModalData(null);
    }
  };

  return (
    <div className=" bg-richblack-700  rounded m-1 border border-richblack-50">
      <div className=" text-caribbeangreen-100 flex justify-between px-4 pt-3 text-2xl items-center ">
        {view ? (
          <p>Viewing Lesson</p>
        ) : add ? (
          <p>Adding Lesson</p>
        ) : edit ? (
          <p>Editing Lesson</p>
        ) : (
          <></>
        )}
        <button
          type="button"
          onClick={() => {
            setModalData(null);
            console.log("Closing modal");
          }}
        >
          <IoCloseSharp />
        </button>
      </div>
      <form
        className=" bg-richblack-700 p-6 rounded space-y-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-1">
          <label htmlFor="lessonTitle" className="flex flex-row">
            <p>Lesson Title{!view && <sup className="text-pink-200">*</sup>}</p>
          </label>
          <input
            disabled={view}
            id="lessonTitle"
            type="text"
            name="lessonTitle"
            placeholder="Enter Course Title"
            {...register("lessonTitle", { required: true })}
            className={`w-full p-2 rounded   ${
              view
                ? " text-richblack-25 bg-richblack-600"
                : "text-richblack-500"
            }`}
          />
          {errors.courseTitle && (
            <span className=" contactus-error text-xs">
              Course title is required**
            </span>
          )}
        </div>
        <Upload
          name="lessonVideo"
          register={register}
          errors={errors}
          label="Video"
          setValue={setValue}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        ></Upload>
        <div className="space-y-1">
          <label htmlFor="lessonDescripation" className="flex flex-row">
            <p>
              Lesson Descripation{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </p>
          </label>
          <textarea
            disabled={view}
            id="lessonDescripation"
            type="text"
            name="lessonDescripation"
            placeholder="Enter Course Description"
            {...register("lessonDescripation", { required: true })}
            className={`w-full p-2 min-h-[140px] rounded   ${
              view
                ? " text-richblack-25 bg-richblack-600"
                : "text-richblack-500"
            }`}
          />
          {errors.lessonDescripation && (
            <span className=" contactus-error text-xs">
              Lesson Descripation is required**
            </span>
          )}
        </div>

        {!view ? (
          <div className="flex justify-end">
            <button className="px-3 py-1 rounded bg-caribbeangreen-100">
              {add ? <p>Save</p> : <p>Save Changes</p>}
            </button>
          </div>
        ) : (
          <button></button>
        )}
      </form>
    </div>
  );
};

export default SubSectionalModal;
