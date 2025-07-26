import React from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center p-5 pt-15 backdrop-blur-sm">
      <div className="bg-white border-2 border-gray-500 dark:bg-gray-800 rounded-lg shadow-xl p-6 absolute max-w-lg  transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {title && (
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}

export default Modal;
