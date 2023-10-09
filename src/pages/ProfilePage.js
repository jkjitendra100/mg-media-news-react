import React, { useEffect, useState } from "react";
import { async } from "@firebase/util";
import useAuth from "../context/useAuth";
import { getAuth, updateProfile } from "firebase/auth";
import TextInputComponent from "../components/TextInputComponent";
import FileUploadingComponent from "../components/FileUploadingComponent";
import loadingGif from "../assets/loadingSpinner.gif";
import userIcon from "../assets/userIcon.png";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import PageTitle from "../components/PageTitle";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const storage = getStorage();
  const [updateUserProfile, setUpdateUserProfile] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userImgUrl, setUserImgUrl] = useState();

  // Additional usestates
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(() => (user?.displayName ? user?.displayName : ""));
      setUserImgUrl(() =>
        user?.photoURL
          ? { docName: "Profile Photo", docUrl: user?.photoURL }
          : ""
      );
    }
  }, [updateUserProfile, user]);

  if (!user) {
    return <Navigate to="../home" />;
  }

  const handleOnLogout = () => {
    let userRes = window.confirm("Are you sure, you want to logout ?");
    if (userRes) {
      logout();
    }
  };

  const handleOnUpdateProfile = () => {
    setLoading(true);
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: userImgUrl?.docUrl,
    })
      .then(() => {
        setLoading(false);
        setUpdateUserProfile(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnUploadDocuments = () => {
    if (!userImg) alert("Please choose a file first");
    else {
      setFileLoading(true);
      // Upload Image
      const storageRef = ref(
        storage,
        "profilePhotoes/" + user?.email + "_" + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, userImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // eslint-disable-next-line default-case
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
          // eslint-disable-next-line default-case
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
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              setUserImgUrl({
                docName: userImg?.name,
                docUrl: downloadURL,
              });
            })
            ?.then(() => {
              setUserImg("");
            });
        }
      );
    }
  };

  return (
    <div className="p-4">
      {!updateUserProfile && (
        <div className="p-4 mx-auto m-4 w-96 bg-gray-50 rounded-md shadow-xl shadow-slate-400 border-2 border-gray-200">
          <div className="p-0.5 w-fit mx-auto text-center rounded-full shadow-lg shadow-gray-300 bg-gray-300">
            {user?.photoURL ? (
              <img
                className="w-40 h-40 mx-auto rounded-full object-fill"
                src={user?.photoURL}
                alt="user"
              />
            ) : (
              <img
                className="w-40 h-40 mx-auto rounded-full object-fill"
                src={userIcon}
                alt="user"
              />
            )}
          </div>
          <div className=" mt-4 mb-6 text-xl">
            <h2 className="font-semibold text-center">
              Hi, {user?.displayName?.split(" ")[0]}
            </h2>
          </div>

          <div className="my-2">
            <h2 className="text-sm text-gray-600">Username</h2>
            <h2 className="p-2 text-gray-700 font-semibold border border-gray-400 rounded-md overflow-hidden">
              {user?.displayName ? user?.displayName : "---"}
            </h2>
          </div>

          <div className="my-2">
            <h2 className="text-sm text-gray-600">Username</h2>
            <h2 className="p-2 text-gray-700 font-semibold border border-gray-400 rounded-md overflow-hidden">
              {user?.email}
            </h2>
          </div>

          <div className="my-2">
            <h2 className="text-sm text-gray-600">user Id</h2>
            <h2 className="p-2 text-gray-700 font-semibold border border-gray-400 rounded-md overflow-hidden">
              {user?.uid}
            </h2>
          </div>

          <div className=" mt-20 flex justify-center">
            <button
              className="mx-2 px-2 py-1 w-1/2 flex justify-center outline-double outline-red-600 rounded-sm font-semibold bg-[#ff1717] text-white hover:bg-white hover:text-red-600 hover:scale-105 duration-500"
              onClick={handleOnLogout}
            >
              Logout
              <RiLogoutCircleRFill className="w-6 h-6 ml-4" />
            </button>

            <button
              className="mx-2 px-2 py-1 w-1/2 flex justify-center outline-double outline-blue-700 rounded-sm font-semibold  bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:scale-105 duration-500"
              onClick={() => setUpdateUserProfile(true)}
            >
              Update Profile
              <FaUserAlt className="w-5 h-5 ml-4" />
            </button>
          </div>
        </div>
      )}

      {updateUserProfile && (
        <div className="p-4 pt-2 mx-auto m-4 w-96 bg-white rounded-md shadow-md shadow-slate-400">
          <h2 className="mb-6 underline text-center font-semibold text-slate-700">
            UPDATE YOUR PROFILE
          </h2>
          <TextInputComponent
            label="Enter Name"
            inputValue={userName}
            onChangeValue={setUserName}
            placeholder={
              user?.displayName ? user?.displayName : "Enter your name here"
            }
          />

          <FileUploadingComponent
            label="Change Profile Photo"
            onChangeFileName={setUserImg}
            handleOnClick={handleOnUploadDocuments}
            docUrl={userImgUrl}
            setDocUrl={setUserImgUrl}
            fileLoading={fileLoading}
            fileError=""
          />

          <div className="mt-24 flex justify-center">
            {!loading ? (
              <>
                <button
                  className="mx-2 px-2 py-1.5 w-1/2 flex justify-center outline-double outline-red-600 rounded-sm font-semibold  bg-red-600 text-white hover:bg-white hover:text-red-600 hover:scale-105 duration-500"
                  onClick={() => setUpdateUserProfile(false)}
                >
                  CANCEL
                </button>

                {!userImg ? (
                  <button
                    className="mx-2 px-2 py-1.5 w-1/2 flex justify-center outline-double outline-blue-700 rounded-sm font-semibold  bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:scale-105 duration-500"
                    onClick={handleOnUpdateProfile}
                  >
                    UPDATE
                  </button>
                ) : (
                  <button className="mx-2 px-2 py-1.5 w-1/2 flex justify-center outline-double outline-blue-700 rounded-sm font-semibold  bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:scale-105 duration-500">
                    UPDATE
                  </button>
                )}
              </>
            ) : (
              <img className="w-12 h-10" src={loadingGif} alt="" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
