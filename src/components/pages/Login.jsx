import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { AuthContext } from '../context/Authcontext';


function Login() {
  const  useAuth=useContext(AuthContext);
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const  formData=new FormData(e.currentTarget);
    const email=formData.get('email');
    const password=formData.get("password");
    try {
      toast.loading("Logging In",{id:"login"})
      await useAuth?.login(email,password); 
      toast.success("Logged In successfully",{id:"login"})
      navigate('/');
    } catch (error) {
     //console.log(error);
      toast.error("Logged In failed",{id:"login"});
    }
}

  return (
    <div className='flex justify-center items-center '>
      <form onSubmit={handleSubmit} >
        <div className=' shadow-xl shadow-gray-900 px-12 py-5'>
        <div className='flex   items-center'>
       <img src="logo.png" alt="logo" height={80} width={80} />
       <h1 className='logo text-left'>Edutech</h1>
       </div>
       <div className='flex flex-col gap-5'>
        <h1 className='text text-2xl'>Login</h1>
        <input type="email" name='email' className='p-2 rounded-lg border border-black'  placeholder="Email here"/>
        <div className='relative'>
        <input type="password" name='password' className='p-2 rounded-lg border border-black '  placeholder="Password here"/>
        <p onClick={()=>navigate('/forgotPass')} className='text-blue-800 text-sm absolute hover:underline cursor-pointer'>Forgot Password?</p>
        </div>
        <button type="submit" className='bg-[#846446] text-xl text-white w-full p-2 rounded-xl text mt-5'>Login</button>
        <div className='flex items-center'>
        <hr className='w-20 h-0.5 mx-1  bg-gray-700' />
        <p>OR</p>
        <hr className='w-20 h-0.5 mx-1  bg-gray-700' />
        </div>
        <button className='bg-[#846446] text-xl text-white w-full px-2 py-1 rounded-xl text ' onClick={()=>navigate('/signup')}>Signup <br />
        <p className='text-sm '>create a new account</p> 
        </button>
       </div>
        </div>
        </form>
    </div>
  )
}

export default Login