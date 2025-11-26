/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { RiNotificationFill } from "react-icons/ri";
import userImage from "/public/Auth/user.png";
import { MdNotificationsNone } from "react-icons/md";
import { useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import { useEffect } from "react";
import Url from "../../../redux/baseApi/forImageUrl";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { data: userProfile, refetch } = useGetUserProfileQuery();

  const user = userProfile?.data;
  // console.log(user);

  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
    <div className="w-full px-5 py-3.5 bg-[#038c6d] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-5">
        <Link to={"/notification"}>
          <h1 className="relative text-[#038c6d] p-2 rounded-full bg-white">
            <MdNotificationsNone className="size-8" />{" "}
            {/* <span className="absolute top-0 right-0 w-5 h-5 text-white text-xs flex justify-center items-center bg-red-500 rounded-full">99+</span> */}
          </h1>

        </Link>
        <img
          className="w-12 rounded-full"
          src={user?.profileImageUrl ? Url + user?.profileImageUrl : userImage}
          alt="User Profile"
        />
        <div className="hidden md:block">
          <h1 className="">{user?.fullName}</h1>
          <span className="">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
