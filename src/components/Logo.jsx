import React from "react";

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon */}
      <div className="bg-blue-500 dark:bg-blue-600 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13M6.342 15.686l11.315-11.315M17.657 15.686L6.342 4.37"
          />
        </svg>
      </div>

      {/* Text */}
      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Postify
      </span>
    </div>
  );
}

export default Logo;
