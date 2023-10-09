import React, { useEffect, useState, useRef } from "react";
import { postCategoryList } from "../jsonFiles/postCategoryList";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";
import useAuth from "../context/useAuth";
import { db } from "../firebase";
import LoadingComponent from "../components/LoadingComponent";
import SuccessComponent from "../components/SuccessComponent";
import { Navigate, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
// Images
import textPost from "../assets/textPost.png";
import imagePost from "../assets/imagePost.png";
import videoPost from "../assets/videoPost.png";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Editor } from "@tinymce/tinymce-react";

export default function AddPost() {
  const navigate = useNavigate();
  const { user, userType, designation } = useAuth();
  const storage = getStorage();
  const editorRef = useRef(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("publish");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [postType, setPostType] = useState("imagePost");

  // Additional usestates
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "seo", "managePostTags"), (doc) => {
      setTagList(doc?.data()?.tagList);
    });
  }, []);

  const handleOnAddTag = (item) => {
    if (!item) {
      return alert("Tag can't be empty");
    }
    if (tagList?.find((e) => e === item)) {
      return alert(`${item} already exists`);
    }
    setTagList(() => [item, ...tagList]);
    setTag("");
  };

  const handleOnAddPost = async (pType) => {
    setLoading(true);
    if (postType === "imagePost" && image === "") {
      alert("Image required !");
      return setLoading(false);
    }

    if (postType === "videoPost" && videoUrl === "") {
      alert("Video url required !");
      return setLoading(false);
    }

    // Add Post to databasa
    switch (postType) {
      case "imagePost":
        {
          // Compress image using image compression library
          let compressedFile;
          const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          try {
            compressedFile = await imageCompression(image, options);
          } catch (error) {
            console.log(error);
          }

          // New compressed file is "compressedFile"
          const storageRef = ref(storage, "imagePost/" + Date.now());
          const uploadTask = uploadBytesResumable(storageRef, compressedFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;

                case "storage/unknown":
                  break;
              }
            },

            async () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await addDoc(collection(db, "mgNewsPost"), {
                    category,
                    subCategory,
                    title,
                    desc: editorRef.current
                      ? editorRef.current.getContent()
                      : "",
                    imageUrl: downloadURL,
                    status,
                    tagList,

                    // Additional objects
                    addedAt: serverTimestamp(),
                    userEmail: user.email,
                    userId: user.uid,
                    userType,
                    designation,
                    postType,

                    // Updates
                    updateDetails: [
                      {
                        updateType: "New Post",
                        updatedAt: Date?.now(),
                        userEmail: user?.email,
                        userId: user?.uid,
                        userType,
                        designation,
                      },
                    ],
                  })?.then(() => {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                      window.location.reload(false);
                    }, 1000);
                  });
                }
              );
            }
          );
        }
        break;

      case "videoPost":
        {
          await addDoc(collection(db, "mgNewsPost"), {
            category,
            subCategory,
            title,
            desc,
            videoUrl,
            status,
            tagList,

            // Additional objects
            addedAt: serverTimestamp(),
            userEmail: user.email,
            userId: user.uid,
            userType,
            designation,
            postType,

            // Updates
            updateDetails: [
              {
                updateType: "New Post",
                updatedAt: Date?.now(),
                userEmail: user?.email,
                userId: user?.uid,
                userType,
                designation,
              },
            ],
          })?.then(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              window.location.reload(false);
            }, 1000);
          });
        }
        break;

      default: {
        alert("Something went wrong !");
        return setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <div className="flex">
        <div className="">
          <div className="w-72 fixed top-20 left-64 z-10 bottom-0 bg-slate-300 overflow-y-scroll">
            <h2 className="p-2 z-10 sticky top-0 uppercase underline text-lg font-bold text-gray-700 text-center bg-slate-300 shadow-md shadow-gray-500">
              Select Post Type
            </h2>
            <button
              className={`p-2 m-4 mb-0 bg-white rounded-md border-4 shadow-md shadow-gray-400 hover:border-red-400 duration-500 ${
                postType === "imagePost"
                  ? "border-green-600 scale-105 duration-500"
                  : "border-gray-600"
              }`}
              onClick={() => {
                setPostType("imagePost");
                setVideoUrl("");
              }}
            >
              <img className="w-60 h-36" src={imagePost} />
            </button>
            <button
              className={`p-2 m-4 mb-0 bg-white rounded-md border-4 shadow-md shadow-gray-400 hover:border-red-400 duration-500 ${
                postType === "videoPost"
                  ? "border-green-600 scale-105 duration-500"
                  : "border-gray-600"
              }`}
              onClick={() => {
                setPostType("videoPost");
                setImage("");
              }}
            >
              <img className="w-60 h-36" src={videoPost} />
            </button>
          </div>
        </div>
        <div className="pt-0 ml-72 bg-white shadow-md shadow-gray-500 rounded-md">
          <h2 className="p-2 bg-gray-700 text-center text-lg font-bold text-white rounded-t-md">
            ADD NEW POST
          </h2>
          <h2 className="mb-4 p-2 underline text-lg text-left font-semibold text-green-600 uppercase border border-gray-300">{`Post Type: ${
            postType === "textPost" ? "Text Post" : ""
          } ${postType === "imagePost" ? "Image Post" : ""} ${
            postType === "videoPost" ? "Video Post" : ""
          }`}</h2>
          <div className="p-4 text-left">
            <div className="grid grid-cols-2">
              <div className="mx-2">
                <h2>
                  Please select Category
                  <span className="text-red-600 text-xl">*</span>
                </h2>
                <select
                  className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option hidden> --- SELECT CATEGORY --- </option>
                  {[...new Set(postCategoryList?.map((e) => e?.cat))]?.map(
                    (item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="mx-2">
                <h2>
                  Please select Sub-Category
                  <span className="text-red-600 text-xl">*</span>
                </h2>
                <select
                  className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option hidden> --- SELECT SUB-CATEGORY --- </option>
                  {postCategoryList
                    ?.filter((e) => e?.cat === category)
                    ?.map((item) => (
                      <option value={item?.subCat} key={item?.subCat}>
                        {item?.subCat}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mx-2">
                <h2>
                  Please Enter Title
                  <span className="text-red-600 text-xl">*</span>
                </h2>
                <input
                  className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title here"
                />
              </div>

              {postType === "imagePost" && (
                <div className="mx-2">
                  <h2>
                    Please Upload Image
                    <span className="text-red-600 text-xl">*</span>
                  </h2>
                  <input
                    className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  />
                </div>
              )}

              {postType === "videoPost" && (
                <div className="mx-2">
                  <h2>
                    Please Enter Video URL
                    <span className="text-red-600 text-xl">*</span>
                  </h2>
                  <input
                    className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Enter video url here"
                  />
                </div>
              )}
            </div>

            <div className="p-2 mx-2 mb-6 bg-gray-600 rounded-md shadow-sm shadow-gray-700">
              <h2 className="font-semibold text-white">
                Please Enter Description
              </h2>
              <div>
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  apiKey={"u2j0p691ks3c6dphfk92onc7d3w2jzios9fswzwkak2vsysf"}
                  init={{
                    height: 350,
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="mx-2 flex">
                <div className="w-full">
                  <h2>Please Enter Post Tag</h2>
                  <input
                    className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter tag here"
                    maxLength={20}
                  />
                </div>
                <button
                  className="m-2 pb-2 px-3 mt-4 h-fit rounded-full text-5xl bg-green-500 text-white hover:bg-green-600 hover:scale-105 duration-300"
                  onClick={() => handleOnAddTag(tag?.toLowerCase())}
                >
                  +
                </button>
              </div>

              <div className="mx-2">
                <h2>Please select Post Status</h2>
                <select
                  className="p-2 mb-4 w-full border border-slate-400 rounded-md"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option hidden> --- SELECT STATUS --- </option>
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </select>
              </div>
            </div>

            <div className="m-2 p-2 border-2 border-cyan-300 rounded-md bg-cyan-200">
              {tagList?.map((item) => (
                <div className="inline-flex" key={item}>
                  <h2 className="p-1 m-2 border border-cyan-500 rounded-md bg-white">
                    {item}
                    <button
                      className="ml-3 px-2 py-0.5 text-red-600 font-semibold bg-white border border-red-600 rounded-full hover:scale-110 hover:text-white hover:bg-red-600 duration-300"
                      onClick={() =>
                        setTagList(() => tagList?.filter((e) => e !== item))
                      }
                    >
                      X
                    </button>
                  </h2>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-end space-x-4">
              <button
                className="p-3 w-56 bg-slate-300 font-bold text-slate-800 hover:bg-slate-400 hover:scale-105 duration-300 shadow-sm shadow-gray-500 rounded-md border border-slate-400"
                onClick={() => navigate("../home")}
              >
                CANCEL
              </button>
              {((postType === "imagePost" && image) ||
                (postType === "videoPost" && videoUrl)) &&
              category &&
              subCategory &&
              title &&
              tagList?.length > 0 &&
              status ? (
                <button
                  className="p-3 w-56 bg-green-500 font-bold text-white hover:bg-green-600 hover:scale-105 duration-300 shadow-sm shadow-gray-500 rounded-md"
                  onClick={handleOnAddPost}
                >
                  ADD POST
                </button>
              ) : (
                <button className="p-3 w-56 bg-green-300 font-bold text-white shadow-sm shadow-gray-500 rounded-md cursor-not-allowed">
                  ADD POST
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingComponent label="Processing.." />}
      {success && <SuccessComponent label="Post Added Successfully" />}
    </div>
  );
}
