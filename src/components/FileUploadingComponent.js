import React, { useState } from "react";
import uploadIcon from "../assets/uploadIcon.png";
import loadingSpinner from "../assets/fileLoading.gif";

function FileUploadingComponent({
  label,
  onChangeFileName,
  fileError,
  handleOnClick,
  image = uploadIcon,
  docUrl,
  setDocUrl,
  fileLoading,
  mandatory,
  ...rest
}) {
  const [showUploadFileButton, setShowUploadFileButton] = useState(false);
  const [showResetDocUrl, setShowResetDocUrl] = useState(false);

  return (
    <div className="mx-2 mt-4 max-w-sm">
      <h2 className="mb-1 text-sm text-slate-600">
        {label}
        {mandatory && <sup className="ml-0.5 text-[#ff0000] ">{"\u2605"}</sup>}
      </h2>
      <div className="mb-8">
        <div
          className={`p-2 flex relative rounded-sm border border-slate-500 focus:outline-blue-600 ${
            fileError && "border-red-600 focus:outline-red-600 bg-red-100"
          }`}
        >
          {!docUrl ? (
            <div className="relative">
              {!fileLoading && (
                <div className="">
                  <input
                    className={`p-2 focus:outline-blue-600`}
                    onChange={(e) => onChangeFileName(e.target.files[0])}
                    accept=".pdf, .png, .jpeg, .jpg"
                    type="file"
                    onChangeCapture={() => {
                      setShowUploadFileButton(true);
                    }}
                    {...rest}
                  />
                </div>
              )}
              {fileLoading && (
                // Disabled Input and Loading Image
                <div className="flex">
                  <input
                    className="p-2 focus:outline-blue-600 cursor-not-allowed"
                    onChange={(e) => onChangeFileName(e.target.files[0])}
                    type="file"
                    disabled
                  />
                  <img
                    className="w-12 h-12 mx-auto absolute top-0 right-0"
                    src={loadingSpinner}
                    alt="loading"
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <input
                className="p-2 focus:outline-blue-600 cursor-not-allowed"
                onChange={(e) => onChangeFileName(e.target.files[0])}
                type="file"
                disabled
              />
            </>
          )}
        </div>
        <div className="relative">
          {!docUrl ? (
            !fileLoading &&
            (showUploadFileButton ? (
              <button
                className="p-1.5 mt-2 w-24 absolute right-0 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 duration-500"
                onClick={handleOnClick}
              >
                UPLOAD
              </button>
            ) : (
              <button
                className="p-1.5 mt-2 w-24 absolute right-0 text-sm rounded-md bg-green-300 text-white"
                disabled
              >
                UPLOAD
              </button>
            ))
          ) : (
            <>
              <h2 className="-mt-0.5 text-sm font-semibold text-blue-600">
                {docUrl?.docName}
              </h2>
              <div className="-mt-1.5 grid grid-cols-2 absolute right-0 bg-white">
                <button
                  className="p-1.5 mx-1 w-20 text-center text-sm rounded-md bg-red-500 text-white hover:bg-red-600 duration-500"
                  onClick={() => setShowResetDocUrl(true)}
                >
                  REMOVE
                </button>

                <a
                  className="p-1.5 mx-1 w-20 text-center text-sm rounded-md bg-green-500 text-white hover:bg-green-600 duration-500"
                  target="_blank"
                  href={docUrl?.docUrl}
                  rel="noreferrer"
                >
                  VIEW
                </a>
              </div>
            </>
          )}
        </div>
        <h2 className="text-xs text-[#ff0000]">{fileError}</h2>
      </div>

      {/* Reset doc url confirm box */}
      {showResetDocUrl && (
        <div className="z-30 fixed top-0 bottom-0 right-0 left-0">
          <div className="fixed w-screen h-screen bg-gray-600 opacity-90"></div>
          <div className="relative w-5/12 mx-auto mt-40 bg-white shadow-xl rounded-md">
            <h2
              className={`p-2 underline text-center font-bold text-xl text-white bg-red-600`}
            >
              ALERT !!!
            </h2>

            <h2 className="p-2 mt-4 text-center">
              You are going to reset current uploaded document. This action will
              delete the current document.
            </h2>

            <h2 className="p-1 my-4 text-center bg-red-200 font-semibold text-red-600">
              Do you want to delete it ?
            </h2>
            <div className="mt-1 flex justify-end">
              <button
                className="w-24 py-1 m-3 border-2 font-semibold text-white bg-green-500 rounded-md border-green-500 hover:bg-white hover:text-green-600 duration-500 focus:outline-none"
                onClick={() => setShowResetDocUrl(false)}
              >
                NO
              </button>

              <button
                className="w-24 py-1 m-3 border-2 font-semibold text-white bg-red-600 rounded-md border-red-600 hover:bg-white hover:text-red-600 duration-500 focus:outline-none"
                onClick={() => {
                  setDocUrl("");
                  setShowResetDocUrl(false);
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadingComponent;
