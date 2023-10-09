import React from "react";
import { RiVipDiamondFill } from "react-icons/ri";
import { BsFillTriangleFill } from "react-icons/bs";

export default function TextHeadingCard({ label, className }) {
  return (
    <div
      className={`h-10 relative select-none scale-75 md:scale-90 lg:scale-100 duration-500 ${className}`}
    >
      <h2 className="p-1.5 mr-6 pl-14 pr-6 relative text-xl text-white font-bold bg-[#ff1717] rounded-r-sm">
        {label}
      </h2>
      <RiVipDiamondFill className="w-10 h-10 absolute top-0 right-0 -rotate-90 text-[#ff1717]" />
      <BsFillTriangleFill className="w-10 h-10 absolute -left-2 top-0 rotate-90 text-gray-100" />
    </div>
  );
}
