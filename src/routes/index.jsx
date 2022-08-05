import React from "react";
import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/admin";
import AuthGuard from "../guards/auth";
import NoAuthGuard from "../guards/no-auth";
import AdminLayout from "../layouts/adminLayout";
import HomeLayout from "../layouts/home";
import Booking from "../pages/booking/booking";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import MovieDetail from "../pages/movie-detail/movie-detail";
import MovieManagement from "../pages/movie-management/movie-management";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/movie/:movieId", element: <MovieDetail /> },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:maLichChieu",
              element: <Booking />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
