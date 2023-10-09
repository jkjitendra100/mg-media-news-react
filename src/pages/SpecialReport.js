import React from "react";
import CategotyDetails from "../components/CategotyDetails";
import TextHeadingCard from "../components/TextHeadingCard";
import useAuth from "../context/useAuth";

export default function SpecialReport() {
  const { postList } = useAuth();

  return (
    <div className="">
      <TextHeadingCard
        label="Special Report"
        className="z-10 w-60 sticky top-20 opacity-80" />
      <CategotyDetails
        postList={postList?.filter(
          (item) => item?.category === "Special Report"
        )}
      />
    </div>
  );
}
