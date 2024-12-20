import React, { useState, useEffect } from "react";
import authService from "../../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice.js";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import Logo from "../Logo.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false,
  });

  const validatePassword = (password) => {
    setPasswordErrors({
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
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
          Sign up to create account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-6">
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full Name is required",
              })}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
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
              placeholder="Enter a strong password"
              {...register("password", {
                required: "Password is required",
                onChange: (e) => validatePassword(e.target.value),
              })}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <ul className="text-sm mt-2 space-y-1">
              {Object.entries(passwordErrors).map(([key, value]) => (
                <li
                  key={key}
                  className={`flex items-center ${
                    value ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span>{value ? "✔" : "❌"}</span>
                  <span className="ml-2 capitalize">{key}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
