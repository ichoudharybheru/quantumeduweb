import React from "react";

import HomeCourseCard from "./HomeCourseCard";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Import Swiper styles

import "swiper/css/effect-coverflow";

// import required modules

const HomeCourseSlide = ({ Courses }) => {
  // console.log("HomeCourseSlide", Courses);
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        speed={3000}
        spaceBetween={25}
        loop={true}
        modules={[EffectCoverflow, Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-h-[30rem] mySwiper"
      >
        {Courses?.map((course, index) => (
          <SwiperSlide key={index}>
            <HomeCourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCourseSlide;
