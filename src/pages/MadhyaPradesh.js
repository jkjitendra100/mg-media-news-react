import React from "react";
import CategotyDetails from "../components/CategotyDetails";
import TextHeadingCard from "../components/TextHeadingCard";
import useAuth from "../context/useAuth";

export default function MadhyaPradesh() {
  const { postList } = useAuth();
  return (
    <div className="">
      <TextHeadingCard
        label="Madhya Pradesh"
        className="z-10 w-72 sticky top-20 opacity-80" />
      <CategotyDetails
        postList={postList?.filter((item) => item?.subCategory === "MadhyaPradesh")}
      />
    </div>
  );
}
