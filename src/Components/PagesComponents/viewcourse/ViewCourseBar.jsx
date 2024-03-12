import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../../../services/operations/coursesDetailAPI";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoMdLaptop } from "react-icons/io";
import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
} from "../../../redux/slices/viewCourse";
const ViewCourseBar = ({ setReviewModal }) => {
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubSection, setActiveSubSection] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, sectionId, subSectionId } = useParams();
  const fetchFullcourseDetails = async () => {
    const res = await getFullDetailsOfCourse(courseId, token);
    if (res) {
      dispatch(setCompletedLectures(res.courseProgress?.completedVideos || []));

      dispatch(setTotalNoOfLectures(res.totalNoOfLectures));

      dispatch(setEntireCourseData(res.courseDetails));
      dispatch(setCourseSectionData(res.courseDetails?.courseContent));
    }
  };

  useEffect(() => {
    fetchFullcourseDetails();
  }, []);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveSection(courseSectionData?.[currentSectionIndx]?._id);
      setActiveSubSection(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className="flex flex-col min-w-[220px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 px-1 gap-y-3 overflow-y-auto">
      <div className=" flex flex-row items-center justify-between ">
        <button
          className=" text-caribbeangreen-200 text-4xl"
          onClick={() => navigate("/dashboard/enrolled-courses")}
        >
          <IoChevronBackCircleOutline />
        </button>
        <button
          className=" text-white bg-caribbeangreen-200 py-2 px-3 rounded mr-2"
          onClick={() => setReviewModal(true)}
        >
          Add Review
        </button>
      </div>
      <div className=" text-richblack-100 text-center ">
        {courseEntireData.courseName} {completedLectures?.length || 0}/
        {totalNoOfLectures}
      </div>
      <div className=" h-[1px] bg-richblack-500 w-full"> </div>

      <div className=" space-y-2 cursor-pointer">
        {courseEntireData &&
          courseEntireData?.courseContent?.map((section) => (
            <details key={section._id} open={activeSection === section._id}>
              <summary
                className=" text-center p-2 bg-richblack-700 text-richblack-50"
                //   onClick={() => setActiveSection(section._id)}
              >
                {section.sectionName}
              </summary>
              {section.subSection.map((subsec) => (
                <div
                  key={subsec._id}
                  className={`flex ml-4 items-center flex-row my-2 p-2 rounded gap-x-2 ${
                    subSectionId === subsec._id
                      ? " bg-caribbeangreen-50 text-richblack-900"
                      : ""
                  } text-richblack-100`}
                  onClick={() =>
                    navigate(
                      `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subsec._id}`
                    )
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      completedLectures.length > 0 &&
                      completedLectures.includes(subsec?._id)
                    }
                    onChange={() => {}}
                  ></input>
                  {subsec.title}
                  <IoMdLaptop />
                </div>
              ))}
            </details>
          ))}
      </div>
    </div>
  );
};

export default ViewCourseBar;
