import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen">
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to DevBlog</h1>
        <p className="text-lg mb-10">
          Share your thoughts, ideas, and experiences with the world!
        </p>
        <div className="space-x-4">
          <NavLink
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/login"
            className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
