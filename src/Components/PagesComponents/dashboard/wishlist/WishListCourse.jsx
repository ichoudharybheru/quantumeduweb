import React, { useEffect, useState } from "react";
import Tutotr from "../../../../assets/Images/Tutotr.png";
import { getAvgRating } from "../../../../services/operations/coursesDetailAPI";
import RatingStars from "../../../common/RatingStars";
import { RiDeleteBinLine } from "react-icons/ri";
import { addToCart } from "../../../../redux/slices/cartSlice";
import { removeFromWishList } from "../../../../redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";

const WishListCourse = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const dispatch = useDispatch();
  const fetchAVGrating = async () => {
    const response = await getAvgRating(course._id);
    setAvgReviewCount(response.averageRating);
    //console.log("avgratign", response.averageRating);
  };

  useEffect(() => {
    fetchAVGrating();
  }, []);
  return (
    <div className=" flex flex-row justify-between pr-24 border-b pb-1 border-richblack-400 ">
      <div className=" flex flex-row gap-x-3 ">
        <div>
          <img
            alt=""
            src={Tutotr}
            height={200}
            width={250}
            className={`$  rounded-xl object-cover `}
          />
        </div>
        <div className=" text-richblack-25">
          <p>{course.courseName}</p>
          <div
            className="text-white flex flex-row gap-x-2 items-center justify-center
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
          <p>{course.category.name}</p>
        </div>
      </div>
      <div className=" flex flex-col text-white justify-evenly items-center">
        <button
          className=" border text-pink-600 border-richblack-25 py-2 px-4 rounded flex flex-row items-center gap-x-2"
          onClick={() => {
            dispatch(removeFromWishList(course._id));
          }}
        >
          <RiDeleteBinLine /> Remove
        </button>
        <p className=" text-3xl">Rs.{course.price}</p>
        <button
          className=" bg-caribbeangreen-200 py-2 px-4 rounded"
          onClick={() => {
            dispatch(removeFromWishList(course._id));

            dispatch(addToCart(course));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishListCourse;
