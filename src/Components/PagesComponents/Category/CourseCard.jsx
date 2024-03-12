import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tutotr from "../.././../assets/Images/Tutotr.png";
import { getAvgRating } from "../../../services/operations/coursesDetailAPI";
import RatingStars from "../../common/RatingStars";
const CourseCard = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const fetchAVGrating = async () => {
    const response = await getAvgRating(course._id);
    setAvgReviewCount(response.averageRating);
    //console.log("avgratign", response.averageRating);
  };

  useEffect(() => {
    fetchAVGrating();
  }, []);

  return (
    <div>
      {course && (
        <Link to={`/courses/${course._id}`}>
          <div>
            <div className="rounded-lg">
              <img
                alt=""
                src={course.thumnail ? course.thumnail : Tutotr}
                className={`$ h-[250px] w-full rounded-xl object-cover `}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div
              className="text-white flex flex-row gap-x-2 items-center
          "
            >
              {" "}
              <span className=" text-yellow-100">{avgReviewCount}</span>
              <div>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              </div>
              <p className="text-richblack-400">
                {course?.ratingAndReviews.length} Rating
              </p>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
