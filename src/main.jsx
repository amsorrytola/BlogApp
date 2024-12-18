
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Header/Home.jsx'
import Login from './components/Header/Login.jsx'
import Signup from './components/Header/Signup.jsx'
import AllPosts from './components/Header/AllPosts.jsx'
import AddPost from './components/Header/AddPost.jsx'

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path='' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='Signup' element={<Signup/>}/>
          <Route path='all-posts' element={<AllPosts/>}/>
          
          </Route>
          <Route path='add-post' element={<AddPost/>}>
        

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>,
)
