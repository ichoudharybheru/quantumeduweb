import React, { useEffect, useState } from "react";
import { getCourseAllDetails } from "../services/operations/coursesDetailAPI";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Components/common/Spinner";
import { getAvgRating } from "../services/operations/coursesDetailAPI";
import RatingStars from "../Components/common/RatingStars";
import { FiAlertTriangle } from "react-icons/fi";
import { formatDate } from "../services/operations/formatDate";
import { MdOutlineLanguage } from "react-icons/md";
import Tutotr from "../assets/Images/Tutotr.png";
import { FaBookmark } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";
import ReviewOfCourse from "../Components/PagesComponents/course/ReviewOfCourse";
import MoreCourse from "../Components/PagesComponents/course/MoreCourse";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishList } from "../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import { capturePayment } from "../services/operations/payment";

import CourseContentInfo from "../Components/PagesComponents/course/CourseContentInfo";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const { courseId } = useParams();
  const [wishList, setWishList] = useState(false);
  const [isActive, setIsActive] = useState([]);

  const buyHanler = async (courseId) => {
    if (user == null) {
      toast.error("PLEASE LOG IN");
      navigate("/login");
    }
    if (user.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    await capturePayment(
      { courses: [courseId] },
      token,
      user,
      dispatch,
      navigate
    );
  };
  const handleActive = (id) => {
    if (isActive.includes(id)) {
      setIsActive(isActive.filter((e) => e !== id));
      // console.log("filter");
    } else {
      setIsActive(isActive.concat([id]));
    }
  };
  const fetchcourse = async () => {
    setLoading(true);
    let result = await getCourseAllDetails(courseId);

    if (result) {
      setCourse(result);
      // console.log("getCourseAllDetails", result);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchcourse();
  }, []);

  const fetchAVGrating = async () => {
    const response = await getAvgRating(courseId);
    setAvgReviewCount(response.averageRating);
    //console.log("avgratign", response.averageRating);
  };

  useEffect(() => {
    fetchAVGrating();
  }, []);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    if (course) {
      let lectures = 0;
      course.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0;
      });
      setTotalNoOfLectures(lectures);
    }
  }, [course]);
  if (loading || !course) {
    return (
      <div className=" grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" bg-richblack-800 ">
        <div className=" relative flex min-h-[318px]  mx-auto flex-col lg:flex-row gap-x-6 py-12 px-28 items-center">
          <div className="  h-[254px] flex flex-col gap-y-3">
            <p className=" text-white text-4xl font-semibold uppercase">
              {course.courseName}
            </p>
            <p className="text-white text-xl">{course.courseDescripation}</p>
            <div className="flex flex-row gap-x-2 items-center">
              <span className=" text-yellow-100">{avgReviewCount}</span>
              <div>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              </div>
              <p className="text-caribbeangreen-100 ">
                ({course?.ratingAndReviews.length} Rating)
              </p>
              <p className="text-white ">
                {course?.studentEnrolled.length} students enrolled
              </p>
            </div>
            <p
              className="text-white text-lg
            "
            >
              Created By: {course?.instructor?.firstName}{" "}
              {course?.instructor?.lastName}
            </p>
            <div
              className="text-white flex flex-row items-center gap-1
            "
            >
              {" "}
              <p>
                <FiAlertTriangle />
              </p>
              <p>Created at {formatDate(course.createdAt)}</p>
              <p className="flex text-white flex-row gap-1 items-center ">
                <MdOutlineLanguage />
                English
              </p>
            </div>
          </div>

          <div className=" lg:absolute flex w-[400px] p-4 min-h-min-[100px] rounded bg-richblack-700 right-20 top-10  flex-col gap-y-3 ">
            <div className="mx-auto">
              <img
                alt=""
                src={Tutotr}
                height={300}
                width={350}
                className={`$  rounded-xl object-cover `}
              />
            </div>
            <div className=" flex flex-row justify-between text-2xl">
              <p className=" text-white">Rs. {course.price}</p>
              <button
                className=" text-caribbeangreen-100"
                onClick={() => {
                  if (user == null) {
                    toast.error("PLEASE LOG IN");
                    navigate("/login");
                  }
                  if (user.accountType === "Student") {
                    setWishList(true);
                    dispatch(addToWishList(course));
                  } else {
                    toast.error(
                      "You are an Instructor. You can't buy a course."
                    );
                  }
                }}
              >
                {wishList ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
            <button
              className=" w-full rounded bg-caribbeangreen-100 p-3 font-bold"
              onClick={() => buyHanler(courseId)}
            >
              Buy Now
            </button>
            <button
              className=" w-full rounded text-white bg-richblack-600 p-3 font-bold"
              onClick={() => {
                if (user == null) {
                  toast.error("PLEASE LOG IN");
                  navigate("/login");
                }
                if (user.accountType === "Student") {
                  dispatch(addToCart(course));
                } else {
                  toast.error("You are an Instructor. You can't buy a course.");
                }
              }}
            >
              Add to Cart
            </button>
            <p className=" text-center text-richblack-50 text-sm">
              30-Day Money-Back Guarantee
            </p>
            <div>
              {course.instructions.map((one, i) => (
                <p
                  key={i}
                  className="flex flex-row  items-center gap-2 text-brown-300 "
                >
                  <VscActivateBreakpoints />
                  <p className="break-all">{one}</p>
                </p>
              ))}
            </div>
            <button className=" mx-auto text-caribbeangreen-200 flex flex-row items-center gap-1">
              {" "}
              <FaShare /> Share
            </button>
            <p></p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 text-white border border-richblack-600 min-w-fit lg:w-[700px] break-all ml-32 p-6 mt-9 box-content ">
        <h1 className="text-3xl  font-bold">What you'll learn</h1>
        <p>{course?.whatWillYouLearn}</p>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] mt-5">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <h1 className="text-white text-4xl font-bold ">Course Content</h1>
          <div className="mt-3 flex flex-row justify-between">
            <div className="text-white flex flex-row gap-x-2">
              <p>{course.courseContent.length}Section(s)</p>
              <p>{totalNoOfLectures} Lesson(s)</p>
            </div>
            <button
              className=" text-caribbeangreen-200"
              onClick={() => setIsActive([])}
            >
              {" "}
              Collapse all sections
            </button>
          </div>
          <div>
            {course.courseContent &&
              course.courseContent.map((section) => (
                <CourseContentInfo
                  section={section}
                  isActive={isActive}
                  handleActive={handleActive}
                  key={section._id}
                />
              ))}
          </div>
          <div className=" mt-3">
            <h1 className=" text-white text-3xl font-bold">Author</h1>
            <div className=" flex items-center flex-row gap-x-3 mt-3">
              <img
                alt=""
                src={course.instructor.Image}
                height={50}
                width={50}
                className=" rounded-full"
              />
              <p className="  text-md text-pink-200 w-40% p-1 brea">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
            </div>
            <p className=" text-white w-[70%]  break-all mt-2">
              {course.instructor.additionALDetails.about}
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-24">
        {" "}
        <h1 className=" text-center text-white text-3xl">
          Reviews from Students
        </h1>
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          {course.ratingAndReviews.length > 0 ? (
            <>
              <ReviewOfCourse courseReviews={course.ratingAndReviews} />
            </>
          ) : (
            <p className=" text-center text-blue-200 text-3xl ">
              No Reviews Till Now
            </p>
          )}
        </div>
        <h1 className=" text-center text-white text-3xl">
          More Courses by {course?.instructor?.firstName}{" "}
          {course?.instructor?.lastName}
        </h1>
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          {1 ? (
            <MoreCourse
              instructorId={course.instructor._id}
              courseId={course._id}
            />
          ) : (
            <p className=" text-center text-blue-200 text-3xl ">
              No More Courses
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
