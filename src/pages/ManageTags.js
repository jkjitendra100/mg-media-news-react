import { async } from "@firebase/util";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import SuccessComponent from "../components/SuccessComponent";
import { db } from "../firebase";

export default function ManageTags() {
  const navigate = useNavigate();
  const [tag, setTag] = useState("");
  const [fetchedTags, setFetchedTags] = useState([]);
  const [tagList, setTagList] = useState([]);

  // Additional usestates
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    onSnapshot(doc(db, "seo", "managePostTags"), (doc) => {
      setFetchedTags(doc?.data()?.tagList);
      setTagList(() => (doc?.data() ? doc?.data()?.tagList : []));
    });
  }, []);

  const handleOnAddTag = (item) => {
    if (!item) {
      return alert("Tag can't be empty");
    }
    if (tagList?.find((e) => e === item)) {
      return alert(`${item} already exists`);
    }
    setTagList(() => [item, ...tagList]);
    setTag("");
  };

  const handleOnUpdateTags = async () => {
    setLoading(true);
    await setDoc(doc(db, "seo", "managePostTags"), {
      tagList,
    })?.then(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    });
  };

  return (
    <div className="">
      {tagList?.length > 0 && (
        <div className="p-4 pt-2 bg-white rounded-md border-2 border-gary-400 shadow-md shadow-gray-400">
          <h2 className="mb-4 uppercase text-center text-lg font-semibold text-gray-700">
            Pre-defined Tags
          </h2>
          <div className="p-2 bg-white rounded-md border-2 border-gray-300 shadow-sm shadow-gray-400">
            {tagList?.map((item) => (
              <div className="inline-flex" key={item}>
                <h2 className="p-1 m-2 border border-cyan-500 rounded-md bg-white">
                  {item}
                  <button
                    className="ml-3 px-2 py-0.5 text-red-600 font-semibold bg-white border border-red-600 rounded-full hover:scale-110 hover:text-white hover:bg-red-600 duration-300"
                    onClick={() =>
                      setTagList(() => tagList?.filter((e) => e !== item))
                    }
                  >
                    X
                  </button>
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 pt-2 bg-white rounded-md border-2 border-gary-400 shadow-md shadow-gray-400">
        <h2 className="mb-4 uppercase text-center text-lg font-semibold text-gray-700">
          Add or Modify Tags
        </h2>
        <div className="w-96 flex">
          <div className="w-full">
            <h2>Please Enter Post Tag</h2>
            <input
              className="p-2 mb-4 w-full border border-slate-400 rounded-md"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter tag here"
              maxLength={20}
            />
          </div>
          <button
            className="m-2 pb-2 px-3 mt-4 h-fit rounded-full text-5xl bg-green-500 text-white hover:bg-green-600 hover:scale-105 duration-300"
            onClick={() => handleOnAddTag(tag?.toLowerCase())}
          >
            +
          </button>
        </div>

        <div className="mt-16 flex justify-end space-x-4">
          <button
            className="p-3 w-56 bg-slate-300 font-bold text-slate-800 hover:bg-slate-400 hover:scale-105 duration-300 shadow-sm shadow-gray-500 rounded-md border border-slate-400"
            onClick={() => navigate("../home")}
          >
            CANCEL
          </button>
          {fetchedTags?.length !== tagList?.length ? (
            <button
              className="p-3 w-56 bg-green-500 font-bold text-white hover:bg-green-600 hover:scale-105 duration-300 shadow-sm shadow-gray-500 rounded-md"
              onClick={handleOnUpdateTags}
            >
              UPDATE TAGS
            </button>
          ) : (
            <button className="p-3 w-56 bg-green-300 font-bold text-white shadow-sm shadow-gray-500 rounded-md">
              UPDATE TAGS
            </button>
          )}
        </div>
      </div>

      {loading && <LoadingComponent label="Processing.." />}
      {success && <SuccessComponent label="Tags Updated Successfully" />}
    </div>
  );
}
