import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import api from "../api/axiosInstance";
import Button from "../components/Button";

import {
  accessTokenAtom,
  userAtom,
  authErrorAtom,
  authLoadingAtom,
} from "../store/store";

function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setError = useSetAtom(authErrorAtom);

  const isLoading = useAtomValue(authLoadingAtom);
  const authError = useAtomValue(authErrorAtom);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    console.log("Register attempt with:", { username, email, password });

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      const {
        accessToken,
        _id,
        username: registeredUsername,
        email: registeredEmail,
      } = response.data;

      setAccessToken(accessToken);

      setUser({ _id, username: registeredUsername, email: registeredEmail });

      console.log("Registration successful!", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
      let errorMessage = "Registration failed. Please try again.";

      if (error.response && error.response.data) {
        if (
          error.response.data.message === "Validation failed" &&
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          errorMessage = error.response.data.errors
            .map((err) => err.message)
            .join(", ");
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-3 flex flex-col justify-center items-center sm:min-h-[calc(100vh-150px)]">
      <h1 className="text-3xl font-bold my-5 text-gray-900 dark:text-gray-100">
        Create an account
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2 border-gray-500 dark:border-gray-600 placeholder-gray-500 rounded-full text-gray-900 dark:text-gray-100 p-3 mb-4 w-full outline-none bg-white dark:bg-black transition-colors duration-200"
          required
        />
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
            Registering new user...
          </p>
        )}

        {authError && (
          <p className="text-center text-red-500 dark:text-red-400 mb-3">
            {authError}
          </p>
        )}

        <Button
          label={isLoading ? "Registering..." : "Sign Up"}
          type="submit"
          altStyle={false}
          className="w-full py-3 mb-3 font-semibold text-base rounded-full focus:outline-none focus:ring-2 transition-all duration-200"
          disabled={isLoading}
        />
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
