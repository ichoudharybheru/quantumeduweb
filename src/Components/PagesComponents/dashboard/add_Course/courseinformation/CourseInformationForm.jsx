import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import RequirementFeild from "./RequirementFeild";
import CourseTag from "./CourseTag";
import { getAllTag } from "../../../../../services/operations/coursesDetailAPI";
import { TbPlayerTrackNext } from "react-icons/tb";
import { setCourse, setStep } from "../../../../../redux/slices/coursesSlice";
import {
  createNewCourse,
  updateCourse,
} from "../../../../../services/operations/coursesDetailAPI";
import toast from "react-hot-toast";
import Upload from "../Upload";
import Spinner from "../../../../common/Spinner";
const CourseInformationForm = () => {
  const [Categories, setCategory] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const Courselevel = [
    {
      id: 1,
      title: "Beginner",
    },
    {
      id: 2,
      title: "Intermediate",
    },
    {
      id: 3,
      title: "Advance",
    },
  ];

  const lang = [
    {
      id: 1,
      title: "Hindi",
    },
    {
      id: 2,
      title: "English",
    },
  ];

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllTag();
      if (categories.allCategory.length > 0) {
        // console.log("categories", categories)
        setCategory(categories.allCategory);
      }
    };
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescripation);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatWillYouLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumnail);
    }
    getCategories();
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescripation ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatWillYouLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumnail
    ) {
      return true;
    }
    return false;
  };
  const submitCourseForm = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescripation) {
          formData.append("courseDescripation", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatWillYouLearn) {
          formData.append("whatWillYouLearn", data.courseBenefits);
        }
        if (currentValues.courseImage !== course.thumnail) {
          formData.append("thumnail", data.courseImage);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        formData.append("courseId", course._id);
        setLoading(true);
        console.log(data);
        const result = await updateCourse(formData, token);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
          console.log(result);
          console.log(course.courseDescripation);
          console.log(course.price);
        }
        setLoading(false);
      } else {
        toast.error("No changes made to the course info");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescripation", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatWillYouLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", "Draft");
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumnail", data.courseImage);

    setLoading(true);
    const result = await createNewCourse(formData, token);
    console.log(result);
    if (result) {
      console.log("111");
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log(course.price);
  };
  if (loading) {
    return (
      <div className=" flex justify-center items-center">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div className="text-white">
      <form
        onSubmit={handleSubmit(submitCourseForm)}
        className=" bg-richblack-800 p-6 rounded space-y-4"
      >
        <div className="space-y-1">
          <label htmlFor="courseTitle" className="flex flex-row">
            <p>
              Course Title <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <input
            id="courseTitle"
            type="text"
            name="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className=" w-full p-2 rounded  text-richblack-500"
          />
          {errors.courseTitle && (
            <span className=" contactus-error text-xs">
              Course title is required**
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="courseShortDesc" className="flex flex-row">
            <p>
              Course Descripation <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <textarea
            id="courseShortDesc"
            type="text"
            name="courseShortDesc"
            placeholder="Enter Course Description"
            {...register("courseShortDesc", { required: true })}
            className=" w-full p-2 min-h-[140px] rounded  text-richblack-500"
          />
          {errors.courseShortDesc && (
            <span className=" contactus-error text-xs">
              Course Descripation is required**
            </span>
          )}
        </div>
        <div className="space-y-1 relative">
          <label htmlFor="coursePrice" className="flex flex-row">
            <p>
              Course Price <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <input
            id="coursePrice"
            type="number"
            name="coursePrice"
            placeholder="Enter Course price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className=" pl-9 w-full p-2 rounded  text-richblack-500"
          />
          <FaIndianRupeeSign
            size={25}
            className=" absolute top-[32px] left-1 text-richblack-500"
          />
          {errors.coursePrice && (
            <span className=" contactus-error text-xs">
              Course Price is required**
            </span>
          )}
        </div>

        <div className=" space-y-1">
          <label htmlFor="" className="flex flex-row">
            <p>
              Course Category
              <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            name="courseCategory"
            className=" w-full p-2 rounded  text-richblack-500"
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {Categories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          {errors.courseCategory && (
            <span className=" contactus-error text-xs">
              Course Category is required**
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="courseLevel" className="flex flex-row">
            <p>
              Course Level
              <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <select
            id="courseLevel"
            defaultValue={Courselevel[0].title}
            name="courseLevel"
            className=" w-full p-2 rounded  text-richblack-500"
            {...register("courseLevel", { required: true })}
          >
            <option value="" disabled>
              Choose a level
            </option>
            {Courselevel.map((link) => (
              <option value={link.id} key={link.id}>
                {link.title}
              </option>
            ))}
          </select>
          {errors.Courselevel && (
            <span className=" contactus-error text-xs">
              Course level is required**
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="courseLanguage" className="flex flex-row">
            <p>
              Course Language
              <sup className="text-pink-200">*</sup>{" "}
            </p>
          </label>
          <select
            id="courseLanguage"
            defaultValue={lang[1].title}
            className=" w-full p-2 rounded  text-richblack-500"
            {...register("courseLanguage", { required: true })}
          >
            <option value="" disabled>
              Choose a Language
            </option>
            {lang.map((link) => (
              <option value={link.id} key={link.id}>
                {link.title}
              </option>
            ))}
          </select>
          {errors.courseLanguage && (
            <span className=" contactus-error text-xs">
              Course Language is required**
            </span>
          )}
        </div>
        <CourseTag
          name="courseTags"
          register={register}
          errors={errors}
          label="Tags"
          setValue={setValue}
          getValues={getValues}
        />
        <div>
          <Upload
            name="courseImage"
            register={register}
            errors={errors}
            label="Course Thumbnail"
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className="space-y-1">
          <label className="flex flex-row">
            <p>
              Benefits of the course <sup className="text-pink-200">*</sup>
            </p>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of courses"
            {...register("courseBenefits", { required: true })}
            className=" w-full p-2 min-h-[140px] rounded  text-richblack-500"
          />
          {errors.courseBenefits && (
            <span className=" contactus-error text-xs">
              Course Benefits is required**
            </span>
          )}
        </div>
        <div>
          <RequirementFeild
            name="courseRequirements"
            register={register}
            errors={errors}
            label="Requirements/Instructions"
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              type="button"
              onClick={() => dispatch(setStep(2))}
              className=" text-center bg-caribbeangreen-100 rounded p-2"
            >
              continue without saving
            </button>
          )}
          <button
            // type="submit"
            className=" text-center bg-caribbeangreen-100 rounded p-2 flex flex-row gap-x-2 items-center"
          >
            {!editCourse ? "Next" : "Save Changes"} <TbPlayerTrackNext />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
