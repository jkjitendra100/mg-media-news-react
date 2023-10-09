import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function AdminDashboard() {
    const {user} = useAuth()
  if (!user) {
    return <Navigate to="/home" />;
  }
  return <div>AdminDashboard</div>;
}
