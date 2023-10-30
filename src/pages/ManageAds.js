import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadingComponent from "../components/FileUploadingComponent";
import TextInputComponent from "../components/TextInputComponent";
import useAuth from "../context/useAuth";
import { db, storage } from "../firebase";
import { advertisements } from "../jsonFiles/advertisements";

export default function ManageAds() {
  const { adsList } = useAuth();
  const navigate = useNavigate();
  const [adNo, setAdNo] = useState("");
  const [adDetails, setAdDetails] = useState("");

  // Additional useststes
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div>
      <div className="">
        <button
          className="px-4 py-1 fixed right-4 top-24 bg-blue-600 font-semibold text-white text-sm rounded-md shadow-md shadow-gray-400 border-2 border-blue-600 hover:bg-white hover:text-blue-600 duration-500"
          onClick={() => navigate("../addNewAd")}
        >
          ADD NEW AD
        </button>
      </div>
      <div className="">
        <div className="p-4 bg-white rounded-md shadow md shadow-gray-500 border">
          <h2 className="mb-4 text-center font-semibold text-lg">
            GET ADVERTISEMENT DETAILS
          </h2>
          <div className="w-80">
            <TextInputComponent
              label="Enter Advertisement No."
              value={adNo}
              onChangeValue={setAdNo}
              placeholder="Enter advertisement no. here"
            />
          </div>
        </div>

        <div className="p-4 mt-4 grid grid-cols-2 border-2 border-gray-300 bg-white shadow-sm shadow-gray-400 rounded-md">
          <div>
            <h2 className="underline text-lg font-semibold text-gray-700">
              AD DETAILS
            </h2>
            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Advertisement No.</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {String(adNo).padStart(2, "0")}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Width (px)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {" "}
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.width
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Height (px)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {" "}
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.height
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Page Name</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.page
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">View Ad</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <a
                className="w-fit text-blue-600 hover:font-semibold duration-500 cursor-pointer"
                href="#"
              >
                {adsList?.find((e) => e?.adNo === adNo)?.navigationUrl
                  ? adsList?.find((e) => e?.adNo === adNo)?.navigationUrl
                  : "---"}
              </a>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Ad Validity (Days)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {adsList?.find((e) => e?.adNo === adNo)?.adValidity
                  ? adsList?.find((e) => e?.adNo === adNo)?.adValidity
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Ad Id</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {adsList?.find((e) => e?.adNo === adNo)?.id
                  ? adsList?.find((e) => e?.adNo === adNo)?.id
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Status</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-bold uppercase">
                {adsList?.find((e) => e?.adNo === adNo)?.status
                  ? adsList?.find((e) => e?.adNo === adNo)?.status
                  : "---"}
              </h2>
            </div>
          </div>

          <div>
            <h2 className="underline text-lg font-semibold text-gray-700">
              OWNER DETAILS
            </h2>
            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Advertisement No.</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {String(adNo).padStart(2, "0")}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Width (px)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {" "}
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.width
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Height (px)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {" "}
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.height
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Page Name</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {advertisements?.find((e) => e?.adNo === adNo)
                  ? advertisements?.find((e) => e?.adNo === adNo)?.page
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">View Ad</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <a
                className="w-fit text-blue-600 hover:font-semibold duration-500 cursor-pointer"
                href="#"
              >
                {adsList?.find((e) => e?.adNo === adNo)?.navigationUrl
                  ? adsList?.find((e) => e?.adNo === adNo)?.navigationUrl
                  : "---"}
              </a>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Ad Validity (Days)</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {adsList?.find((e) => e?.adNo === adNo)?.adValidity
                  ? adsList?.find((e) => e?.adNo === adNo)?.adValidity
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Ad Id</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-semibold">
                {adsList?.find((e) => e?.adNo === adNo)?.id
                  ? adsList?.find((e) => e?.adNo === adNo)?.id
                  : "---"}
              </h2>
            </div>

            <div className="m-3 flex">
              <h2 className="w-40 text-gray-600">Status</h2>
              <h2 className="w-16 font-semibold">:</h2>
              <h2 className="text-gray-700 font-bold uppercase">
                {adsList?.find((e) => e?.adNo === adNo)?.status
                  ? adsList?.find((e) => e?.adNo === adNo)?.status
                  : "---"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
