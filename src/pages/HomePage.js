import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import ImageNewsCard from "../components/ImageNewsCard";
import VideoNewsCard from "../components/VideoNewsCard";
import sampleAdd1 from "../assets/sample-add-300x250.png";
import sampleAdd2 from "../assets/sample-add-728x90.png";
import RecentPostCard from "../components/RecentPostCard";
import { motion } from "framer-motion";
import useAuth from "../context/useAuth";

export default function HomePage() {
  const { userType, postList } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [postCategory, setPostCategory] = useState("All");
  const [postCategory2, setPostCategory2] = useState("Business");

  // Image and Video Post Variable
  let imagePost = postList?.filter((e) => e?.postType === "imagePost")[0];
  let imagePost2 = postList?.filter((e) => e?.postType === "imagePost")[1];
  let imagePost3 = postList?.filter((e) => e?.postType === "imagePost")[2];
  let videoPost = postList?.filter((e) => e?.postType === "videoPost")[0];
  let videoPost2 = postList?.filter((e) => e?.postType === "videoPost")[1];
  let videoPost3 = postList?.filter((e) => e?.postType === "videoPost")[2];
  let videoPost4 = postList?.filter((e) => e?.postType === "videoPost")[3];

  return (
    <div className="">
      {/* First screen */}
      <div className="">
        <div className="md:grid grid-cols-2 md:space-x-2">
          {/* 1st img */}
          <motion.div
            className="mb-4 md:mb-0 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              className="h-[400px] md:h-full w-full object-fill rounded-sm"
              src={imagePost?.imageUrl}
              alt=""
            />

            <div
              className="p-4 absolute bottom-0 md:bottom-5 uppercase font-semibold text-white cursor-pointer"
              onClick={() =>
                navigate({
                  pathname: "../imagePostDetails",
                  search: createSearchParams({
                    postId: imagePost?.id,
                    og: imagePost?.title,
                    og: imagePost?.imageUrl,
                  }).toString(),
                })
              }
            >
              <h2 className="text-sm">
                {imagePost?.addedAt?.toDate()?.toLocaleString("en-In")}
              </h2>
              <h2 className="text-sm">{`${imagePost?.category} || ${imagePost?.subCategory}`}</h2>
              <h2 className="mt-2 text-sm sm:text-lg md:text-xl font-bold">
                {imagePost?.title}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-rows-2 space-y-1">
            {/* 2nd img */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 100, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                className="h-80 w-full object-fill rounded-sm"
                src={imagePost2?.imageUrl}
                alt=""
              />
              <div
                className="p-4 absolute bottom-0 uppercase font-semibold text-white cursor-pointer"
                onClick={() =>
                  navigate({
                    pathname: "../imagePostDetails",
                    search: createSearchParams({
                      postId: imagePost2?.id,
                      og: imagePost2?.title,
                      og: imagePost2?.imageUrl,
                    }).toString(),
                  })
                }
              >
                <h2 className="text-sm">
                  {imagePost2?.addedAt?.toDate()?.toLocaleString("en-In")}
                </h2>
                <h2 className="text-sm">{`${imagePost2?.category} || ${imagePost2?.subCategory}`}</h2>
                <h2 className="mt-2 text-sm sm:text-lg font-bold">
                  {imagePost2?.title}
                </h2>
              </div>
            </motion.div>

            {/* 3rd img */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 100, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                className="h-80 w-full object-fill rounded-sm"
                src={imagePost3?.imageUrl}
                alt=""
              />
              <div
                className="p-4 absolute bottom-0 uppercase font-semibold text-white cursor-pointer"
                onClick={() =>
                  navigate({
                    pathname: "../imagePostDetails",
                    search: createSearchParams({
                      postId: imagePost3?.id,
                      og: imagePost3?.title,
                      og: imagePost3?.imageUrl,
                    }).toString(),
                  })
                }
              >
                <h2 className="text-sm">
                  {imagePost3?.addedAt?.toDate()?.toLocaleString("en-In")}
                </h2>
                <h2 className="text-sm">{`${imagePost3?.category} || ${imagePost3?.subCategory}`}</h2>
                <h2 className="mt-2 text-sm sm:text-lg font-bold">
                  {imagePost3?.title}
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Second screen */}
      <div className="p-4 overflow-hidden">
        <div>
          <div className="mb-6 h-8 flex justify-center space-x-4">
            <motion.button
              className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-blue-600 hover:text-white duration-500 ${
                postCategory === "All" &&
                "border-b-4 border-blue-600 text-blue-600"
              }`}
              initial={{ opacity: 0, scale: 1.4 }}
              whileInView={{ opacity: 100, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onClick={() => setPostCategory("All")}
            >
              All
            </motion.button>
            <motion.button
              className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-blue-600 hover:text-white duration-500 ${
                postCategory === "Latest News" &&
                "border-b-4 border-blue-600 text-blue-600"
              }`}
              initial={{ opacity: 0, scale: 1.4 }}
              whileInView={{ opacity: 100, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onClick={() => setPostCategory("Latest News")}
            >
              Latest
            </motion.button>
            <motion.button
              className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-blue-600 hover:text-white duration-500 ${
                postCategory === "Viral News" &&
                "border-b-4 border-blue-600 text-blue-600"
              }`}
              initial={{ opacity: 0, scale: 1.4 }}
              whileInView={{ opacity: 100, scale: 1,  }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onClick={() => setPostCategory("Viral News")}
            >
              Viral
            </motion.button>
            <motion.button
              className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-blue-600 hover:text-white duration-500 ${
                postCategory === "Sports" &&
                "border-b-4 border-blue-600 text-blue-600"
              }`}
              initial={{ opacity: 0, scale: 1.4 }}
              whileInView={{ opacity: 100, scale: 1,  }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              onClick={() => setPostCategory("Sports")}
            >
              Sports
            </motion.button>
          </div>
        </div>
        <div className="md:flex md:justify-evenly">
          <div className="p-4">
            <div className="mx-auto max-w-[500px] h-screen overflow-y-scroll">
              {postList
                ?.filter((e) =>
                  postCategory === "All"
                    ? postList
                    : e?.category === postCategory
                )
                ?.filter((e) => e?.postType === "imagePost")
                ?.slice(0, 10)
                ?.map((item) => (
                  <motion.div
                    key={item?.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 100, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {
                      <RecentPostCard
                        title={item?.title}
                        image={item?.imageUrl}
                        date={item?.addedAt?.toDate()?.toLocaleDateString("en-In")}
                      />
                    }
                  </motion.div>
                ))}
            </div>
          </div>
          <div className="p-4">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 100, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-gray-500 text-center text-xs">
                - Advertisement -
              </h2>
              <img className="w-96 h-72 mx-auto" src={sampleAdd1} alt="" />
              {userType === "admin" && (
                <span className="p-1 px-3 z-10 absolute top-0 right-0 bg-red-600 font-bold text-white rounded-full">
                  1
                </span>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 100, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="mt-6 p-4 max-w-96 sm:w-96 h-fit mx-auto bg-stone-300">
                <h2 className="mt-2 font-semibold text-center">SIGNUP</h2>
                <p className="mt-6 font-semibold">
                  Get the recent popular stories straight into your inbox
                </p>
                <div>
                  <input
                    className="mt-4 p-2 w-full bg-white focus:outline-none"
                    placeholder="Enter Email Id"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                  />
                  <button
                    className="mt-4 p-4 w-full bg-red-500 font-bold text-white"
                    onClick={() =>
                      navigate("../register", { state: { userEmail } })
                    }
                  >
                    SIGNUP
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3rd screen */}
      <div className="bg-black">
        <iframe
          className="w-full h-60 md:h-72 lg:h-96 object-fill from-neutral-500"
          src={`https://youtube.com/embed/${
            videoPost?.videoUrl?.split("/")[3]
          }?autoplay=0?controls=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />

        <div className="pt-12 pb-3 grid sm:grid-cols-3 bg-black">
          <motion.div
            className="m-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <VideoNewsCard
              youtubeUrl={videoPost2?.videoUrl}
              title={videoPost2?.title}
              postDate={videoPost2?.addedAt?.toDate()?.toLocaleDateString("en-In")}
              postCategory={videoPost2?.category}
              subCategory={videoPost2?.subCategory}
              titleStyle="text-white"
              navigateTo="../videoPostDetails"
              postId={videoPost2?.id}
            />
          </motion.div>
          <motion.div
            className="m-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <VideoNewsCard
              youtubeUrl={videoPost3?.videoUrl}
              title={videoPost3?.title}
              postDate={videoPost3?.addedAt?.toDate()?.toLocaleDateString("en-In")}
              postCategory={videoPost3?.category}
              subCategory={videoPost3?.subCategory}
              titleStyle="text-white"
              navigateTo="../videoPostDetails"
              postId={videoPost3?.id}
            />
          </motion.div>
          <motion.div
            className="m-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <VideoNewsCard
              youtubeUrl={videoPost4?.videoUrl}
              title={videoPost4?.title}
              postDate={videoPost4?.addedAt?.toDate()?.toLocaleDateString("en-In")}
              postCategory={videoPost4?.category}
              subCategory={videoPost4?.subCategory}
              titleStyle="text-white"
              navigateTo="../videoPostDetails"
              postId={videoPost4?.id}
            />
          </motion.div>
        </div> 
      </div>

      {/* 4th screen */}
      {/* Video Post Mapping */}
      <div className="mt-6">
        <div className="">
          <h2 className="mb-4 text-gray-500 text-center text-xs">
            - Advertisement -
          </h2>
          <div className="w-[728px] h-[90px] mx-auto relative">
            <img className="" src={sampleAdd2} alt="" />
            {userType === "admin" && (
              <span className="p-1 px-3 z-10 absolute -top-8 right-0 bg-red-600 font-bold text-white rounded-full">
                2
              </span>
            )}
          </div>
        </div>
        <h2 className="mt-10 pb-6 text-xl text-center text-red-500 font-bold">
          TRENDING POSTS
        </h2>
        <div className="mx-6 md:mx-16 lg:mx-32 grid sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {postList
            ?.filter((e) => e?.postType === "videoPost")
            ?.slice(0, 6)
            ?.map((item) => (
              <motion.div
                className="m-2"
                key={item?.id}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 100, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <VideoNewsCard
                  title={item?.title}
                  postDate={item?.addedAt?.toDate()?.toLocaleDateString("en-In")}
                  postCategory={item?.category}
                  youtubeUrl={item?.videoUrl}
                  subCategory={item?.subCategory}
                  desc={item?.desc}
                  navigateTo="../videoPostDetails"
                  postId={item?.id}
                />
              </motion.div>
            ))}
        </div>
      </div>

      {/* 5th screen */}
      <div className="my-6 pt-1 bg-black">
        <div className="my-6 h-10 flex justify-center space-x-4 text-lg uppercase font-semibold text-white scale-75 sm:scale-100">
          <button
            className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-white hover:text-black duration-500 ${
              postCategory2 === "Business" &&
              "border-b-4 border-white text-white"
            }`}
            onClick={() => setPostCategory2("Business")}
          >
            Business
          </button>
          <button
            className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-white hover:text-black duration-500 ${
              postCategory2 === "Career" && "border-b-4 border-white text-white"
            }`}
            onClick={() => setPostCategory2("Career")}
          >
            Career
          </button>
          <button
            className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-white hover:text-black duration-500 ${
              postCategory2 === "Entertainment" &&
              "border-b-4 border-white text-white"
            }`}
            onClick={() => setPostCategory2("Entertainment")}
          >
            Entertainment
          </button>
          <button
            className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-white hover:text-black duration-500 ${
              postCategory2 === "Politics" &&
              "border-b-4 border-white text-white"
            }`}
            onClick={() => setPostCategory2("Politics")}
          >
            Politics
          </button>
          <button
            className={`px-3 py-1 uppercase font-bold rounded-sm hover:bg-white hover:text-black duration-500 ${
              postCategory2 === "World" && "border-b-4 border-white text-white"
            }`}
            onClick={() => setPostCategory2("World")}
          >
            World
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {postList
            ?.filter((e) => e?.postType === "imagePost")
            ?.filter((e) => e?.category === postCategory2)

            ?.slice(0, 6)
            ?.map((item) => (
              <motion.div
                className="m-4"
                key={item?.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 100, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ImageNewsCard
                  title={item?.title}
                  postDate={item?.addedAt?.toDate()?.toLocaleDateString("en-In")}
                  postCategory={item?.category}
                  subCategory={item?.subcategory}
                  desc={item?.desc}
                  imageUrl={item?.imageUrl}
                  navigateTo="../imagePostDetails"
                  postId={item?.id}
                  titleStyle="text-white"
                />
              </motion.div>
            ))}
        </div>
      </div>
 
      {/* 6th screen */}
      <div className="py-12 bg-stone-300">
        <div className="">
          <h2 className="mb-4 text-gray-500 text-center text-xs">
            - Advertisement -
          </h2>
          <div className="w-[728px] h-[90px] mx-auto relative">
            <img className="object-fill mx-auto" src={sampleAdd2} alt="" />
            {userType === "admin" && (
              <span className="p-1 px-3 z-10 absolute -top-8 right-0 bg-red-600 font-bold text-white rounded-full">
                3
              </span>
            )}
          </div>
        </div>

        <h2 className="mt-20 text-center text-xl font-bold">STAY UPDATED</h2>
        <h2 className="text-center text-lg font-semibold">
          Get the recent popular news straight into your inbox
        </h2>
        <div className="mt-12 flex justify-center scale-75 sm:scale-100">
          <input
            className="p-3 w-72 bg-white focus:outline-none"
            placeholder="Enter Email Id"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            className="px-8 bg-red-500 font-bold text-white"
            onClick={() => navigate("../register", { state: { userEmail } })}
          >
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  );
}
