import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isinitialize, isAuthenticated } = useAuth();
  let location = useLocation();
  if(!isinitialize){
    return <LoadingScreen/>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default AuthRequire;
