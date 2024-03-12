import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logoweb.jpg";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { BsCart } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../PagesComponents/auth/ProfileDropDown";
import { getAllTag } from "../../services/operations/coursesDetailAPI";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  useEffect(() => {
    async function getall() {
      try {
        const result = await getAllTag();
        //  console.log(result.allCategory);
        setCategory(result.allCategory);
      } catch (error) {
        //console.error("Error fetching categories:", error);
      }
    }
    getall();
  }, []);
  return (
    <div className=" flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 flex flex-row items-center justify-between  mx-auto">
        <Link to={"/"}>
          <div className="flex flex-row  items-center justify-center ">
            <img
              alt=""
              src={logo}
              className=" object-cover rounded-full h-12 w-12"
            ></img>

            <p className=" text-white italic font-semibold text-[24px] -translate-x-1">
              uantum
            </p>
          </div>
        </Link>
        <nav>
          <ul className="flex flex-row gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Categories" ? (
                  <div className="text-richblack-25 flex flex-row items-center relative group hover:cursor-pointer">
                    <p>{link.title}</p>
                    <MdOutlineKeyboardArrowDown />
                    <div
                      className=" invisible opacity-0 bg-richblack-5 lg:w-[300px] rounded flex flex-col
                    absolute p-4 pt-6 top-9 -left-24 z-20 group-hover:visible group-hover:opacity-100 transition-all duration-200"
                    >
                      {category.length ? (
                        category.map((sub, index) => (
                          <Link
                            to={`/catalog/${sub.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                          >
                            <p className="text-black p-2 rounded hover:bg-richblack-100">
                              {sub.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                      <div className=" absolute bg-richblack-5 h-6 w-6 rotate-45 -top-2 left-[57%] rounded ">
                        {" "}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? " text-caribbeangreen-400"
                          : " text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className=" flex flex-row items-center gap-x-4">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <BsCart className=" text-white" size={23} />
              {totalItems > 0 && (
                <span className=" absolute text-caribbeangreen-200 -top-3 -right-1 z-10">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className=" text-richblack-25 border border-richblack-700 rounded px-3 py-[7px] bg-richblack-800">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className=" text-richblack-25 border  border-richblack-700 rounded px-3 py-[7px] bg-richblack-800">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
