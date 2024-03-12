import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorDashBoardData } from "../services/operations/profileApi";
import DashBoardChart from "../Components/PagesComponents/dashboard/DashBoardChart";

const MyDashBoard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [instructorData, setInstructorData] = useState([]);
  const fetchInstructorData = async () => {
    const res = await getInstructorDashBoardData(token);
    if (res) {
      setInstructorData(res);
    }
  };
  useEffect(() => {
    fetchInstructorData();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );
  return (
    <div>
      <div className=" flex flex-row text-3xl items-center text-white">
        <p>Hi {user?.firstName} </p> 👋
      </div>
      <p className=" text-xl text-richblack-400"> Let's start something new</p>
      <div className=" flex flex-col  lg:flex-row gap-x-3">
        <div className=" flex flex-col rounded bg-richblack-800 p-3  gap-y-6 w-full">
          <DashBoardChart instructorData={instructorData} />
        </div>
        <div className=" flex flex-col rounded bg-richblack-800 p-3  gap-y-6 min-w-[250px]">
          <div className=" text-2xl text-white">
            <p>Statistics</p>
          </div>
          <div className=" text-richblack-200 text-xl font-semibold">
            <p>Total Courses</p>
            <p className=" text-richblack-50">{instructorData.length || 0}</p>
          </div>
          <div className=" text-richblack-200 text-xl font-semibold">
            <p>Total Students</p>
            <p className=" text-richblack-50">{totalStudent || 0}</p>
          </div>
          <div className=" text-richblack-200 text-xl font-semibold">
            <p>Total Income</p>
            <p className=" text-richblack-50">{totalAmount || 0}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MyDashBoard;
