import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { getUserAdditionalDetails } from "./profileApi";

import { setUser } from "../../redux/slices/profile";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CHANGE_PASSWORD,
  CHECK_FOR_LOGIN,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      } else {
        toast.success("OTP Sent Successfully");
        console.log("1");
        navigate("/verifyemail");
        console.log("2");
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      setEmailSent(response.data.success);
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
      setEmailSent(response.data.success);
    } catch (error) {
      console.log("RESETpassword API ERROR............", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function resetUpdatePassword(
  password,
  confirmPassword,
  navigate,
  token
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        navigate("/forgot-password");
        throw new Error(response.data.message);
      } else {
        toast.success("Password Reset Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error("Failed To Reset Password");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      } else {
        toast.success("Login Successful");
        dispatch(setToken(response.data.token));
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
        dispatch(setUser({ ...response.data.user, image: userImage }));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // console.log(response.data.token);
        dispatch(getUserAdditionalDetails(response.data.token));
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function changePassword(oldPassword, newPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      console.log("here");
      console.log(oldPassword, newPassword, token);
      const response = await apiConnector(
        "PUT",
        CHANGE_PASSWORD,
        {
          oldPassword,
          newPassword,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("here2");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Changed Successfully");
    } catch (error) {
      //  console.log("CHANGE_PASSWORD_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    //navigate("/dashboard/my-profile");
  };
}

// try {
//   localStorage.setItem("token", JSON.stringify(response.data.token));
//   console.log("Token stored successfully");
// } catch (error) {
//   console.error("Error storing token:", error);
// }

export const CheckForUser = async (token, navigate) => {
  try {
    const res = await apiConnector("GET", CHECK_FOR_LOGIN, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!res.data.success) {
      await logout(navigate);
    }
  } catch (error) {
    // console.log("api check log in error", error);
  }
};
