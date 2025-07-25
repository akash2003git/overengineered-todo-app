import React from "react";

function TodoItem({ todo }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
      <div>
        <h3
          className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {todo.description}
          </p>
        )}
      </div>
      {todo.completed && (
        <span className="text-sm text-green-500">Completed</span>
      )}
    </div>
  );
}

export default TodoItem;
