import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // TODO: Call your login API here using Axios
    // Example: api.post('/auth/login', { email, password })
    // On success, update Jotai atoms and navigate
    // On error, display error message
  };

  return (
    <div className="m-3 flex flex-col justify-center items-center sm:min-h-[calc(100vh-150px)]">
      <h1 className="text-3xl font-bold my-5 text-gray-900 dark:text-gray-100">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-black p-8">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-500 dark:border-gray-600 placeholder-gray-500 rounded-full text-gray-900 dark:text-gray-100 p-3 mb-4 w-full outline-none bg-white dark:bg-black transition-colors duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-500 dark:border-gray-600 placeholder-gray-500 rounded-full text-gray-900 dark:text-gray-100 p-3 mb-6 w-full outline-none bg-white dark:bg-black transition-colors duration-200"
        />
        <Button
          label="Log In"
          type="submit"
          altStyle={false}
          className="w-full py-3 mb-3 font-semibold text-base rounded-full focus:outline-none focus:ring-2 transition-all duration-200"
        />
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
