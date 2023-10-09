import React, { useEffect, useMemo, useState } from "react";
import {
  createSearchParams,
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "./context/useAuth";
import logo from "./assets/logo.png";
import {
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoMdArrowDropdown,
} from "react-icons/io";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaFacebookF, FaListAlt, FaYoutube } from "react-icons/fa";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookShareButton,
} from "react-share";
import { motion } from "framer-motion";

export const AppAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, userType } = useAuth();
  const pathname = location.pathname?.split("/")[1];
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [livePost, setLivePost] = useState([]);

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "mgNewsPost"),
  //     where("liveStatus", "==", true),
  //     orderBy("addedAt", "desc")
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc?.id, ...doc?.data() });
  //     });
  //     setLivePost(list);
  //   });
  // }, []);

  return (
    <div className={`min-h-screen relative`}>
      <div className="h-12 md:h-20 py-2 z-50 bg-white sticky top-0 flex border-b-4 border-[#ff1717] justify-between text-xl text-gray-700 shadow-sm shadow-slate-400 duration:1000">
        <div className="mt-1 md:mt-2.5 my-auto flex relative">
          <button
            className="mr-4 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GiHamburgerMenu className="p-1 md:p-1.5 ml-2 w-7 h-7 md:w-10 md:h-10 bi-list text-sm md:text-xl bg-[#ff1717] text-white font-bold rounded-sm" />
          </button>
          <div className="mt-1.5 flex">
            <img
              className="lg:mx-4 w-10 md:w-20 hidden md:block scale-110"
              src={logo}
              onClick={() => navigate("home")}
            />
            <div className="w-48 lg:w-40 mb-1.5 sm:mb-1 md:mb-0 ml-2 md:ml-0 absolute -bottom-1 left-10 sm:lef md:left-40 lg:left-28 text-sm sm:text-lg lg:text-2xl uppercase text-[#ff1717] font-bold duration-300">
              <h2
                className="-mb-1 ml-0.5 lg:text-sm hidden md:block"
                style={{ fontSize: 11 }}
              >
                Maa Gayatri
              </h2>
              <div className="flex">
                <h2 className="md:hidden">MG&nbsp;</h2>
                <h2 className="-mb-1"> Media News</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="px-4 mr-2 lg:w-auto mt-8 ml-48 md:flex space-x-2 opacity-0 lg:opacity-100 text-[#ff1717] duration-300">
          <button
            className="px-3 py-0.5 mr-3 text-center text-base font-semibold hidden lg:block bg-[#ff1717] text-white rounded-full scale-110 hover:scale-125 hover:border border-[#ff1717] hover:bg-white hover:text-[#ff1717] duration-500"
            onClick={() =>
              navigate({
                pathname: "../videoPostDetails",
                search: createSearchParams({
                  postId: livePost[0]?.id
                    ? livePost[0]?.id
                    : "Kob0lXYbK0Xdc9AMjokD",
                }).toString(),
              })
            }
          >
            Live News
          </button>

          <button
            className={`px-2 text-center text-base font-semibold hidden lg:block rounded-md hover:bg-red-200 duration-300 ${
              pathname === "home" && "border-b-4 border-[#ff1717]"
            }`}
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button
            className={`px-2 text-center text-base font-semibold hidden lg:block rounded-md hover:bg-red-200 duration-300 ${
              pathname === "jharkhand" && "border-b-4 border-[#ff1717]"
            }`}
            onClick={() => navigate("jharkhand")}
          >
            Jharkhand
          </button>

          <button
            className={`px-2 text-center text-base font-semibold hidden lg:block rounded-md hover:bg-red-200 duration-300 ${
              pathname === "sports" && "border-b-4 border-[#ff1717]"
            }`}
            onClick={() => navigate("sports")}
          >
            Sports
          </button>

          <button
            className={`px-2 text-center text-base font-semibold hidden xl:block rounded-md hover:bg-red-200 duration-300 ${
              pathname === "politics" && "border-b-4 border-[#ff1717]"
            }`}
            onClick={() => navigate("politics")}
          >
            Politics
          </button>

          {/* Dropdown Menu */}
          <div className="mt-0.5 relative px-2 duration-300 hidden lg:block">
            <div className="hidden lg:block">
              <button
                className={`px-2 flex text-center text-base font-semibold rounded-md hover:bg-red-200 duration-300 ${
                  dropDownMenu && "bg-red-200"
                }`}
                onClick={() => setDropDownMenu(!dropDownMenu)}
              >
                More
                <IoMdArrowDropdown className="mt-1" />
              </button>
            </div>

            {dropDownMenu && (
              <ul className="w-44 px-3 z-10 absolute -right-16 top-9 text-left shadow-lg bg-white border-2 border-[#ff1717]">
                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "business"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("business");
                    setDropDownMenu(false);
                  }}
                >
                  Business
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "career"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("career");
                    setDropDownMenu(false);
                  }}
                >
                  Career
                </button>
                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "crime"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("crime");
                    setDropDownMenu(false);
                  }}
                >
                  Crime
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "entertainment"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("entertainment");
                    setDropDownMenu(false);
                  }}
                >
                  Entertainment
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "india"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("india");
                    setDropDownMenu(false);
                  }}
                >
                  India
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "environment"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("environment");
                    setDropDownMenu(false);
                  }}
                >
                  Environment
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "latestNews"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("latestNews");
                    setDropDownMenu(false);
                  }}
                >
                  Latest News
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "specialReport"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("specialReport");
                    setDropDownMenu(false);
                  }}
                >
                  Special Report
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "viralNews"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("viralNews");
                    setDropDownMenu(false);
                  }}
                >
                  Viral News
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "world"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("world");
                    setDropDownMenu(false);
                  }}
                >
                  World
                </button>

                <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "videos"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("videos");
                    setDropDownMenu(false);
                  }}
                >
                  Videos
                </button>

                {/* <button
                  className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                    pathname === "psmMagazine"
                      ? "bg-[#ff1717] text-white"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => {
                    navigate("psmMagazine");
                    setDropDownMenu(false);
                  }}
                >
                  PSM Magazine
                </button> */}

                {user ? (
                  <button
                    className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                      pathname === "profile"
                        ? "bg-[#ff1717] text-white"
                        : "hover:text-blue-600"
                    }`}
                    onClick={() => {
                      navigate("../profile");
                      setDropDownMenu(false);
                    }}
                  >
                    Profile
                  </button>
                ) : (
                  <button
                    className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                      pathname === "login"
                        ? "bg-[#ff1717] text-white"
                        : "hover:text-blue-600"
                    }`}
                    onClick={() => {
                      navigate("../login");
                      setDropDownMenu(false);
                    }}
                  >
                    Login
                  </button>
                )}

                {userType === "admin" && (
                  <button
                    className={`mx-1 p-0.5 px-2 w-[93%] text-left text-sm font-semibold rounded-md ${
                      pathname === "addPost"
                        ? "bg-[#ff1717] text-white"
                        : "hover:text-blue-600"
                    }`}
                    onClick={() => {
                      navigate("../addPost");
                      setDropDownMenu(false);
                    }}
                  >
                    Admin Panel
                  </button>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="mr-4 md:mt-9 flex space-x-2">
            <a href="https://www.facebook.com/mgmedianewspost/" target="_blank">
              <FaFacebookF className="p-1 w-8 h-8 text-[#0775e7] hover:bg-[#0775e7] rounded-md duration-500 hover:text-white" />
            </a>

            <a href="https://www.instagram.com/mgmedianews/" target="_blank">
              <BsInstagram className="p-1 w-8 h-8 text-[#bf37b3] hover:bg-[#bf37b3] rounded-md duration-500 hover:text-white" />
            </a>
            <IoLogoTwitter className="p-1 w-8 h-8 text-[#0f9cf1] hover:bg-[#0f9cf1] rounded-md duration-500 hover:text-white" />
            <a
              href="https://www.youtube.com/@mgmedianewschannel"
              target="_blank"
            >
              <FaYoutube className="p-1 w-8 h-8 text-[#f00708] hover:bg-[#f00708] rounded-md duration-500 hover:text-white" />{" "}
            </a>
            <IoLogoWhatsapp className="p-1 w-8 h-8 text-[#25c544] hover:bg-[#25c544] rounded-md duration-500 hover:text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div>
        <div
          className={`z-20 bg-white opacity-20 ${
            menuOpen && "fixed top-0 right-0 bottom-0 left-0 inset-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`z-30 fixed bg-white duration-300 shadow-lg shadow-gray-500 lg:hidden ${
            menuOpen ? "w-60 h-screen" : "w-0 h-0"
          }`}
        >
          <ul className="p-2">
            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate({
                  pathname: "../videoPostDetails",
                  search: createSearchParams({
                    postId: livePost[0]?.id
                      ? livePost[0]?.id
                      : "Kob0lXYbK0Xdc9AMjokD",
                  }).toString(),
                });
                setMenuOpen(false);
              }}
            >
              Live News
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("home");
                setMenuOpen(false);
              }}
            >
              Home
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("business");
                setMenuOpen(false);
              }}
            >
              Business
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("environment");
                setMenuOpen(false);
              }}
            >
              Environment
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("jharkhand");
                setMenuOpen(false);
              }}
            >
              Jharkhand
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("delhi");
                setMenuOpen(false);
              }}
            >
              Delhi
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("health");
                setMenuOpen(false);
              }}
            >
              Health
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("specialReport");
                setMenuOpen(false);
              }}
            >
              Special Report
            </button>

            <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("videos");
                setMenuOpen(false);
              }}
            >
              Videos
            </button>

            {/* <button
              className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                menuOpen ? "w-full" : "w-0 opacity-0"
              }`}
              onClick={() => {
                navigate("psmMagazine");
                setMenuOpen(false);
              }}
            >
              PSM Magazine
            </button> */}

            {user ? (
              <button
                className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                  menuOpen ? "w-full" : "w-0 opacity-0"
                }`}
                onClick={() => {
                  navigate("profile");
                  setMenuOpen(false);
                }}
              >
                Profile Page
              </button>
            ) : (
              <button
                className={`mb-2 px-4 p-1 z-30 text-left border-b-2 border-gray-200 shadow-md shadow-gray-500 text-sm font-semibold rounded-md hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-95 ${
                  menuOpen ? "w-full" : "w-0 opacity-0"
                }`}
                onClick={() => {
                  navigate("login");
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
      <div
        className="id:outlet pt -4 min-h-screen bg-gray-50 text-slate-800 dark:text-white"
        onClick={() => {
          menuOpen && setMenuOpen(false);
          dropDownMenu && setDropDownMenu(false);
        }}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <div className="bg-black text-white">
        <div className="px-4 py-4 grid grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="m-2 p-2 hidden lg:block"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="">
              <img
                className="mx-auto p-2 w-40 h-20 bg-white rounded-md shadow-md shadow-gray-500"
                src={logo}
                alt=""
              />
              <p className="mt-4 text-justify text-xs font-thin">
                The channels of MG Media News are ingenious and incisive, and
                they focus on providing the Indian population with timely,
                accurate, and reliable news.
              </p>
              <p className="mt-2 text-justify text-xs font-thin">
                Contact: 9431170549, 7669740003{" "}
              </p>
              <p className="mt-2 text-justify text-xs font-thin">
                Address: 203, Surya Mansion, 1-Kaushalya Park Hauz Khas, New
                Delhi-110016
              </p>
              <hr className="mt-2" />
              <h2 className="mt-2">Follow us on:</h2>
              <div className="mt-2 p-2 flex justify-center">
                <a
                  className="m-1"
                  href="https://www.facebook.com/mgmedianewspost/"
                  target="_blank"
                >
                  <FacebookIcon round={true} size={45} />
                </a>

                <a className="m-1" href={null} target="_blank">
                  <WhatsappIcon round={true} size={45} />
                </a>

                {/* <a
                  href="https://www.facebook.com/mgmedianewspost/"
                  target="_blank"
                >
                  <BsYoutube className="w-10 h-10 rounded-full" />
                </a> */}

                <TwitterIcon className="m-1" round={true} size={45} />
                <TelegramIcon className="m-1" round={true} size={45} />
                <LinkedinIcon className="m-1" round={true} size={45} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="m-2 p-2"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className=" uppercase text-sm font-semibold sm:text-base md:text-lg">
              Useful Pages
            </h2>
            <div>
              <ol className="text-xs list-none sm:taxt-sm md:text-base duration-500">
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../home")}
                >
                  Home
                </li>
                <li className="p-1 cursor-pointer">About Us</li>
                <li className="p-1 cursor-pointer">Advertise With Us</li>
                <li className="p-1 cursor-pointer">Contact Us</li>
                <li className="p-1 cursor-pointer">Terms & Cond.</li>
                <li className="p-1 cursor-pointer">Privacy Policy</li>
              </ol>
            </div>
          </motion.div>

          <motion.div
            className="m-2 p-2"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="uppercase text-sm font-semibold sm:text-base md:text-lg">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <ol className="text-xs list-none sm:taxt-sm md:text-base duration-500">
                {/* <li className="p-1 cursor-pointer">Business</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../career")}
                >
                  Career
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../crime")}
                >
                  Crime
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../entertainment")}
                >
                  Entertainment
                </li>
                {/* <li className="p-1 cursor-pointer">India</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../latestNews")}
                >
                  Latest News
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../politics")}
                >
                  Politics
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../sports")}
                >
                  Sports
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../viralNews")}
                >
                  Viral News
                </li>
                {/*   <li className="p-1 cursor-pointer">World</li> */}
              </ol>
            </div>
          </motion.div>

          <motion.div
            className="m-2 p-2"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className=" uppercase list-none text-sm font-semibold sm:text-base md:text-lg">
              States
            </h2>
            <div>
              <ol className="text-xs list-none sm:taxt-sm md:text-base duration-500">
                {/* <li className="p-1 cursor-pointer">Andhra Pradesh</li>
                <li className="p-1 cursor-pointer">Arunachal Pradesh</li> */}
                {/* <li className="p-1 cursor-pointer">Assam</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../bihar")}
                >
                  Bihar
                </li>
                {/* <li className="p-1 cursor-pointer">Chhattisgarh</li>
                <li className="p-1 cursor-pointer">Goa</li>
                <li className="p-1 cursor-pointer">Gujarat</li>
                <li className="p-1 cursor-pointer">Haryana</li>
                <li className="p-1 cursor-pointer">Himachal Pradesh</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../jharkhand")}
                >
                  Jharkhand
                </li>
                {/* <li className="p-1 cursor-pointer">Karnataka</li>
                <li className="p-1 cursor-pointer">Kerala</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../madhyaPradesh")}
                >
                  Madhya Pradesh
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../maharashtra")}
                >
                  Maharashtra
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../manipur")}
                >
                  Manipur
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../meghalaya")}
                >
                  Meghalaya
                </li>
                {/* FClick={() => navigate("../mizoram")}>Mizoram</li> */}
                {/* <li className="p-1 cursor-pointer"
                 onClick={() => navigate("../nagaland")}>Nagaland</li> */}
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../odisha")}
                >
                  Odisha
                </li>
                <li
                  className="p-1 cursor-pointer"
                  onClick={() => navigate("../punjab")}
                >
                  Punjab
                </li>
                {/* <li className="p-1 cursor-pointer">Rajasthan</li>
                <li className="p-1 cursor-pointer">Sikkim</li>
                <li className="p-1 cursor-pointer">Tamil Nadu</li>
                <li className="p-1 cursor-pointer">Telangana</li>
                <li className="p-1 cursor-pointer">Tripura</li>
                <li className="p-1 cursor-pointer">Uttar Pradesh</li>
                <li className="p-1 cursor-pointer">Uttarakhand</li>
                <li className="p-1 cursor-pointer">West Bengal</li> */}
              </ol>
            </div>
          </motion.div>

          <motion.div
            className="m-2 p-2 block lg:hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="uppercase text-sm font-semibold sm:text-base md:text-lg">
              Social
            </h2>
            <div>
              <ol className="text-xs list-none sm:taxt-sm md:text-base duration-500">
                <li className="p-1">Facebook</li>
                <li className="p-1">WhatsApp</li>
                <li className="p-1">Twitter</li>
                <li className="p-1">Telegram</li>
                <li className="p-1">LinkedIn</li>
              </ol>
            </div>
          </motion.div>
        </div>

        <div className="pb-6 mx-auto lg:hidden">
          <img
            className="p-2 w-32 h-auto mx-auto bg-white shadow-lg shadow-gray-400"
            src={logo}
          />
          <h2 className="mt-4 text-center font-semibold">© MG Media News</h2>
        </div>
      </div>
    </div>
  );
};
