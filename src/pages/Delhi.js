import React from "react";
import CategotyDetails from "../components/CategotyDetails";
import TextHeadingCard from "../components/TextHeadingCard";
import useAuth from "../context/useAuth";
import { useEffect } from "react";
export default function Delhi() {
  const { postList } = useAuth();

  console.log(postList);

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "mgAdvertisements"),
  //     orderBy("createdAt", "desc"),
  //     limit(100)
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc?.id, ...doc?.data() });
  //     });
  //     setAdsList(list);
  //   });
  // }, []);

  
  return (
    <div className="">
      <TextHeadingCard
        label="Delhi"
        className="z-10 w-60 sticky top-20 opacity-80"
      />
      <CategotyDetails
        postList={postList?.filter((item) => item?.subCategory === "Jharkhand")}
      />
    </div>
  );
}
