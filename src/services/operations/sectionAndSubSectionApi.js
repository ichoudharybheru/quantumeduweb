import { sectionAndSubSectionEndPoints } from "../api";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
  CREATE_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  CREATE_SUB_SECTION,
  UPDATE_SUB_SECTION,
  DELETE_SUB_SECTION,
} = sectionAndSubSectionEndPoints;

/// function related to create update and delete section;
export const createSection = async (data, token) => {
  let result = null;
  console.log("createSection", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Add Section");
    }
    toast.success("Section added successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const updateSection = async (data, token) => {
  let result = null;

  console.log("updateSection", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Update Section");
    }
    toast.success("Section Updated successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const deleteSection = async (data, token) => {
  let result = null;
  console.log("deleteSection", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Delete Section");
    }
    toast.success("Section delete successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

///// function related to create update and delete section;

export const createSubSection = async (data, token) => {
  let result = null;
  console.log(data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUB_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Add Sub-Section");
    }
    toast.success("Sub-Section added successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SUB_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Update Sub-Section");
    }
    toast.success("Sub-Section Updated successfully");
    result = response?.data?.data;
    console.log(result);
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  console.log(data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SUB_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      toast.error(response.data.message);
      throw new Error("Could Not Delete Sub Section");
    }
    toast.success("Sub Section Delete successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// export const meraCourseTimeBarbad = async (courseId) => {
//   let result = null;
//   //console.log(data);
//   console.log("meraCourseTimeBarbad", courseId);
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiConnector(
//       "GET",
//       "http://localhost:4000/api/v1/course/getCourseDetails",
//       {
//         courseId: courseId,
//       }
//     );
//     console.log("DELETE SUB-SECTION API RESPONSE............", response);
//     if (!response?.data?.success) {
//       toast.error(response.data.message);
//       throw new Error("Could Not Delete Sub Section");
//     }
//     toast.success("Sub Section Delete successfully");
//     result = response?.data?.data;
//   } catch (error) {
//     console.log("DELETE SUB-SECTION API ERROR............", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };
