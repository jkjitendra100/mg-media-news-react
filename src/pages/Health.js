import React from "react";
import CategotyDetails from "../components/CategotyDetails";
import TextHeadingCard from "../components/TextHeadingCard";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function Health() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const q = query(
        collection(db, "mgNewsPost"),
        where("subCategory", "==", "Health"),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setDataList(list);
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <TextHeadingCard
        label="Health "
        className="z-10 w-60 sticky opacity-80"
      />
      <CategotyDetails postList={dataList} />
    </div>
  );
}
