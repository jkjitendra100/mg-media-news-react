import React from "react";
import checkIcon from "../assets/checkIcon2.png";

export default function SuccessComponent({ label }) {
  return (
    <div className="">
      <div className="fixed z-10 inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />
      <div className="fixed left-64 z-10 inset-0 overflow-y-auto">
        <div className="mt-72 w-60 h-44 mx-auto relative bg-whit rounded-md">
          <div className="mx-auto">
            <img className="mx-auto w-32 h-32" src={checkIcon} alt="" />
            <h2 className="font-semibold text-[#00b100] text-lg text-center">
              {label}
            </h2>
          </div>
        </div> 
      </div>
    </div>
  );
}
