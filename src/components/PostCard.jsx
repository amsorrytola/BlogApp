import React from "react";
import appwriteService from "../appwrite/database.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2
            className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition duration-300"
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
