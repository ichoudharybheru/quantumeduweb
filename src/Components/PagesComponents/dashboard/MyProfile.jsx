import React from "react";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  return (
    <div className=" text-white flex flex-col  justify-between gap-y-10 ">
      <p className=" text-4xl">My Profile</p>
      <section className="flex flex-row  justify-between bg-richblack-800 p-8 rounded ">
        {" "}
        <div className="flex flex-row p-2 gap-3 justify-center items-center ">
          <img
            src={user?.Image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[80px] rounded-full object-cover"
          />
          <div>
            <p className="">{user?.firstName + " " + user?.lastName}</p>
            <p className="">{user?.email}</p>
          </div>
        </div>
        <button
          className="flex bg-caribbeangreen-200 text-white px-6 my-6 rounded justify-center items-center gap-x-3 text-lg"
          onClick={() => navigate("/dashboard/setting")}
        >
          {" "}
          <p>Edit</p>
          <AiFillEdit size={22} />
        </button>
      </section>
      <section className="  bg-richblack-800 rounded p-8 ">
        <div className="flex flex-row justify-between ">
          <div className=" flex flex-col gap-10  ">
            <p>about</p>
            <p
              className={`${
                user?.additionALDetails?.about
                  ? "text-richblack-25"
                  : "text-richblack-400"
              }`}
            >
              {user?.additionALDetails?.about ??
                "Write Something About Yourself"}
            </p>
            <p>AccountType: {" " + user?.accountType}</p>
          </div>
          <div>
            {" "}
            <button
              className="flex bg-caribbeangreen-200 text-white px-6 py-2 rounded justify-center items-center gap-x-3 text-lg"
              onClick={() => navigate("/dashboard/setting")}
            >
              {" "}
              <p>Edit</p>
              <AiFillEdit size={22} />
            </button>
          </div>
        </div>
      </section>

      <section className=" flex flex-row  bg-richblack-800 rounded p-8  justify-between ">
        <div className="flex flex-col gap-y-3">
          <div>Personal Details</div>
          <div className="flex flex-row gap-x-8">
            <div className="flex flex-col gap-y-2">
              <div>
                <p className=" text-richblack-400">First Name</p>
                {user?.firstName}
              </div>
              <div>
                <p className=" text-richblack-400">Email</p>
                {user?.email}
              </div>
              <div>
                <p className=" text-richblack-400">Gender</p>
                {user?.additionALDetails?.gender ?? "Add  gender"}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div>
                <p className=" text-richblack-400">Last Name</p>
                {user?.lastName}
              </div>
              <div>
                <p className=" text-richblack-400">Phone Number</p>
                {user?.additionALDetails?.number ?? "Add Contact Number"}
              </div>
              <div>
                <p className=" text-richblack-400">Date Of Birth</p>
                {user?.additionALDetails?.dateOfbirth ?? "Add DOB"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="flex bg-caribbeangreen-200 text-white px-6 py-2 rounded justify-center items-center gap-x-3 text-lg"
            onClick={() => navigate("/dashboard/setting")}
          >
            {" "}
            <p>Edit</p>
            <AiFillEdit size={22} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
