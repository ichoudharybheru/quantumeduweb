import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../../../../services/operations/profileApi";

const PersonalInfo = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.additionALDetails.about,
    number: user.additionALDetails.number,
    dateOfbirth: user.additionALDetails.dateOfbirth,
    gender: user.additionALDetails.gender,
  });
  const { firstName, lastName, about, number, gender, dateOfbirth } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSelectChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(token, formData));
  };
  return (
    <div className=" bg-richblack-800 p-9 border border-richblack-600 rounded">
      <div className="flex flex-col gap-y-4">
        <p className=" text-richblack-5 font-semibold text-xl">
          Profile Information
        </p>
        <form className="flex flex-col gap-y-5" onSubmit={submitHandler}>
          <div className="flex flex-row gap-x-3">
            <label className="w-full relative text-richblack-200 ">
              <p className=" text-richblack-5 pb-2">First Name</p>
              <input
                required
                name="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25  "
              ></input>
            </label>
            <label className="w-full relative text-richblack-200 ">
              <p className=" text-richblack-5 pb-2">Last Name</p>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25  "
              ></input>
            </label>
          </div>
          <div className="flex flex-row gap-x-3">
            <label className="w-full relative text-richblack-200 ">
              <p className=" text-richblack-5 pb-2">About</p>
              <input
                required
                type="text"
                name="about"
                placeholder="Enter bio"
                value={about}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25  "
              ></input>
            </label>
            <label className="w-full relative text-richblack-200 ">
              <p className=" text-richblack-5 pb-2">Phone Number</p>
              <input
                required
                type="text"
                name="number"
                placeholder="Enter mobile Number"
                value={number}
                onChange={handleOnChange}
                className=" border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25  "
              ></input>
            </label>
          </div>
          <div className="flex flex-row gap-x-3">
            <label className="w-full relative text-richblack-200">
              <p className="text-richblack-5 pb-2">Gender</p>
              <select
                name="gender"
                value={gender}
                onChange={handleSelectChange}
                className="border rounded border-richblack-300 bg-richblack-700 w-full p-3 text-richblack-25"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="w-full relative text-richblack-200">
              <p className="text-richblack-5 pb-2">Date Of Birth</p>
              <input
                required
                type="date"
                name="dateOfbirth"
                value={dateOfbirth}
                onChange={handleOnChange}
                className="border rounded border-richblack-300 bg-richblack-700 w-full p-2 text-richblack-25"
              />
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

export default PersonalInfo;
