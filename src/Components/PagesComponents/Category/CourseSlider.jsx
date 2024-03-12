import React from "react";
import CourseCard from "./CourseCard";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";
const CourseSlider = ({ Courses }) => {
  // console.log(Courses);
  return (
    <div className="mt-2">
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        modules={[FreeMode, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-h-[30rem]"
      >
        {Courses?.map((course) => (
          <SwiperSlide>
            {" "}
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseSlider;

// const CourseSlider = ({ Courses }) => {
//   return (
//     <div>
//       <div>
//         {Courses.course && (
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={25}
//             loop={true}
//             modules={[FreeMode, Pagination]}
//             breakpoints={{
//               1024: {
//                 slidesPerView: 3,
//               },
//             }}
//             className="max-h-[30rem]"
//           >
//             {Courses.course?.map((course, i) => (
//               <SwiperSlide key={i}>
//                 <CourseCard course={course} Height={"h-[250px]"} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSlider;
