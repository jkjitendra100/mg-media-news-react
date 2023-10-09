import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function RecentPostCard({
  title,
  image,
  navigateTo,
  postId,
  date,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="my-3 p-1 flex space-x-2 rounded-smcursor-pointer"
      onClick={() =>
        navigate({
          pathname: navigateTo,
          search: createSearchParams({
            postId: postId,
          }).toString(),
        })
      }
    >
      <div className="my-auto cursor-pointer">
        <img className="w-40 h-24 object-fill" src={image} alt="Image" />
      </div>
      <div className="w-full cursor-pointer">
        <h2 className="p-2 h-14 leading-6 font-semibold overflow-hidden">
          {title}
        </h2>
        <h2 className="p-2 truncate font-semibold text-gray-400 text-sm">
          {`Posted On ${new Date(date?.nanoseconds)?.toLocaleDateString(
            "en-In"
          )}`}
        </h2>
      </div>
    </div>
  );
}
