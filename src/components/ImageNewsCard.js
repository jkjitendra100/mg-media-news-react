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
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { FacebookIcon } from "react-share";

export default function ImageNewsCard({
  title,
  postDate = "",
  postCategory,
  subCategory,
  imageUrl,
  titleStyle,
  facebookUrl = "#",
  twitterUrl = "#",
  youtubeUrl = "#",
  navigateTo = "#",
  postId,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-auto">
      <div className="">
        <div className="">
          <div className="w-[98%] pt-[50%] mx-auto relative">
            <img
              className="w-full h-full absolute top-0 bottom-0 left-0 right-0 object-fill"
              src={imageUrl}
            />
          </div>
          <h2
            className={`mt-2 h-8 sm:h-12 md:h-14 text-xs sm:text-base md:text-lg font-seibold overflow-hidden cursor-pointer ${titleStyle}`}
            onClick={() =>
              navigate({
                pathname: navigateTo,
                search: createSearchParams({
                  postId: postId,
                  og: title,
                  og: imageUrl,
                }).toString(),
              })
            }
          >
            {title}
          </h2>
          <div className="uppercase text-gray-400">
            <h2 className="text-xs">Posted on - {postDate}</h2>
            <h2 className="uppercase text-sm font-semibold">{`${postCategory} || ${subCategory}`}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
