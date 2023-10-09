import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import RecentPostCard from "../components/RecentPostCard";
import TextHeadingCard from "../components/TextHeadingCard";
import VideoNewsCard from "../components/VideoNewsCard";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import useAuth from "../context/useAuth";

export default function ImagePostDetails() {
  const { postList } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [postDetails, setPostDetails] = useState("");
  // const [postList, setPostList] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "mgNewsPost", postId), (doc) => {
      setPostDetails(doc?.data());
    });
  }, [postId]);

  return (
    <div className="py-4 lg:grid lg:grid-cols-12">
      <Helmet>
        <title>{postDetails?.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content={postDetails?.desc}
        />
        <meta name="title" key="title" content={postDetails?.title} />
        <meta property="og:title" key="og:title" content={postDetails?.title} />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content={postDetails?.desc}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${postDetails?.imageUrl}`}
        />
        <meta name="keywords" content={postDetails?.tagList?.join(", ")} />
        <link rel="icon" href={postDetails?.imageUrl} />
      </Helmet>
      <div className="w-full col-span-9">
        <div className="">
          <div className="">
            <div className="w-[100%] pt-[50%] relative">
              <img
                className="w-[98.5%] h-full absolute top-0 bottom-0 left-1.5 right-1.5 object-fill rounded-md"
                src={postDetails?.imageUrl}
              />
            </div>
          </div>
        </div>
        <div className="p-2 text-gray-800">
          <div className="py-2 flex space-x-4">
            <div className="flex">
              <MdDateRange className="text-xl" />
              <span className="text-sm">
                {postDetails?.addedAt?.toDate()?.toLocaleString("en-In")}
              </span>
            </div>
              <h2 className="ml-4 uppercase text-sm font-semibold">{`${postDetails?.category} || ${postDetails?.subCategory}`}</h2>
          </div>
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {postDetails?.title}
          </h2>
        </div>
        <div className="m-2 my-6 flex space-x-3">
          <FacebookShareButton
            url={`${window.location.href}`}
            quote={postDetails?.title}
            hashtag="#mgMedia"
          >
            <FacebookIcon size={50} borderRadius={8} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={window.location.href}
            title={postDetails?.title}
            separator={`\n \n The channels of MG Media News are ingenious and incisive, and they focus on providing the 
              Indian population with timely, accurate, and reliable news. Our goal is to provide our 
              viewers with an analytical mix of current affairs, views, ideas, and everything else that 
              matters. We are a team of in-depth journalists, editors, cameramen, and broadcast experts 
              who work around the clock to produce world-class news.
              
              Dear All Member Please Like and share and Subscribe the following details.
               
              
              Facebook👇
              https://www.facebook.com/mgmedianewspost/
              
              YouTube👇
              https://www.youtube.com/@mgmedianewschannel

              Instagram👇
              https://www.instagram.com/mgmedianews/
              
              Contact👇
              9431170549, 7669740003
              
              Address 👇
              203, Surya Mansion, 1-Kaushalya 
              Park Hauz Khas, New Delhi-110016 \n \n`}
            hashtag={postDetails?.tagList?.map((item) => `#${item}`)}
          >
            <WhatsappIcon size={50} borderRadius={8} />
          </WhatsappShareButton>

          <TwitterShareButton
            url={window.location.href}
            quote={postDetails?.title}
            hashtag="#mgMedia"
          >
            <TwitterIcon size={50} borderRadius={8} />
          </TwitterShareButton>

          <LinkedinShareButton
            url={window.location.href}
            quote={postDetails?.title}
            hashtag="#mgMedia"
          >
            <LinkedinIcon size={50} borderRadius={8} />
          </LinkedinShareButton>

          <TelegramShareButton
            url={window.location.href}
            quote={postDetails?.title}
            hashtag="#mgMedia"
          >
            <TelegramIcon size={50} borderRadius={8} />
          </TelegramShareButton>
        </div>
        <div className="p-2 text-gray-700 text-justify">
          {postDetails?.desc ? parse(postDetails?.desc) : ""}
        </div>

        {/* Tags */}
        <div className="my-4 m-2">
          <label className="text-xl">TAGS:</label> <br />
          {postDetails?.tagList?.map((item) => (
            <span
              className="mx-1 uppercase inline-flex font-semibold"
              key={item}
            >
              {`${item}, `}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <TextHeadingCard label="Recent Videos" />
          <div className="mt-6 md:grid md:grid-cols-2">
            {postList
              ?.filter((item) => item?.postType === "videoPost")
              ?.slice(0, 6)
              ?.map((item) => (
                <div className="m-2" key={item?.videoUrl}>
                  <VideoNewsCard
                    title={item?.title}
                    postDate={item?.addedAt?.toDate()?.toLocaleString("en-In")}
                    postCategory={item?.category}
                    subCategory={item?.subCategory}
                    youtubeUrl={item?.videoUrl}
                    desc={item?.desc}
                    navigateTo="../videoPostDetails"
                    postId={item?.id}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="ml-2 col-span-3">
        {/* <VideoNewsCard /> */}
        <div className="my-10 mb-10 lg:m-0">
          <TextHeadingCard label="Recent Posts" />
          <div className="mt-6 lg:mt-4">
            {postList
              ?.filter((e) => e?.postType === "imagePost")
              ?.slice(0, 20)
              ?.map((item) => (
                <RecentPostCard
                  title={item?.title}
                  image={item?.imageUrl}
                  key={item?.id}
                  navigateTo="../imagePostDetails"
                  postId={item?.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
