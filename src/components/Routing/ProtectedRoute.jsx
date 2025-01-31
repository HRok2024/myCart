import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//유저인증 정보가 있으면 Outlet 요청한 주소로 이동하고, 없으면 로그인 페이지로 간다
const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
