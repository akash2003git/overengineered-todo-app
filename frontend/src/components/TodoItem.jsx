import React from "react";
import { FaRegEdit } from "react-icons/fa";
import Button from "./Button";

function TodoItem({ todo, onEditClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
      <div>
        <h3
          className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"}`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {todo.description}
          </p>
        )}
      </div>
      <div className="ml-2 flex items-center space-x-2">
        {todo.completed && (
          <span className="text-sm text-green-500 mr-2">Completed</span>
        )}
        <Button
          label={<FaRegEdit className="text-lg" />}
          onClick={() => onEditClick(todo)}
          altStyle={true}
        />
      </div>
    </div>
  );
}

export default TodoItem;
