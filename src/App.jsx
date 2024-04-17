import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup'
import Courses from './components/pages/Courses'
import { AuthContext } from './components/context/Authcontext'
import PageNotFound from './components/pages/PageNotFound'
import CourseVideos from './components/pages/CourseVideos'
import CourseEnroll from './components/pages/CourseEnroll'
import MyCourses from './components/pages/MyCourses'
import BeInstructor from './components/pages/BeInstructor'
import UploadCourse from './components/pages/UploadCourse'
import ForgotPass from './components/pages/ForgotPass'
import ResetPass from './components/pages/ResetPass'
import Profile from './components/pages/Profile'

function App() {
  const useAuth=useContext(AuthContext);

  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotPass' element={<ForgotPass/>}/>
        <Route path='/reset-password/:id/:token' element={<ResetPass/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/courses' element={<Courses/>}/>
      } 
        {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/profile' element={<Profile/>}/>
      } 
        {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/courses/:name' element={<CourseVideos/>}/>
      } 
       {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/courses/:name/:id' element={<CourseEnroll/>}/>
      }
      {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/mycourses' element={<MyCourses/>}/>
      }
      {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/beInstructor' element={<BeInstructor/>}/>
      }
      {useAuth.isLoggedIn && useAuth.user && 
        <Route path='/uploadCourse' element={<UploadCourse/>}/>
      }
      <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
