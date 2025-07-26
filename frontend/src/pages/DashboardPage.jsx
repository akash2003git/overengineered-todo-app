import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import api from "../api/axiosInstance";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/common/Modal";
import EditTodoForm from "../components/EditTodoForm";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import {
  userAtom,
  isAuthenticatedAtom,
  isEditModalOpenAtom,
  isAddTodoModalOpenAtom,
  editingTodoAtom,
} from "../store/store";

function DashboardPage() {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [todosData, setTodosData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useAtomValue(userAtom);

  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  const isAddTodoModalOpen = useAtomValue(isAddTodoModalOpenAtom);
  const setIsAddTodoModalOpen = useSetAtom(isAddTodoModalOpenAtom);

  const isEditModalOpen = useAtomValue(isEditModalOpenAtom);
  const setIsEditModalOpen = useSetAtom(isEditModalOpenAtom);
  const setEditingTodo = useSetAtom(editingTodoAtom);

  // Effect to apply theme class to the html element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]); // Re-run when theme state changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const fetchTodos = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [isAuthenticated, navigate, fetchTodos]);

  const handleTodoAdded = () => {
    setIsAddTodoModalOpen(false);
    fetchTodos();
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    fetchTodos();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {user ? `${user.username}'s todos` : "Your todos"}
        </h1>
        <Button
          label={<IoMdAdd className="text-2xl" />}
          onClick={() => setIsAddTodoModalOpen(true)}
        />
      </div>

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

      {!isLoading &&
      !fetchError &&
      todosData &&
      todosData.todos &&
      todosData.todos.length > 0 ? (
        <div>
          {todosData.todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      ) : (
        !isLoading &&
        !fetchError && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No todos found. Start by creating one!
          </p>
        )
      )}

      <Modal
        isOpen={isAddTodoModalOpen}
        onClose={() => setIsAddTodoModalOpen(false)}
        title="Add New Todo"
      >
        <TodoForm onTodoAdded={handleTodoAdded} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Todo"
      >
        <EditTodoForm onTodoUpdated={handleEditModalClose} />
      </Modal>

      <Button
        label={
          theme === "light" ? (
            <MdDarkMode className="text-2xl" />
          ) : (
            <MdLightMode className="text-2xl" />
          )
        }
        onClick={toggleTheme}
        altStyle={true}
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-blue-300 dark:focus:ring-blue-600 z-40"
      />
    </div>
  );
}

export default DashboardPage;
