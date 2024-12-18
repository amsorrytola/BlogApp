import React from 'react'
import Logo from '../Logo'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function Header() {
  const islogin = useSelector((state) => state.auth.status);
  

  if(islogin){
    return(
      <>
        <Logo/>
        <NavLink
              to=""
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Home
        </NavLink>
        <NavLink
              to="/all-posts"
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  All Posts
        </NavLink>
        <NavLink
              to="/add-post"
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Add Post
        </NavLink>
        <NavLink
              to=""
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Logout
        </NavLink>
      </>
    )
  }else{
    return (
      <>
      <Logo/>
      <NavLink
              to=""
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Home
      </NavLink>
  
    
      <NavLink
              to="/login"
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Login
      </NavLink>
      <NavLink
              to="/Signup"
              className={({isActive})=>
                  isActive ? "text-red-500" : "text-black"
              }>
                  Signup
      </NavLink>
      
      </>
  
  
  
    )
  }
  
}

export default Header