import React from "react";
import loadingSpinner from "../assets/loadingSpinner.gif";

function LoadingComponent({ label = "LOADING..." }) { 
  return (
    <div className="z-10 fixed top-0 bottom-0 right-0 left-0 select-none">
      <div className="fixed w-screen h-screen bg-white opacity-70" />
      <div className="fixed z-0 left-72 inset-0 overflow-y-auto">
        <div className="w-48 h-60 mt-72 mx-auto my-auto relative bg-whit rounded-md">
          <div className="mx-auto">
            <img className="mx-auto w-28 h-24 py-1" src={loadingSpinner} alt="" />
            <h2 className="p-2 font-semibold text-fuchsia-600 text-xl text-center">
              {label}
            </h2>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default LoadingComponent;
