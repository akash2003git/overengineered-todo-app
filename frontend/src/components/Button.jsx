import React from "react";

function Button({
  label,
  altStyle = false,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  const baseClasses =
    "px-3 py-1 rounded-4xl focus:outline-none focus:ring-2 transition-all duration-200";
  const defaultStyleClasses =
    "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:ring-gray-300";
  const altStyleClasses =
    "bg-white text-black dark:bg-black dark:text-white border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-300";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${altStyle ? altStyleClasses : defaultStyleClasses} ${
    disabled ? disabledClasses : "cursor-pointer"
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
