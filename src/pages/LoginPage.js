import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import loadingGif from "../assets/loadingSpinner.gif";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithEmailAndPassword, user, loading, loginErrorMsg } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="../" />;
  }

  return (
    <div className=" min-h-screen">
      <div className="flex justify-center">
        <div className="mx-4 w-96 px-4 py-10 pt-4 rounded-xl space-y-4 mt-20 bg-white shadow-lg border shadow-gray-500">
          <h1 className="mb-12 text-xl font-bold uppercase text-red-600 my-2 text-center underline">
            Login Here
          </h1>

          <div className="rounded-lg p-2 ">
            <h2 className="">Email ID</h2>
            <input
              className="px-3 py-2 border border-slate-500 focus:outline-slate-900 text-center w-full bg-white rounded-md"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
          </div>
          <div className="rounded-lg p-2">
            <h2 className="">Password</h2>
            <input
              className="px-3 py-2 border border-slate-500 focus:outline-slate-900 text-center w-full bg-white rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </div>

          {!loading && <div className="">
            <h2 className="m-2 text-center">Don't have an account ?</h2>
            <div className="flex justify-center">
              <button
                className="m-2 p-2 text-center font-semibold text-blue-600 hover:text-red-600 hover:scale-110 duration-500"
                onClick={() => navigate("../register")}
              >
                Register Now
              </button>
            </div>
          </div>}

          {loginErrorMsg && (
            <h2 className="p-2 text-center bg-red-200 text-red-600 border-2 border-red-600 rounded-md">
              {loginErrorMsg === "Firebase: Error (auth/wrong-password)." &&
                "Wrong username or password"}
              {loginErrorMsg === "Firebase: Error (auth/user-not-found)." &&
                "Wrong username or password"}
              {loginErrorMsg ===
                "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." &&
                "Too many requests, Please try again later."}
            </h2>
          )}

          <div className="w-full text-center">
            {!loading ? (
              <button
                className="mt-12 my-4  px-8 py-2 bg-blue-200 rounded-lg duration-500 text-blue-600 font-semibold border border-blue-700 hover:bg-blue-700 hover:text-white"
                onClick={() => loginWithEmailAndPassword(email, password)}
              >
                Login
              </button>
            ) : (
              <div className="mt-32 flex justify-center">
                <img className="w-10 h-10" src={loadingGif} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
