import React from "react";
import CategotyDetails from "../components/CategotyDetails";
import TextHeadingCard from "../components/TextHeadingCard";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function World() {
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let list = [];
			const q = query(
				collection(db, "mgNewsPost"),
				where("category", "==", "World"),
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
				label="World"
				className="z-10 w-60 sticky top-20 opacity-80"
			/>
			<CategotyDetails
				postList={dataList}
			/>
		</div>
	);
}
