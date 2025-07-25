import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import api from "../api/axiosInstance";

import { isAuthenticatedAtom } from "../store/store";

function DashboardPage() {
  const [todosData, setTodosData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const response = await api.get("/todos");
        setTodosData(response.data);
        console.log("Fetched Todos:", response.data);
      } catch (error) {
        console.error(
          "Failed to fetch todos:",
          error.response?.data || error.message,
        );
        setFetchError(error.response?.data?.message || "Failed to load todos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Your Todos (Raw Data)
      </h1>

      {isLoading && (
        <p className="text-center text-blue-500 dark:text-blue-300">
          Loading todos...
        </p>
      )}

      {fetchError && (
        <p className="text-center text-red-500 dark:text-red-400">
          Error: {fetchError}
        </p>
      )}

      {!isLoading && !fetchError && todosData && (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          {/* Dump the raw JSON response */}
          {JSON.stringify(todosData, null, 2)}
        </pre>
      )}

      {!isLoading && !fetchError && !todosData && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No todos found or data not yet loaded.
        </p>
      )}
    </div>
  );
}

export default DashboardPage;
