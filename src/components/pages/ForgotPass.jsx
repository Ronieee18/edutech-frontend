import React, { useState } from 'react';
import { forgotPass } from '../apihandler/api';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


function ForgotPass() {
  const [showPopup, setShowPopup] = useState(true);
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
   try {
     e.preventDefault();
     
     // Handle submitting the email (e.g., send it to the server)
    //console.log(email);
     toast.loading( "Sending reset password link...",{id:"forgot"});
     const res = await forgotPass(email);
     toast.success("Mail sent successfully!",{id:"forgot"})
    //console.log('Submitted email:', res);
     // Close the popup after submitting
     handleClosePopup();
     navigate('/')
   } catch (error) {
     //console.log(error.response.data);
      if(error.response.data==='User Not found'){
        toast.error("No User Found!",{id:"forgot"})
      }
      else{
        toast.error("error sending Mail!Try again later",{id:"forgot"})

      }
   }
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Click to Reset Password</button>

      {showPopup && (
        <div className='relative blurred-background flex flex-col gap-5 justify-center items-center'>
          <div className='popup-container flex flex-col gap-5'>
           <h1 className=' font-bold text-xl text-center'>Forgot Password</h1>
            <div className='flex flex-col gap-2 justify-center items-center'>
            <h2 className='text-lg'>Enter your email</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <input type='email' className='border border-gray-600 p-2' value={email} onChange={handleEmailChange} required />
              <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>Send Mail</button>
            </form>
            <button onClick={handleClosePopup} className='absolute top-2 right-3'>❌</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPass;
