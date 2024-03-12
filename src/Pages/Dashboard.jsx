import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Components/PagesComponents/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  if (authLoading || profileloading) {
    return <div> Loading ... </div>;
  }
  return (
    <div className=" relative flex  min-h-[calc(100vh-3.5rem)] ">
      <Sidebar />

      <div className=" h-[calc(100vh-3.5rem)] overflow-auto flex-1">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
