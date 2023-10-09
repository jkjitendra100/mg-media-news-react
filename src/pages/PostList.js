import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { postCategoryList } from "../jsonFiles/postCategoryList";
import { TbRefresh } from "react-icons/tb";
import { RiDeleteBin5Line, RiLiveLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function PostList() {
  const { postList } = useAuth();
  const navigate = useNavigate();
  // const [postList, setPostList] = useState([]);

  // useEffect(() => {
  //   const q = query(collection(db, "mgNewsPost"), orderBy("addedAt", "desc"));
  //   onSnapshot(q, (querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc?.id, ...doc?.data() });
  //     });
  //     setPostList(list);
  //   });
  // }, []);

  // Update Live Status
  const handleOnUpdateLiveStatus = async (post) => {
    let userResponse;
    post?.liveStatus === true
      ? (userResponse = window?.confirm(
          `Are you sure you want to remove live status for this post having title \n ${post?.title} ?`
        ))
      : (userResponse = window?.confirm(
          `Are you sure you want to make this post live having title \n ${post?.title} ?`
        ));

    if (!userResponse) {
      return null;
    }

    const updatePost = doc(db, "mgNewsPost", post?.id);
    await updateDoc(updatePost, {
      liveStatus: post?.liveStatus === true ? false : true,
    });
  };

  //Update Post Status
  const handleOnUpdatePostStatus = async (post) => {
    let userResponse = window?.confirm(
      `Are you sure you want to change the status of post having title \n ${post?.title} ?`
    );

    if (!userResponse) {
      return null;
    }

    const updatePost = doc(db, "mgNewsPost", post?.id);
    await updateDoc(updatePost, {
      status: post?.status === "draft" ? "publish" : "draft",
    });
  };

  //Delete Post
  const handleOnDeletePost = async (post) => {
    let userResponse = window?.confirm(
      `Are you sure you want to delete this post having title \n ${post?.title} ?`
    );

    if (!userResponse) {
      return null;
    }

    await deleteDoc(doc(db, "mgNewsPost", post?.id));
  };

  return (
    <div className="p-4 overflow-x-scroll bg-white rounded-md">
      <table className="w-full border-separate border border-slate-500">
        <thead>
          <tr className="uppercase bg-slate-700 text-white">
            <th className="p-4 font-semibold text-lg border border-slate-300">
              SI NO
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Post Title
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Category
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Added At
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Live News
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Status
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Delete
            </th>
            <th className="p-4 font-semibold text-lg border border-slate-300">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {postList?.map((item, index) => (
            <tr
              className={`${index % 2 === 0 ? "bg-white" : "bg-slate-300"}`}
              key={item?.id}
            >
              <td className="p-3 w-16 border border-slate-400 text-center font-semibold">
                {index + 1}.
              </td>
              <td className="p-3 border border-slate-400 text-left">
                {item?.title}
              </td>
              <td className="p-3 border border-slate-400 text-center">
                {
                  item?.category
                }
              </td>
              <td className="p-3 border border-slate-400 text-center">
                {item?.addedAt?.toDate()?.toLocaleString("en-In")}
              </td>
              <td className="w-24 border border-slate-400 text-center">
                {item?.postType === "imagePost" ? (
                  "---"
                ) : (
                  <button
                    className={`p-2 w-full justify-center uppercase font-semibold cursor-pointer hover:scale-110 duration-300 inline-flex ${
                      item?.liveStatus === true
                        ? "bg-red-600 text-white"
                        : "bg-purple-600 text-white"
                    }`}
                    onClick={() => handleOnUpdateLiveStatus(item)}
                  >
                    LIVE
                    <RiLiveLine
                      className={`m-1 ml-2 text-white ${
                        item?.status === "draft" ? "text-black" : "text-white"
                      }`}
                    />
                  </button>
                )}
              </td>

              <td className="border border-slate-400">
                <button
                  className={`p-2 w-26 justify-center uppercase font-semibold cursor-pointer hover:scale-110 duration-300 inline-flex ${
                    item?.status === "draft"
                      ? "bg-yellow-500"
                      : "bg-green-600 text-white"
                  }`}
                  onClick={() => handleOnUpdatePostStatus(item)}
                >
                  {item?.status}
                  <TbRefresh
                    className={`m-1 ml-2 text-white ${
                      item?.status === "draft" ? "text-black" : "text-white"
                    }`}
                  />
                </button>
              </td>

              <td className="border border-slate-400">
                <button
                  className={`p-2 w-24 text-center uppercase font-semibold cursor-pointer hover:scale-110 duration-300 bg-red-600 text-white`}
                  onClick={() => handleOnDeletePost(item)}
                >
                  <h2 className="inline-flex">
                    DELETE <RiDeleteBin5Line className="m-1 ml-2 text-white" />
                  </h2>
                </button>
              </td>

              <td className="border border-slate-400">
                <button
                  className={`p-2 w-24 text-center uppercase font-semibold cursor-pointer hover:scale-110 duration-300 bg-blue-600 text-white`}
                  onClick={() =>
                    navigate("../editPost", { state: { postDetails: item } })
                  }
                >
                  <h2 className="inline-flex">
                    EDIT <BiEditAlt className="m-1 ml-2 text-white" />
                  </h2>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
