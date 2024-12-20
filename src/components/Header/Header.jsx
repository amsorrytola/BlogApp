import React from "react";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button.jsx";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <header className="bg-gray-50 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Logo />
        <nav className="flex items-center gap-6">
          {isLogin ? (
            <>
              <NavLink to="/all-posts" className={navLinkStyle}>
                All Posts
              </NavLink>
              <NavLink to="/add-post" className={navLinkStyle}>
                Add Post
              </NavLink>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  await authService.logout();
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkStyle}>
                Signup
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
