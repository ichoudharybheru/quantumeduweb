import React, { useState } from "react";
import ViewCourseBar from "../Components/PagesComponents/viewcourse/ViewCourseBar";
import { Outlet } from "react-router-dom";
import ReviewModal from "../Components/PagesComponents/viewcourse/ReviewModal";
const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);

  return (
    <>
      <div className=" relative flex  min-h-[calc(100vh-3.5rem)] ">
        <ViewCourseBar setReviewModal={setReviewModal} />
        <div className=" h-[calc(100vh-3.5rem)] overflow-auto flex-1">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
