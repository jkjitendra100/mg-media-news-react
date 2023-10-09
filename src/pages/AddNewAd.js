import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadingComponent from "../components/FileUploadingComponent";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import TextInputComponent from "../components/TextInputComponent";
import { advertisements } from "../jsonFiles/advertisements";
import { async } from "@firebase/util";
import { db } from "../firebase";
import useAuth from "../context/useAuth";
import LoadingComponent from "../components/LoadingComponent";
import SuccessComponent from "../components/SuccessComponent";
import { useEffect } from "react";

export default function AddNewAd() {
  const { user, userType, designation } = useAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const [adNo, setAdNo] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandAddress, setBrandAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adAmount, setAdAmount] = useState("");
  const [adValidity, setAdValidity] = useState("");
  const [adImage, setAdImage] = useState("");
  const [agreementCopy, setAgreementCopy] = useState("");
  const [navigationUrl, setNavigationUrl] = useState("");
  const [document, setDocument] = useState("");

  // Additional useststes
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const handleOnSubmit = async () => {
    setLoading(true);
    await addDoc(collection(db, "mgAdvertisements"), {
      adNo,
      brandName,
      brandAddress,
      ownerName,
      mobile,
      altMobile,
      email,
      adAmount,
      adValidity,
      adImage,
      agreementCopy,
      navigationUrl,

      // Additional objects
      status: "active",
      userId: user?.uid,
      userType,
      designation,
      createdAt: serverTimestamp(),

      // Updates
      updates: [
        {
          adNo,
          brandName,
          brandAddress,
          ownerName,
          mobile,
          altMobile,
          email,
          adAmount,
          adValidity,
          adImage,
          agreementCopy,
          navigationUrl,
          userId: user?.uid,
          userType,
          designation,
          updatedAt: Date.now(),
        },
      ],
    })?.then((e) => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 1200);
    });
  };

  const handleOnUploadFile = (fileType) => {
    if (!document) alert("Please choose image first");
    else {
      setFileLoading(true);
      // Upload Image
      const storageRef = ref(storage, "advertisements/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, document);

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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            switch (fileType) {
              case "Agreement Copy":
                setAgreementCopy({
                  docName: document?.name,
                  docType: document?.type,
                  docUrl: downloadURL,
                });
                setFileLoading(false);
                break;

              case "Ad Image":
                setAdImage({
                  docName: document?.name,
                  docType: document?.type,
                  docUrl: downloadURL,
                });
                setFileLoading(false);
                break;

              default:
                alert("Something went wrong !");
            }
          });
        }
      );
    }
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-md shadow md shadow-gray-500 border">
        <h2 className="mb-4 text-center font-semibold text-lg">ADD NEW AD</h2>
        <div className="grid grid-cols-3">
          <TextInputComponent
            label="Advertisement No."
            value={adNo}
            onChangeValue={setAdNo}
            placeholder="Enter advertisement no. here"
            mandatory={true}
          />

          <div className="mx-2 mt-4 shadow-sm shadow-gray-400 rounded-sm">
            <h2 className="mb-1 text-sm">Ad Dimensions (w x h)</h2>
            <h2 className="p-2 w-full rounded-sm border border-slate-500 bg-gray-500 text-white focus:outline-sky-600">
              {adNo
                ? advertisements?.find((e) => e?.advertisementNo === adNo)
                    ?.width +
                  " X " +
                  advertisements?.find((e) => e?.advertisementNo === adNo)
                    ?.height
                : "---"}
            </h2>
          </div>

          <div className="mx-2 mt-4 shadow-sm shadow-gray-400 rounded-sm">
            <h2 className="mb-1 text-sm">Page Name</h2>
            <h2 className="p-2 w-full rounded-sm border border-slate-500 bg-gray-500 text-white focus:outline-sky-600">
              {adNo
                ? advertisements?.find((e) => e?.advertisementNo === adNo)
                    ?.page + ""
                : "---"}
            </h2>
          </div>

          <TextInputComponent
            label="Brand Name"
            value={brandName}
            onChangeValue={setBrandName}
            placeholder="Enter brand name here"
            mandatory={true}
          />

          <TextInputComponent
            label="Full Address (Brand/ Company)"
            value={brandAddress}
            onChangeValue={setBrandAddress}
            placeholder="Enter full address here"
            mandatory={true}
          />

          <TextInputComponent
            label="Full Name (Owner)"
            value={ownerName}
            onChangeValue={setOwnerName}
            placeholder="Enter owner full name here"
            mandatory={true}
          />

          <TextInputComponent
            label="Mobile No."
            value={mobile}
            onChangeValue={setMobile}
            placeholder="Enter owner mobile no."
            type="number"
            mandatory={true}
          />

          <TextInputComponent
            label="Alt. Mobile (Optional)"
            value={altMobile}
            onChangeValue={setAltMobile}
            placeholder="Enter alternate mobile no."
            type="number"
          />

          <TextInputComponent
            label="Email Id (Owner)"
            value={email}
            onChangeValue={setEmail}
            placeholder="Enter owner email id"
            mandatory={true}
          />

          <TextInputComponent
            label="Ad Validity (Days)"
            value={adValidity}
            onChangeValue={setAdValidity}
            placeholder="Enter ad validity in days"
            type="number"
            mandatory={true}
          />

          <TextInputComponent
            label="Ad Amount (INR)"
            value={adAmount}
            onChangeValue={setAdAmount}
            placeholder="Enter ad amount paid by owner"
            type="number"
            mandatory={true}
          />

          <TextInputComponent
            label="Navigation URL"
            value={navigationUrl}
            onChangeValue={setNavigationUrl}
            placeholder="Enter navigation url here"
          />
        </div>

        <h2 className="mt-10 text-xl font-semibold text-gray-700">
          Upload Important Documents
        </h2>
        <div className="flex gap-4">
          <FileUploadingComponent
            label="Upload Agreement Copy"
            onChangeFileName={setDocument}
            docUrl={agreementCopy}
            setDocUrl={setAgreementCopy}
            fileLoading={fileLoading}
            handleOnClick={() => handleOnUploadFile("Agreement Copy")}
            mandatory={true}
          />
          <FileUploadingComponent
            label="Upload Ad Image"
            onChangeFileName={setDocument}
            docUrl={adImage}
            setDocUrl={setAdImage}
            fileLoading={fileLoading}
            handleOnClick={() => handleOnUploadFile("Ad Image")}
            mandatory={true}
          />
        </div>

        <div className="mt-20 flex justify-end gap-6">
          <button className="w-40 p-2 bg-white text-gray-700 font-semibold border-2 border-gray-600 rounded-md hover:text-gray-600 hover:bg-gray-300 duration-500">
            CANCEL
          </button>
          {adNo &&
          brandName &&
          brandAddress &&
          ownerName &&
          mobile &&
          email &&
          adValidity &&
          adAmount &&
          agreementCopy &&
          adImage &&
          adValidity ? (
            <button
              className="w-40 p-2 bg-green-600 text-white font-semibold border-2 border-green-600 rounded-md hover:text-green-600 hover:bg-white duration-500"
              onClick={handleOnSubmit}
            >
              SUBMIT
            </button>
          ) : (
            <button className="w-40 p-2 bg-green-400 text-white font-semibold border-2 border-green-400 rounded-md cursor-not-allowed">
              SUBMIT
            </button>
          )}
        </div>
      </div>
      {loading && <LoadingComponent label="Processing..." />}
      {success && <SuccessComponent label="Ad Submitted Successfully" />}
    </div>
  );
}
