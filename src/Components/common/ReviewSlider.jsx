import React, { useEffect, useState } from "react";
import { getAllRatingAndReviews } from "../../services/operations/coursesDetailAPI";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { FaStar } from "react-icons/fa6";
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAllRatingAndReviews();
      if (response) {
        //    console.log("rating", response);
        setReviews(response);
      }
    })();
  }, []);
  if (reviews.length === 0) {
    return <div className=" text-white">No review till now</div>;
  }
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        modules={[FreeMode, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
        }}
        // className="max-h-[30rem]"
      >
        {reviews?.map((review, index) => (
          <SwiperSlide>
            <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 max-w-maxContent  rounded">
              <div className="flex items-center gap-4">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                  <h2 className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                  </h2>
                </div>
              </div>
              <p className="font-medium text-richblack-25">
                {review?.reviews.split(" ").length > 25
                  ? `${review?.reviews.split(" ").slice(0, 25).join(" ")} ...`
                  : `${review?.reviews}`}
              </p>
              <div className="flex items-center gap-2 ">
                <h3 className="font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </h3>
                <div className=" flex flex-row">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <div key={index}>
                        <FaStar
                          size={18}
                          className={` ${
                            currentRating <= review.rating
                              ? "text-yellow-100"
                              : "text-richblack-500"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ReviewSlider;
