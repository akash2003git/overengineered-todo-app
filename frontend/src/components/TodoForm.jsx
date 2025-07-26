import React, { useState } from "react";
import Button from "../components/Button";
import api from "../api/axiosInstance";
import { useSetAtom, useAtomValue } from "jotai";
import { todosLoadingAtom, todosErrorAtom } from "../store/store";

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const setTodosLoading = useSetAtom(todosLoadingAtom);
  const setTodosError = useSetAtom(todosErrorAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTodosLoading(true);
    setTodosError(null);

    console.log("Attempting to add new Todo:", { title, description });

    try {
      const response = await api.post("/todos", { title, description });
      console.log("Todo added successfully:", response.data);

      setTitle("");
      setDescription("");

      if (onTodoAdded) {
        onTodoAdded();
      }
    } catch (error) {
      console.error(
        "Failed to add todo:",
        error.response?.data || error.message,
      );
      let errorMessage = "Failed to add todo. Please try again.";

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
      setTodosError(errorMessage);
    } finally {
      setTodosLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      {" "}
      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      ></textarea>
      {useAtomValue(todosLoadingAtom) && (
        <p className="text-center text-blue-500 dark:text-blue-300 mb-3">
          Adding todo...
        </p>
      )}
      {useAtomValue(todosErrorAtom) && (
        <p className="text-center text-red-500 dark:text-red-400 mb-3">
          {useAtomValue(todosErrorAtom)}
        </p>
      )}
      <Button
        label="Add Todo"
        type="submit"
        altStyle={false}
        className="w-full py-2"
        disabled={useAtomValue(todosLoadingAtom)}
      />
    </form>
  );
}

export default TodoForm;
