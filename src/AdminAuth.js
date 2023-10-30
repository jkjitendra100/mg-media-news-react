import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "./context/useAuth";
import logo from "./assets/logo.png";

export const AdminAuth = () => {
  const { userType, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = location.pathname?.split("/")[1];

  if (userType !== "admin") {
    return <Navigate to="/home" />;
  }

  const handleOnLogout = () => {
    let userResponse = window.confirm(
      "Are you sure, you want to logout from admin panel"
    );

    if (userResponse) {
      return logout();
    }
  };

  return (
    <div className="flex flex-row ticky top-0 min-h-screen">
      <div
        className={`w-64 min-h-screen z-50 fixed top-0 hidden md:block lg:block shadow-xl bg-slate-800 drop-shadow-2xl`}
      >
        <div className="shadow-r-xl">
          <div className="mb-6 m-6 p-4 bg-white rounded-md">
            <img
              className="w-full h-auto rounded-sm mx-auto hover:cursor-pointer"
              src={logo}
              alt="logo"
            />
          </div>

          <hr className="mb-4 m-2" />
          <div className="m-2 relative">
            <h2
              className={`py-1.5 pl-4 pr-1 my-3 rounded-lg overflow-hidden text-black text-lg font-bold shadow-sm border-b-2 bg-white hover:text-gray-900 hover:shadow-sm hover:scale-105 cursor-pointer shadow-gray-300 duration-300 ${
                pathname === "addPost" &&
                "bg-text-gray-900 bg-gray-400 shadow-sm"
              }`}
              onClick={() => navigate("addPost")}
            >
              <span>Add New Post</span>
            </h2>

            <h2
              className={`py-1.5 pl-4 pr-1 my-3 rounded-lg overflow-hidden text-black text-lg font-bold shadow-sm border-b-2 bg-white hover:text-gray-900 hover:shadow-sm hover:scale-105 cursor-pointer shadow-gray-300 duration-300 ${
                pathname === "postList" &&
                "bg-text-gray-900 bg-gray-400 shadow-sm"
              }`}
              onClick={() => navigate("postList")}
            >
              <span>All Posts</span>
            </h2>

            <h2
              className={`py-1.5 pl-4 pr-1 my-3 rounded-lg overflow-hidden text-black text-lg font-bold shadow-sm border-b-2 bg-white hover:text-gray-900 hover:shadow-sm hover:scale-105 cursor-pointer shadow-gray-300 duration-300 ${
                pathname === "manageTags" &&
                "bg-text-gray-900 bg-gray-400 shadow-sm"
              }`}
              onClick={() => navigate("manageTags")}
            >
              <span>Manage Tags</span>
            </h2>

            {/* <h2
              className={`py-1.5 pl-4 pr-1 my-3 rounded-lg overflow-hidden text-black text-lg font-bold shadow-sm border-b-2 bg-white hover:text-gray-900 hover:shadow-sm hover:scale-105 cursor-pointer shadow-gray-300 duration-300 ${
                pathname === "manageAds" &&
                "bg-text-gray-900 bg-gray-400 shadow-sm"
              }`}
              onClick={() => navigate("manageAds")}
            >
              <span>Manage Ads</span>
            </h2> */}

            <h2
              className={`py-1.5 pl-4 pr-1 my-3 rounded-lg overflow-hidden text-black text-lg font-bold shadow-sm border-b-2 bg-white hover:text-gray-900 hover:shadow-sm hover:scale-105 cursor-pointer shadow-gray-300 duration-300 ${
                pathname === "changePassword" &&
                "bg-text-gray-900 bg-gray-400 shadow-sm"
              }`}
              onClick={() => navigate("changePassword")}
            >
              <span>Change Password</span>
            </h2>
          </div>
        </div>
      </div>

      <div className={`w-full ml-64 z-50}`}>
        <div className=" py-auto h-20 px-4 z-50 bg-slate-300 sticky top-0 text-xl font-bold text-white shadow-sm shadow-gray-600 duration-300">
          <div className="py-2 ">
            <button
              className="mr-4 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src="../assets/menu.png"
                alt="pic"
                className="h-6 w-8 mr-2"
              />
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div className="my-auto text-2xl">
              <h2 className="ml-4 mt-1.5 text-slate-800">
                MAA GAYATRI MEDIA NEWS
              </h2>
            </div>
            <div className="hidden md:block space-x-4">
              <button
                className="mt-2 px-2 py-1 font-semibold text-white bg-blue-600 rounded-md hover:scale-110 hover:bg-blue-700 duration-500"
                onClick={() => navigate("../home")}
              >
                Leave
              </button>

              <button
                className="mt-2 px-2 py-1 font-semibold text-white bg-[#ff1717] rounded-md hover:scale-110 hover:bg-[#e70909] duration-500"
                onClick={handleOnLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 min-h-screen bg-gray-200">
          <Outlet />
        </div>
        <div className="px-4 py-4 text-center bg-slate-600 text-white">
          <span className="">© 2023 - </span>
          <span className="font-semibold hover:text-white ">
            Maa Gayatri Media News
          </span>
        </div>
      </div>
    </div>
  );
};
