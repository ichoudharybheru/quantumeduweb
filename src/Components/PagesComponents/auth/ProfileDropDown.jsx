import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";
import { logout } from "../../../services/operations/authAPI";
const ProfileDropDown = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  if (!user) return null;
  return (
    <button className="relative" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.Image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          className="absolute top-[118%] -right-4 z-[1000] divide-y-[1px] divide-richblack-700 
         rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        >
          <div className=" absolute right-2 -top-1 w-6 h-6 rotate-45 -z-[5000] bg-richblack-800"></div>
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
