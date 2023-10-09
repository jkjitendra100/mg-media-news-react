import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function UserDashboard() {
    const {user} = useAuth()
  if (!user) {
    return <Navigate to="/home" />;
  }
  return <div>UserDashboard</div>;
}
