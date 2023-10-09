import React from "react";
import { MdDateRange } from "react-icons/md";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaLinkedin,
  FaWhatsappSquare,
  FaYoutube,
  FaReadme,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TextNewsCard({
  title,
  desc,
  postDate,
  facebookUrl = "#",
  twitterUrl = "#",
  youtubeUrl = "#",
}) {
  return (
    <div className="m-4 p-4 bg-gray-100 rounded-md shadow-md shadow-gray-500">
      <div>
        <h2 className="font-semibold text-xl">{title}</h2>

        <div className="mt-4 flex">
          <MdDateRange className="text-xl" />
          <span className="text-sm">{postDate}</span>
        </div>

        <p className="mt-2 h-36 overflow-hidden">{desc}...</p>

        <div className="mt-6 flex space-x-3">
          <FaFacebookSquare className="w-7 h-7 bg-white text-blue-600" />
          <FaTwitterSquare className="w-7 h-7 bg-white text-cyan-600" />
          <FaPinterestSquare className="w-7 h-7 bg-white text-red-600" />
          <FaLinkedin className="w-7 h-7 bg-white text-blue-600" />
          <FaWhatsappSquare className="w-7 h-7 bg-white text-green-600" />
        </div>
        <h2 className="mt-6 border border-slate-300" />

        <div className="mt-8 flex justify-end space-x-4">
          <a
            className="px-3 py-2.5 my-auto flex space-x-2 bg-red-600 text-sm text-white rounded-md"
            href={youtubeUrl}
            target="_blank"
          >
            <FaYoutube className="text-lg text-white" />
            <h2 className="">Watch Video</h2>
          </a>

          <Link
            className="px-3 py-2.5 my-auto flex space-x-2 bg-green-600 text-sm text-white rounded-md"
            to={twitterUrl}
          >
            <FaReadme className="mt-0.5 text-lg text-white" />
            <h2 className="">Read More</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
