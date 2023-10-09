import React from "react";
import ImageNewsCard from "./ImageNewsCard";
import { motion } from "framer-motion";
import TextHeadingCard from "./TextHeadingCard";
import VideoNewsCard from "./VideoNewsCard";

export default function CategotyDetails({ postList }) {
  return (
    <div>
      
      <div className="grid grid-cols-2 md:grid-cols-3">
        {postList
          ?.sort((a, b) => b?.addedAt - a?.addedAt)
          // ?.filter((e) => e?.postType === "imagePost")
          // ?.slice(0, 12)
          ?.map((item) => (
            <motion.div
              className="m-4"
              key={item?.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 100, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {item?.postType === "imagePost" && (
                <ImageNewsCard
                  title={item?.title}
                  postDate={item?.addedAt
                    ?.toDate()
                    ?.toLocaleDateString("en-In")}
                  postCategory={item?.category}
                  subCategory={item?.subCategory}
                  desc={item?.desc}
                  imageUrl={item?.imageUrl}
                  navigateTo="../imagePostDetails"
                  postId={item?.id}
                  titleStyle="text-black"
                />
              )}

              {item?.postType === "videoPost" && (
                <VideoNewsCard
                  title={item?.title}
                  postDate={item?.addedAt
                    ?.toDate()
                    ?.toLocaleDateString("en-In")}
                  postCategory={item?.category}
                  subCategory={item?.subCategory}
                  desc={item?.desc}
                  youtubeUrl={item?.videoUrl}
                  navigateTo="../videoPostDetails"
                  postId={item?.id}
                  titleStyle="text-black"
                />
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
