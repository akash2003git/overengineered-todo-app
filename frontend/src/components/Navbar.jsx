import React from "react";
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import Button from "../components/Button";

const defaultLinkClasses =
  "px-3 py-1 rounded-4xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer " +
  "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:ring-gray-300";

const altLinkClasses =
  "px-3 py-1 rounded-4xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer " +
  "bg-white text-black dark:bg-black dark:text-white border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-300";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 p-3 rounded-md border-gray-600 border-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex space-x-1 items-center text-black dark:text-white text-3xl font-bold"
        >
          <LuListTodo />
          <span>Todo</span>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAuthenticated ? (
            <Button label="Logout" onClick={onLogout} altStyle={false} />
          ) : (
            <div className="space-x-2 sm:space-x-4">
              <Link to="/login" className={defaultLinkClasses}>
                Log in
              </Link>
              <Link to="/register" className={altLinkClasses}>
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
