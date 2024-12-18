import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>{setLoading(false)})
  },[])


  return !loading ? (
    <>
    <Header />
    <Outlet />
    <Footer/>
    </>
  ) : <>LOADING....</>
}

export default App
