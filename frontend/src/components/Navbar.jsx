import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-white dark:bg-black p-2 border-b-1 border-gray-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Todo
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-white dark:text-black dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
