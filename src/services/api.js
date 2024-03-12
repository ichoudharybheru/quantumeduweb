const BASE_URL = "https://quantumweb-backend2.onrender.com/api/v1";

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOtp",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/logIn",
  RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
  CHANGE_PASSWORD: BASE_URL + "/auth/changePassword",
  CHECK_FOR_LOGIN: BASE_URL + "/auth/checkForLogIn",
};

export const contactUspoint = {
  CONTACT_API: BASE_URL + "/contact/contact-us",
};

export const courseEndpoints = {
  GET_ALL_COURSES: BASE_URL + "/course/getAllCourse",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  ALL_CATEGORY: BASE_URL + "/course/showAllCategory",
  CREATE_COURSE: BASE_URL + "/course/createCourse",
  UPDATE_COURSE: BASE_URL + "/course/updateCourse",
  INSTRUCTOR_COURSE: BASE_URL + "/course/getInstructorCourses",
  DELETE_COURSE: BASE_URL + "/course/deleteCourse",

  CATEGORY_PAGE_DETAILS: BASE_URL + "/course/categoryPageDetails",
  AVERAGE_RATING: BASE_URL + "/course/getAverageRating",
  FULL_COURSE_DETAILS_API: BASE_URL + "/course/getFullCourseDetails",
  GET_ALL_RATING: BASE_URL + "/course/getAllRating",
};
export const sectionAndSubSectionEndPoints = {
  CREATE_SECTION: BASE_URL + "/course/createSection",
  UPDATE_SECTION: BASE_URL + "/course/updateSection",
  DELETE_SECTION: BASE_URL + "/course/deleteSection",
  CREATE_SUB_SECTION: BASE_URL + "/course/createSubSection",
  UPDATE_SUB_SECTION: BASE_URL + "/course/updateSubSection",
  DELETE_SUB_SECTION: BASE_URL + "/course/deleteSubSection",
};

export const profileEndpoint = {
  ENROLLED_COURSES: BASE_URL + "/profile/enrolledcourse",
  USER_DETAILS: BASE_URL + "/profile/getUserDetails",
  DELETE_PROFILE: BASE_URL + "/profile/deleteProfile",
  UPDATE_USER_DETAILS: BASE_URL + "/profile/updateProfile",
  RATING_REVIEW: BASE_URL + "/course/createRatingAndReview",
  INSTRUCTOR_DASHBOARD_DATA: BASE_URL + "/course/getInstructorDashBoard",
  UPADTE_COURSE_PROGRESS: BASE_URL + "/profile/updateCouresProgress",
};

export const paymnetApi = {
  CAPTURE_PAYMENT: BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT: BASE_URL + "/payment/verifyPayment",
};
