import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import LoginPage from "../pages/user/auth/login/login";
import SignUp from "../pages/user/auth/signup/signup.jsx";
import AdminWrapper from "../Components/AdminWrapper/AdminWrapper.jsx";
import { adminRoutes, adminSidebarItems, userSidebarItems } from "./sidebarItems.js";

const isAuthenticated = () => !!localStorage.getItem("auth_token");
const isAdminAuthenticated = () => !!localStorage.getItem("admin_auth_token");

const AdminRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (isAdminAuthenticated()) {
    return (
      <AdminWrapper sidebarItems={ localStorage.getItem("role") === "admin" ? adminSidebarItems : userSidebarItems }>
        <div className="admin-body no-scrollbar p-3 text-white font-[poppins] overflow-y-auto">
          {children ? children : <Outlet />}
        </div>
      </AdminWrapper>
    );
  }

  return <Navigate to="/login" replace />;
};

const OurRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/user-signup",
      element: <SignUp />,
    },
    {
      element: <AdminRoute />,
      children: adminRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default OurRoutes;