import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

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

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div >
            <div >
            <div>
                    <span >
                        <Logo  />
                    </span>
                </div>
                <h2 >Sign up to create account</h2>
                <p >
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
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
          <span className="text-red-500 text-sm">{errors.password.message}</span>
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
            {passwordErrors.uppercase ? "✔" : "❌"} At least one uppercase letter
          </li>
          <li
            className={`${
              passwordErrors.lowercase ? "text-green-500" : "text-red-500"
            }`}
          >
            {passwordErrors.lowercase ? "✔" : "❌"} At least one lowercase letter
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
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup