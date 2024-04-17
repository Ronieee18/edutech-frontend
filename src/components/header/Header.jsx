import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import {toast} from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate=useNavigate();
  const [menuopen,setMenuOpen]=useState(false)
  const [showMenuOpt,setShowMenuOpt]=useState(false)
    const useAuth=useContext(AuthContext);
    const nameParts=useAuth.user?.name?.split(" ");
    const fname=nameParts?.[0]?.[0];
    const lname=nameParts?.length>1? nameParts[1][0]:'';
    
    // //console.log(`${fname} ${lname}`);
    // useAuth.isLoggedIn=false;
    //console.log(useAuth.isLoggedIn);
    const handleLogout=async()=>{
      
      try {
        toast.loading("Logging out",{id:"logout"})
        await useAuth?.logout();
        toast.success("Logged out successfully",{id:"logout"})
      } catch (error) {
        //console.log(error);
        toast.error("Error logging out",{id:"logout"})
      }
    }
  return (
    <>
    <div className='flex  justify-between'>
        <Link to="/">
        <div className='flex  items-center'>
       <img src="logo.png" alt="logo" height={80} width={90} />
       <h1 className='logo'>Edutech</h1>
       </div>
       </Link>
       <div className='m-2 mt-6 '>
        {!useAuth.isLoggedIn ?(
            <div className='flex gap-6 mr-10'>
          <Link to='/login' className='text-xl  hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl'>  Login </Link>
          <Link to='/signup' className='text-xl  hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl '> Signup </Link>
          </div>
        ):(
          <>
          <div className='max-[800px]:hidden'>
            <button className='text-xl  hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>navigate('/mycourses')} >My Courses</button>
            <button className='text-xl  hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>navigate('/courses')}>Explore Courses</button>
            <button className='text-xl  hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>useAuth.logout()}>Logout</button>
            <button className='hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl text-xl relative'
            onClick={() => setShowMenuOpt(!showMenuOpt)} 
            >More ▼</button>
            {showMenuOpt && <div className='absolute cursor-pointer text-lg text-black right-5 z-10 top-20 w-[200px] p-2 bg-white border border-black'
            onClick={()=>{
              navigate(useAuth.user.isInstructor?'/uploadCourse':'/beInstructor');
              setShowMenuOpt(false)}}
            >Upload a Course?</div>}
            <button className='relative bg-[#846446] font-semibold text-white rounded-full w-fit py-2.5 px-5 mx-2   h-fit'
            onClick={()=>{navigate('/profile');setMenuOpen(false)}}
            >{fname.toUpperCase()+lname.toUpperCase()}</button>
            </div>
            
            {menuopen &&
            <div className='min-[800px]:hidden z-50 absolute bg-white h-[100vh] w-[60%] text-2xl  flex flex-col mt-10 right-2 gap-10  items-center'>
            <button className='bg-[#846446] font-semibold text-white rounded-full w-fit py-2.5 px-5 mx-2   h-fit'
            onClick={()=>{navigate('/profile');setMenuOpen(false)}}
            >{fname.toUpperCase()+lname.toUpperCase()}</button>
            <button className='hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>{navigate('/mycourses');setMenuOpen(false)}} >My Courses</button>
            <button className='hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>{navigate('/courses');setMenuOpen(false)}}>Explore Courses</button>
            <button className='hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>{
              navigate(useAuth.user.isInstructor?'/uploadCourse':'/beInstructor');
              setShowMenuOpt(false);setMenuOpen(false)}}>Upload Course</button>
            <button className='hover:bg-[#846446] hover:text-white px-5 py-1.5 rounded-xl' onClick={()=>useAuth.logout()}>Logout</button>
            </div>} 
            <img
            onClick={() => setMenuOpen(!menuopen)}
            src="menu.png" alt="MENU" height={40} width={40} className='hidden max-[800px]:block' />
            </>
        )}
       </div>
    </div>
    <hr />  
    </>
  )
}

export default Header