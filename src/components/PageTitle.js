import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function PageTitle({ label, navigation = true }) {
  const navigate = useNavigate();
  return (
    <div className="z-10 mb-4 sticky top-16 text-slate-800">
      <h2 className="p-2 relative font-bold uppercase bg-white text-neutral-700 text-lg text-center rounded-md shadow-sm shadow-neutral-400 border border-neutral-300">
        {navigation && (
          <HiArrowNarrowLeft
            className="w-8 h-8 mx-2 absolute left-0 top-1.5 text-black cursor-pointer hover:scale-110 duration-300 hover:text-blue-600"
            onClick={() => navigate(-1)}
          />
        )}
        {label}
      </h2>
    </div>
  );
}
