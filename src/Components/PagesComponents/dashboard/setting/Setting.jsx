import React from "react";
import PersonalInfo from "./PersonalInfo";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <p className=" text-3xl font-semibold text-richblack-25">Edit Profile</p>
      <PersonalInfo />
      <PasswordUpdate />
      <DeleteAccount />
    </div>
  );
};

export default Setting;
