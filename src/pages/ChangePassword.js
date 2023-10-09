import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import LoadingComponent from "../components/LoadingComponent";

export default function ChangePassword() {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  // Additional usestates
  const [loading, setLoading] = useState(false);

  const handleOnResetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        alert("Password reset mail sent..");
      })
      .catch((error) => {
        alert(error?.message);
      })
      ?.then(() => setLoading(false));
  };

  return (
    <div className="w-96 mt-12 p-4 pt-2 mx-auto bg-white rounded-md shadow-md shadow-gary-600 border-2 border-gray-400">
      <h2 className="mb-4 uppercase underline text-center text-lg font-semibold text-gray-700">
        Change Password
      </h2>

      <div className="my-2">
        <h2 className="text-sm text-gray-600">Username</h2>
        <h2 className="p-2 text-gray-700 font-semibold border border-gray-400 rounded-md">
          {user?.email}
        </h2>
      </div>

      <div className="mt-16 space-y-4">
        <button
          className="p-2 w-full uppercase bg-green-600 text-white rounded-md font-semibold hover:scale-105 duration-500"
          onClick={handleOnResetPassword}
        >
          Request Reset Password
        </button>

        <button
          className="px-6 py-2 w-full uppercase bg-red-600 text-white rounded-md font-semibold hover:scale-105 duration-500"
          onClick={() => navigate("../addPost")}
        >
          Cancel
        </button>
      </div>
      {loading && <LoadingComponent label="Processing.." />}
    </div>
  );
}
