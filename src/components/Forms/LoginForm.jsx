import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import authService from "../../appwrite/auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(login(userData));
          navigate("/all-posts");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            onChange: (e) => validatePassword(e.target.value),
          })}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <ul>
          <li
            className={`${
              passwordErrors.length ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.length ? "✔" : "❌"} At least 10 characters
          </li>
          <li
            className={`${
              passwordErrors.uppercase ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.uppercase ? "✔" : "❌"} At least one uppercase
            letter
          </li>
          <li
            className={`${
              passwordErrors.lowercase ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.lowercase ? "✔" : "❌"} At least one lowercase
            letter
          </li>
          <li
            className={`${
              passwordErrors.digit ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.digit ? "✔" : "❌"} At least one digit
          </li>
          <li
            className={`${
              passwordErrors.special ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.special ? "✔" : "❌"} At least one special character
          </li>
        </ul>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sing In{" "}
      </button>
    </form>
  );
}
