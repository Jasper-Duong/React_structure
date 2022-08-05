import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "antd";

export default function AdminGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.userInfo) {
      return navigate("/login");
    } else if (userState.userInfo.loaiNguoiDung !== "QuanTri") {
      notification.warning({ message: "Only administrators allowed!" });
      return navigate("/");
    }
  }, []);
  return <Outlet />;
}
