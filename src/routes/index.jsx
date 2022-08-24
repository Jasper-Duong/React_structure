import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
const AdminGuard = lazy(() => import("../guards/admin"));
const AuthGuard = lazy(() => import("../guards/auth"));
const NoAuthGuard = lazy(() => import("../guards/no-auth"));
const AdminLayout = lazy(() => import("../layouts/adminLayout"));
const Booking = lazy(() => import("pages/booking/booking"));
const Login = lazy(() => import("pages/login/login"));
const MovieManagement = lazy(() =>
import("pages/movie-management/movie-management")
);

const UpdateMovie = lazy(() => import("pages/update-movie/update-movie"));
const CreateMovie = lazy(() => import("pages/create-movie/create-movie"));
const HomeLayout = lazy(() => import("../layouts/home"));
const Home = lazy(() => import("pages/home/home"));
const MovieDetail = lazy(() => import("pages/movie-detail/movie-detail"));
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
            {
              path: "/admin/movie-management/create",
              element: <CreateMovie />,
            },
            {
              path: "/admin/movie-management/:movieId/update",
              element: <UpdateMovie />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
