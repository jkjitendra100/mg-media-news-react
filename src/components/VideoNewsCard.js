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
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

import { FacebookIcon } from "react-share";

export default function VideoNewsCard({
  title,
  desc,
  postDate = "",
  postCategory,
  subCategory,
  facebookUrl = "#",
  twitterUrl = "#",
  youtubeUrl = "#",
  titleStyle,
  navigateTo,
  postId,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-auto">
      <div className="">
        <div>
          <div className="w-[98%] pt-[50%] mx-auto relative">
            <iframe
              className="w-full h-full absolute top-0 bottom-0 left-0 right-0 object-fill"
              src={`https://youtube.com/embed/${
                youtubeUrl?.split("/")[3]
              }?autoplay=0?controls=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <h2
            className={`mt-2 h-12 md:h-14 md:text-lg font-seibold overflow-hidden cursor-pointer ${titleStyle}`}
            onClick={() =>
              navigate({
                pathname: navigateTo,
                search: createSearchParams({
                  postId: postId,
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
