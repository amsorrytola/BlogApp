import React from "react";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Button from "../Button.jsx";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const islogin = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();


  if (islogin) {
    return (
      <>
        <Logo />

        <NavLink
          to="/all-posts"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          All Posts
        </NavLink>
        <NavLink
          to="/add-post"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          Add Post
        </NavLink>
        <Button 
        onClick={async() => {
          await authService.logout()
          dispatch(logout());
          navigate("/")
        }}>LogOut</Button>
      </>
    );
  } else {
    return (
      <>
        <Logo />
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/Signup"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          Signup
        </NavLink>
      </>
    );
  }
}

export default Header;
