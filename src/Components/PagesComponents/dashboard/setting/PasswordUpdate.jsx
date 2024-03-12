import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/authAPI";
const PasswordUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { currentPassword, newPassword } = formData;

  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (currentPassword === newPassword) {
      toast.error("old and new password is same");
      return;
    }
    dispatch(changePassword(currentPassword, newPassword, token, navigate));
    setFormData({ currentPassword: "", newPassword: "" });
  };
  return (
    <div className=" bg-richblack-800 p-4 border rounded border-richblack-600">
      <div className="flex flex-col gap-y-5 p-4">
        <p className=" text-2xl text-richblack-5">Password</p>
        <form onSubmit={updateHandler} className=" space-y-3">
          <div className="flex flex-col lg:flex-row w-full gap-x-6 text-richblack-25">
            <label className="w-full relative text-richblack-200 ">
              <p className=" text-richblack-5 pb-2">
                Current Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword1 ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter Password"
                value={currentPassword}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25  "
              ></input>
              <span
                onClick={() => setShowPassword1((prev) => !prev)}
                className=" hover:cursor-pointer absolute right-2 top-11 "
              >
                {showPassword1 ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>
            <label className=" w-full relative text-richblack-200">
              <p className=" text-white pb-2">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showPassword2 ? "text" : "password"}
                required
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25 "
              ></input>
              <span
                onClick={() => setShowPassword2((prev) => !prev)}
                className=" hover:cursor-pointer absolute right-2 top-11 "
              >
                {showPassword2 ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-caribbeangreen-100 py-2 px-5 font-semibold text-richblack-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
