import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;