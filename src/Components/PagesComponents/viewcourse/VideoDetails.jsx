import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCourseProgress } from "../../../services/operations/profileApi";
import { updateCompletedLectures } from "../../../redux/slices/viewCourse";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css"; // import css
const VideoDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const [videoData, setVideoData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const [videoEnded, setVideoEnded] = useState(false);

  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const { courseId, sectionId, subSectionId } = useParams();
  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0]);
        // setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const onFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => {
      return data._id === sectionId;
    });
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => {
      return data._id === subSectionId;
    });

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    return false;
  };

  const onLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) {
      return false; // Handle the case where sectionId is not found
    }

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex ===
        courseSectionData[currentSectionIndex]?.subSection.length - 1
    );
  };

  const goToNext = () => {
    let currentSectionIndex = courseSectionData.findIndex((data) => {
      return data._id === sectionId;
    });
    let currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => {
      return data._id === subSectionId;
    });
    if (
      currentSubSectionIndex ===
      courseSectionData?.[currentSectionIndex].subSection.length - 1
    ) {
      currentSectionIndex = currentSectionIndex + 1;
      currentSubSectionIndex = 0;
    } else {
      currentSubSectionIndex = currentSubSectionIndex + 1;
    }
    navigate(
      `/view-course/${courseEntireData._id}/section/${courseSectionData[currentSectionIndex]?._id}/sub-section/${courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id}`
    );
  };
  const goToPrev = () => {
    let currentSectionIndex = courseSectionData.findIndex((data) => {
      return data._id === sectionId;
    });
    let currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => {
      return data._id === subSectionId;
    });

    if (currentSubSectionIndex === 0) {
      currentSectionIndex = currentSectionIndex - 1;
      currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection.length - 1;
    } else {
      currentSubSectionIndex = currentSubSectionIndex - 1;
    }

    navigate(
      `/view-course/${courseEntireData._id}/section/${courseSectionData?.[currentSectionIndex]?._id}/sub-section/${courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id}`
    );
  };
  const handleLectureCompletion = async () => {
    const data = {
      courseId: courseId,
      subSectionId: subSectionId,
    };
    const res = await updateCourseProgress(data, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
  };

  return (
    <div>
      <div>
        {videoData.videoUrl ? (
          <div className={` relative `}>
            {/* <Player src={videoData?.videoUrl}> </Player> */}
            <Player
              playsInline
              aspectRatio="16:9"
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
              ref={playerRef}
            >
              <BigPlayButton position="center" />
              {videoEnded && (
                <div className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter bg-opacity-10  ">
                  <div className=" flex flex-row gap-4">
                    {!onFirstVideo() && (
                      <button
                        onClick={() => goToPrev()}
                        className=" text-white bg-caribbeangreen-200 p-2 rounded"
                      >
                        Prev
                      </button>
                    )}
                    {!onLastVideo() && (
                      <button
                        onClick={() => goToNext()}
                        className="text-white bg-caribbeangreen-200 p-2 rounded"
                      >
                        Next
                      </button>
                    )}
                  </div>
                  <div className=" flex flex-row gap-4">
                    {!completedLectures?.includes(subSectionId) && (
                      <button
                        className="text-white bg-caribbeangreen-200 p-2 rounded m-1"
                        onClick={handleLectureCompletion}
                      >
                        Mark as completed
                      </button>
                    )}
                    <button
                      className="text-white bg-caribbeangreen-200 p-2 rounded m-1"
                      onClick={() => {
                        if (playerRef.current) {
                          playerRef.current.seek(0);
                          setVideoEnded(false);
                        }
                      }}
                    >
                      Rewatch
                    </button>
                  </div>
                </div>
              )}
            </Player>
          </div>
        ) : (
          <div className=" text-white">
            No Video for this Lecture / Reload again
          </div>
        )}{" "}
      </div>

      <div className=" flex justify-center mx-auto my-3">
        <div className=" flex flex-row gap-4">
          {!onFirstVideo() && (
            <button
              onClick={() => goToPrev()}
              className=" text-white bg-caribbeangreen-200 p-2 rounded"
            >
              Prev
            </button>
          )}
          {!onLastVideo() && (
            <button
              onClick={() => goToNext()}
              className="text-white bg-caribbeangreen-200 p-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div>
        <h1 className=" text-white text-2xl font-semibold">
          {videoData.title}
        </h1>
        <p className=" text-richblack-25 text-lg break-all">
          {videoData.descripation}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails;
