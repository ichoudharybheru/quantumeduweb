import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading: profileloading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading || profileloading) {
    return <div> Loading ... </div>;
  }
  return (
    <div>
      <div className="flex flex-col min-w-[220px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) {
              return null;
            }
            return (
              <SidebarLinks
                iconName={link.icon}
                path={link.path}
                name={link.name}
                key={link.id}
              />
            );
          })}
        </div>
        <div className=" my-3 h-[1px] w-full bg-richblack-5"></div>
        <div className="flex flex-col">
          <SidebarLinks
            iconName={"VcSettingsGear"}
            name={"Setting"}
            path={"dashboard/setting"}
          />
          <button
            onClick={() => {
              dispatch(logout(navigate));
            }}
            className=" text-richblack-400"
          >
            <div className="flex items-center gap-2 w-full pl-4 p-3">
              <VscSignOut className="text-lg" />
              <div className=" text-richblack-400">Logout</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
