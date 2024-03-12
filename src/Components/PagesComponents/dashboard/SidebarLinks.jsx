import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

const SidebarLinks = ({ iconName, path, name }) => {
  const location = useLocation();

  const matchRoute = (myroute) => {
    return matchPath({ path: myroute }, location.pathname);
  };
  return (
    <div className="relative">
      <Link
        to={path}
        className={` relative ${
          matchRoute(path) ? " bg-caribbeangreen-800" : " bg-opacity-0"
        } flex flex-row   text-richblack-400 w-full pl-4 p-3`}
      >
        {" "}
        <div
          className={`absolute left-0 top-0 w-1 h-full bg-caribbeangreen-200   ${
            matchRoute(path) ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div className="flex items-center">
          <span>{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLinks;
