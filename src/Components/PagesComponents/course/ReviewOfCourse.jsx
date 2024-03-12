import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { FaStar } from "react-icons/fa6";
const ReviewOfCourse = ({ courseReviews }) => {
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
        {courseReviews?.map((review) => (
          <SwiperSlide>
            <div className=" bg-richblack-800 p-4 flex flex-col gap-y-5">
              <div className="flex flex-row items-center gap-6">
                <img
                  src={review.user.Image}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className=" text-white">
                  {review.user.firstName + " " + review?.user?.lastName}
                </div>
              </div>
              <p className="font-medium text-richblack-25">
                {review?.reviews.split(" ").length > 25
                  ? `${review?.reviews.split(" ").slice(0, 25).join(" ")} ...`
                  : `${review?.reviews}`}
              </p>
              <div className=" flex flex-row items-center gap-x-2">
                <h1 className=" text-yellow-100">{review.rating}</h1>
                <div className=" flex flex-row">
                  {[...Array(5)].map((star, index) => {
                    const indx = index + 1;
                    return (
                      <div key={index}>
                        {" "}
                        <FaStar
                          className={` ${
                            indx <= review.rating
                              ? " text-yellow-100"
                              : "text-richblack-500"
                          }`}
                        ></FaStar>
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

export default ReviewOfCourse;
