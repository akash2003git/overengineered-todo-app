import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import {
  isAuthenticatedAtom,
  accessTokenAtom,
  userAtom,
} from "../store/atoms/authAtom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-full min-h-screen bg-white dark:bg-black font-poppins text-black dark:text-white transition-colors duration-200 sm:px-10 md:px-40 lg:px-60 xl:px-100">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
