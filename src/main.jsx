import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Pages/Home.jsx";
import Login from "./components/Pages/Login.jsx";
import Signup from "./components/Pages/Signup.jsx";
import AllPosts from "./components/Pages/AllPosts.jsx";
import AddPost from "./components/Pages/AddPost.jsx";
import Post from "./components/Pages/Post.jsx";
import EditPost from "./components/Pages/EditPost.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="add-post" element={<AddPost />}/>
          <Route path="post/:slug" element={<Post />}/>
          <Route path="edit-post/:slug" element={<EditPost/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
