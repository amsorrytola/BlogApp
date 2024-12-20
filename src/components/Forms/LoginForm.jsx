import React, { useState, useEffect } from "react";
import authService from "../../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice.js";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import Logo from "../Logo.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    setError("");
    try {
      const user = await authService.login(data);
      if (user) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/all-posts");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit(loginUser)} className="mt-6 space-y-6">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
          >
            Log In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
