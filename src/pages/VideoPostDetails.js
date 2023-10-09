import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import RecentPostCard from "../components/RecentPostCard";
import TextHeadingCard from "../components/TextHeadingCard";
import VideoNewsCard from "../components/VideoNewsCard";
import { Helmet } from "react-helmet";
import useAuth from "../context/useAuth";

export default function VideoPostDetails() {
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

  // useEffect(() => {
  //   const q = query(collection(db, "mgNewsPost"), orderBy("addedAt", "desc"));
  //   onSnapshot(q, (querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc?.id, ...doc?.data() });
  //     });
  //     setPostList(list);
  //   });
  // }, []);

  return (
    <>
      <Helmet>
        <title>{postDetails?.title}</title>
        <meta name="description" content={postDetails?.desc} />
        <meta name="keywords" content={postDetails?.tagList?.join(", ")} />
        <link rel="icon" href={postDetails?.videoUrl} />
      </Helmet>

      <div className="py-4 lg:grid lg:grid-cols-12">
        <div className="w-full col-span-9">
          <div className="">
            <div className="">
              <div className="w-[100%] pt-[50%] relative">
                <iframe
                  className="w-[98.5%] h-full absolute top-0 bottom-0 left-1.5 right-1.5 object-fill rounded-md"
                  src={`https://youtube.com/embed/${
                    postDetails?.videoUrl?.split("/")[3]
                  }?autoplay=0?controls=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
          </div>
          <div className="p-2 text-gray-800">
            <div className="py-2 sm:flex space-x-4">
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
              url={window.location.href}
              quote={postDetails?.title}
              hashtag="#mgMedia"
            >
              <FacebookIcon size={50} borderRadius={8} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={window.location.href}
              quote={postDetails?.title}
              hashtag="#mgMedia"
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
          <p className="p-2 text-gray-700 text-justify">{postDetails?.desc}</p>

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

          {/* Videos mapping */}
          <div className="mt-12">
            <TextHeadingCard label="Recent Videos" className="sm:mx-12" />
            <div className="mt-6 md:grid md:grid-cols-2">
              {postList
                ?.filter((item) => item?.postType === "videoPost")
                ?.slice(0, 8)
                ?.map((item) => (
                  <div className="m-2" key={item?.videoUrl}>
                    <VideoNewsCard
                      title={item?.title}
                      postDate={item?.addedAt
                        ?.toDate()
                        ?.toLocaleString("en-In")}
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
          <div className="mt-12 md:mt-0">
            <TextHeadingCard label="Recent Posts" />
            <div className="mt-6">
              {postList
                ?.filter((item) => item?.postType === "imagePost")
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
    </>
  );
}
