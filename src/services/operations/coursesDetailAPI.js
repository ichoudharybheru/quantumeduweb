import toast from "react-hot-toast";
import { courseEndpoints } from "../api";

import { apiConnector } from "../apiConnector";

const {
  GET_ALL_COURSES,
  COURSE_DETAILS_API,
  ALL_CATEGORY,
  CREATE_COURSE,
  INSTRUCTOR_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CATEGORY_PAGE_DETAILS,
  AVERAGE_RATING,
  FULL_COURSE_DETAILS_API,
  GET_ALL_RATING,
} = courseEndpoints;

export const getAllCourse = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ALL_COURSES);

    if (!response.data.success) {
      //toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("error while getting all course", error);
    toast.error(error.message);
  }
  return result;
};

export const getAllTag = async () => {
  try {
    const response = await apiConnector("GET", ALL_CATEGORY);

    if (!response.data.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    //console.log("error while getting all course", error);
    toast.error(error.message);
  }
};
export const getCatagoryPageData = async (categoryId) => {
  let result = null;
  try {
    const response = await apiConnector("POST", CATEGORY_PAGE_DETAILS, {
      categoryId,
    });

    if (!response.data.success) {
      //toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("error while getting all category page details", error);
    toast.error(error.message);
  }
  return result;
};

export const createNewCourse = async (formData, token) => {
  try {
    const response = await apiConnector("POST", CREATE_COURSE, formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("sdhbjs");
    if (!response.data.success) {
      toast.error(response.data.message);

      throw new Error(response.data.message);
    }

    toast.success(response.data.message);
    // console.log(response.data.data.coursedetailes);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    // console.log("craete course api error", error);
    if (error.response) {
      //   console.log("Server responded with:", error.response.data);
    }
  }
};

export const updateCourse = async (formData, token) => {
  try {
    const response = await apiConnector("PUT", UPDATE_COURSE, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      toast.error(response.data.message);

      throw new Error(response.data.message);
    }

    toast.success(response.data.message);
    return response.data.updatedCourseDetails;
  } catch (error) {
    //console.log("craete course api error", error);
    if (error.response) {
      //   console.log("Server responded with:", error.response.data);
    }
  }
};

export const getInstructorCourses = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", INSTRUCTOR_COURSE, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Fetch Instructor Courses");
    }
    toast.success("Instructor Courses successfully");

    result = response?.data?.data;
  } catch (error) {
    //console.log("get instructor Courses api error ", error);
    if (error.response) {
      // console.log("Server responded with:", error.response.data);
    }
  }
  toast.dismiss(toastId);

  return result;
};

export const getCourseAllDetails = async (courseId) => {
  let result = null;
  //  console.log("11", courseId);

  try {
    // console.log("courseapi", courseId);

    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId: courseId,
    });

    if (!response.data.success) {
      toast.error(response.data.message);

      throw new Error(response.data.message);
    }

    // toast.success(response.data.message);
    result = response.data.data;
    // console.log(result);
  } catch (error) {
    //console.log("getCourseDetails api error", error);
  }
  return result;
};

// export const getCourseAllDetails = async (courseId) => {
//   let result = null;
//   console.log("11", courseId);

//   try {
//     console.log("courseapi", courseId);
//     const response = await axios.post(
//       "http://localhost:4000/api/v1/course/getCourseDetails",
//       {
//         courseId: courseId,
//       }
//     );
// s
//     // Axios automatically handles the response status
//     if (!response.data.success) {
//       toast.error(response.data.message);
//       throw new Error(response.data.message);
//     }

//     // toast.success(response.data.message);
//     result = response.data.data;
//     console.log(result);
//   } catch (error) {
//     // Handle error
//     console.error("getCourseDetails api error", error);
//   }
//   return result;
// };

export const getFullDetailsOfCourse = async (courseId, token) => {
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      FULL_COURSE_DETAILS_API,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    //console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }

  //   dispatch(setLoading(false));
  return result;
};

export const deleteCourse = async (courseId, token) => {
  let result = false;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE, courseId, {
      Authorization: `Bearer ${token}`,
    });
    //console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Delete successfully");
    result = true;
  } catch (error) {
    // console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//rating and review

export const getAvgRating = async (courseId) => {
  let result = null;

  //const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", AVERAGE_RATING, { courseId });
    //  console.log("getavgRating API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not getavgRating");
    }
    // toast.success("getavgRating successfully");
    result = response?.data;
  } catch (error) {
    //console.log("getavgRating API ERROR............", error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId);
  return result;
};

export const getAllRatingAndReviews = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ALL_RATING);

    if (!response.data.success) {
      //toast.error(response.data.message);
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("error while getting all course", error);
    // toast.error(error.message);
  }
  return result;
};
