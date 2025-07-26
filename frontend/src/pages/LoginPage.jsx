import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import api from "../api/axiosInstance";
import Button from "../components/Button";

import {
  accessTokenAtom,
  userAtom,
  authLoadingAtom,
  authErrorAtom,
} from "../store/store";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setError = useSetAtom(authErrorAtom);

  const isLoading = useAtomValue(authLoadingAtom);
  const authError = useAtomValue(authErrorAtom);

  const navigate = useNavigate();

  const loginButtonClasses =
    "w-full py-3 mb-3 font-semibold text-base rounded-full focus:outline-none focus:ring-2 transition-all duration-200";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { _id, username, email: userEmail, accessToken } = response.data;
      setAccessToken(accessToken);
      setUser({ _id, username, email: userEmail });
      console.log("Login successful! Token stored");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-3 flex flex-col justify-center items-center sm:min-h-[calc(100vh-150px)]">
      <h1 className="text-3xl font-bold my-5 text-gray-900 dark:text-gray-100">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm  p-8">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-500 dark:border-gray-600 placeholder-gray-500 rounded-full text-gray-900 dark:text-gray-100 p-3 mb-4 w-full outline-none bg-white dark:bg-black transition-colors duration-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-500 dark:border-gray-600 placeholder-gray-500 rounded-full text-gray-900 dark:text-gray-100 p-3 mb-6 w-full outline-none bg-white dark:bg-black transition-colors duration-200"
          required
        />

        {isLoading && (
          <p className="text-center text-blue-500 dark:text-blue-300 mb-3">
            Logging in...
          </p>
        )}

        {authError && (
          <p className="text-center text-red-500 dark:text-red-400 mb-3">
            {authError}
          </p>
        )}

        <Button
          label={isLoading ? "Logging In..." : "Log In"}
          type="submit"
          altStyle={false}
          className={loginButtonClasses}
          disabled={isLoading}
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
