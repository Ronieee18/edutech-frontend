import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext';
import {toast} from 'react-hot-toast'


function Signup() {
  const navigate=useNavigate();
  const useAuth=useContext(AuthContext);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const  formData=new FormData(e.currentTarget);
    const name=formData.get('name');
    const email=formData.get('email');
    const password=formData.get("password");
    try {
      toast.loading("Signing Up",{id:"signup"})
      await useAuth?.signup(name,email,password);
      toast.success("Signed Up successfully",{id:"signup"})
      navigate('/');
    } catch (error) {
     //console.log(error);
      if(error.response.data==='User already Registered'){
        toast.error("Email already Registered!",{id:"signup"});
      }
      else if(error.response.data==='Username already taken!'){
        toast.error("Username already taken!",{id:"signup"});
      }else{
      toast.error("Signup failed",{id:"signup"});
      }
    }
}
  return (
    <div className='flex justify-center items-center '>
      <form onSubmit={handleSubmit}>
    <div className=' shadow-xl shadow-gray-900 w-[300px] px-5 py-5'>
    <div className='flex   items-center'>
   <img src="logo.png" alt="logo" height={80} width={80} />
   <h1 className='logo text-left'>Edutech</h1>
   </div>
   <div className='flex flex-col gap-5'>
    <h1 className='text text-2xl'>Signup</h1>
    <input name='name' type="text" className='p-2  rounded-lg border border-black'  placeholder="Your name here"/>
    <input type="email" name='email' className='p-2 rounded-lg border border-black'  placeholder="Email here"/>
    <div className=''>
    <input type="password"  name='password' className='p-2 w-full rounded-lg border border-black '  placeholder="Create a Password "/>
    </div>
    <button type='submit' className='bg-[#846446] text-xl text-white w-full p-2 rounded-xl text mt-5'>Signup</button>
    <div className='flex items-center'>
    <hr className='w-28 h-0.5 mx-1  bg-gray-700' />
    <p>OR</p>
    <hr className='w-28 h-0.5 mx-1  bg-gray-700' />
    </div>
    <button className='bg-[#846446] text-xl text-white w-full px-2 py-1 rounded-xl text ' onClick={()=>navigate('/login')}>Login <br />
    <p className='text-sm '>Already have an account?</p> 
    </button>
   </div>
    </div>
    </form>
</div>
  )
}

export default Signup