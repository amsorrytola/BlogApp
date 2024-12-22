import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Import react-slick
import PostCard from "../PostCard";
import appwriteService from "../../appwrite/database";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Slick carousel settings
  const settings = {
    infinite: true, // Enables infinite looping
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    centerMode: true, // Center the active slide
    centerPadding: "0", // No extra padding for center mode
    autoplay: false, // Optional: disable autoplay
    speed: 500, // Smooth sliding effect
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom prev arrow
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Only 1 card on small screens
          centerMode: false, // Disable center mode on small screens
        },
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        All Posts
      </h2>
      {posts.length > 0 ? (
        <div className="relative w-full max-w-7xl">
          <Slider {...settings}>
            {posts.map((post, index) => (
              <div
                key={post.$id}
                className={`px-2 transform transition-transform duration-300 ${
                  index === 1 ? "scale-110 z-10" : "scale-90"
                }`}
              >
                <PostCard {...post} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
}

// Custom arrow components for better styling
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 dark:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
    >
      ➡️
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 dark:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
    >
      ⬅️
    </button>
  );
}

export default AllPosts;
