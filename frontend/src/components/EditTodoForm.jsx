import React, { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import api from "../api/axiosInstance";
import Button from "./Button";

import {
  editingTodoAtom,
  todosLoadingAtom,
  todosErrorAtom,
} from "../store/store";

function EditTodoForm({ onTodoUpdated }) {
  const editingTodo = useAtomValue(editingTodoAtom);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const setTodosLoading = useSetAtom(todosLoadingAtom);
  const setTodosError = useSetAtom(todosErrorAtom);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
      setCompleted(editingTodo.completed || false);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [editingTodo]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingTodo || !editingTodo._id) {
      setTodosError("No todo selected for editing.");
      return;
    }

    setTodosLoading(true);
    setTodosError(null);

    try {
      const response = await api.put(`/todos/${editingTodo._id}`, {
        title,
        description,
        completed,
      });
      console.log("Todo updated successfully:", response.data);

      if (onTodoUpdated) {
        onTodoUpdated();
      }
    } catch (error) {
      console.error(
        "Failed to update todo:",
        error.response?.data || error.message,
      );
      let errorMessage = "Failed to update todo. Please try again.";
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

  const handleDelete = async () => {
    if (!editingTodo || !editingTodo._id) {
      setTodosError("No todo selected for deletion.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    setTodosLoading(true);
    setTodosError(null);

    try {
      await api.delete(`/todos/${editingTodo._id}`);
      console.log("Todo deleted successfully!");

      if (onTodoUpdated) {
        onTodoUpdated();
      }
    } catch (error) {
      console.error(
        "Failed to delete todo:",
        error.response?.data || error.message,
      );
      setTodosError(error.response?.data?.message || "Failed to delete todo.");
    } finally {
      setTodosLoading(false);
    }
  };

  const isLoading = useAtomValue(todosLoadingAtom);
  const todosError = useAtomValue(todosErrorAtom);

  if (!editingTodo) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Select a todo to edit.
      </p>
    );
  }

  return (
    <form onSubmit={handleUpdate} className="p-2">
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
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      ></textarea>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mr-2 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-500"
        />
        <label htmlFor="completed" className="text-gray-900 dark:text-gray-100">
          Completed
        </label>
      </div>

      {isLoading && (
        <p className="text-center text-blue-500 dark:text-blue-300 mb-3">
          Processing...
        </p>
      )}
      {todosError && (
        <p className="text-center text-red-500 dark:text-red-400 mb-3">
          {todosError}
        </p>
      )}

      <div className="flex justify-between space-x-4">
        <Button
          label="Update Todo"
          type="submit"
          altStyle={false}
          className="flex-1 py-2"
          disabled={isLoading}
        />
        <Button
          label="Delete Todo"
          type="button"
          onClick={handleDelete}
          className="flex-1 py-2 bg-red-500 dark:bg-red-500 hover:bg-red-600 text-white focus:ring-red-300"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default EditTodoForm;
