import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoint } from "../api";
import { setUser } from "../../redux/slices/profile";
import { logout } from "./authAPI";
const {
  ENROLLED_COURSES,
  USER_DETAILS,
  DELETE_PROFILE,
  UPDATE_USER_DETAILS,
  RATING_REVIEW,
  INSTRUCTOR_DASHBOARD_DATA,
  UPADTE_COURSE_PROGRESS,
} = profileEndpoint;

export const getAllEnrollCourse = async (token) => {
  //const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", ENROLLED_COURSES, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data.courses;
  } catch (error) {
    console.log("error while fetching enroll courses details", error);
    toast.error("");
  }
  //toast.dismiss(toastId);
  return result;
};

export function getUserAdditionalDetails(token) {
  return async (dispatch) => {
    try {
      console.log("yes1");
      const response = await apiConnector("GET", USER_DETAILS, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("hello");
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Check if response.data.user is defined before accessing its properties
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error);
      // toast.error("Could Not Get User Details");
    }
  };
}

export function updateUserDetails(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log("hii3");
      const response = await apiConnector(
        "POST",
        UPDATE_USER_DETAILS,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
      dispatch(setUser(response.data.updatedUserdetails));
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.updatedUserdetails)
      );

      //      console.log(response.data.updatedUserdetails);
    } catch (error) {
      console.log("update_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Update User Details");
    }
    toast.dismiss(toastId);
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      } else {
        toast.success(response.data.message);
        dispatch(logout(navigate));
      }
    } catch (error) {
      console.log("delete API ERROR............", error);
      toast.error("Could Not delete User");
    }
  };
}

export const createRatingAndReview = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", RATING_REVIEW, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATERatingAndReview API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Add RatingAndReview");
    }
    toast.success(response?.data?.message);
    result = response?.data?.message;
  } catch (error) {
    console.log("cREATERatingAndReview API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getInstructorDashBoardData = async (token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      INSTRUCTOR_DASHBOARD_DATA,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not  get InstructorDashBoardData");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("get Instructor DashBoardData API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateCourseProgress = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", UPADTE_COURSE_PROGRESS, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Add RatingAndReview");
    }
    toast.success(response?.data?.message);
    result = response?.data?.success;
  } catch (error) {
    console.log("cREATERatingAndReview API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
