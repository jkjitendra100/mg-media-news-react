import React from "react";
import checkIcon1 from "../assets/checkIcon1.png";
import crossIcon from "../assets/crossIcon1.png";

function ShowFileComponent({ label, fileUrl, btnTitle }) {
  return (
    <div className="m-2 flex flex-row border border-slate-400 rounded-sm">
      <div className="p-2 flex-1 flex">
        <h2 className="font-semibold">{label}</h2>
        {fileUrl && <img className="ml-2 w-6 h-6" src={checkIcon1} />}
      </div>  
      <label className="p-2 mx-4 font-bold flex-0.5">:</label>
      {fileUrl ? (
        <a
          className="p-2 flex-1 text-blue-600 font-semibold font-serif hover:text-red-600 duration-500"
          href={fileUrl}
          target="_blank"
        >
          {btnTitle}
        </a>
      ) : (
        <div className="flex-1">
          <img className="mt-1 w-16 h-8 mx-auto" src={crossIcon} />
        </div>
      )}
    </div>
  );
}

export default ShowFileComponent;
