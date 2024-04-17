import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import { resetPass } from '../apihandler/api';
import {toast} from 'react-hot-toast'



function ResetPass() {
  const [showPopup, setShowPopup] = useState(true);
  const [password, setPassword] = useState('');
  const {id,token}=useParams();

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
   try {
     e.preventDefault();
     
     // Handle submitting the email (e.g., send it to the server)
    //console.log(password);
    //console.log(id);
    //console.log(token);
     toast.loading( "Resetting Your Password",{id:"pass"});
     const res = await resetPass(id,token,password);
     toast.success("Passwrod reset Successsfully",{id:"pass"})
    //console.log('Submitted email:', res);
     // Close the popup after submitting
     handleClosePopup();
   } catch (error) {
     //console.log(error);
      toast.error("error resetting Password",{id:"pass"})

      
   }
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Click to Reset Password</button>

      {showPopup && (
        <div className='relative blurred-background flex flex-col gap-5 justify-center items-center'>
          <div className='popup-container flex flex-col gap-5'>
           <h1 className=' font-bold text-xl text-center'>Reset Password</h1>
            <div className='flex flex-col gap-2 justify-center items-center'>
            <h2 className='text-lg'>Enter your new Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <input type='password' className='border border-gray-600 p-2' value={password} onChange={handlePasswordChange} required />
              <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>Reset Password</button>
            </form>
            <button onClick={handleClosePopup} className='absolute top-2 right-3'>❌</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPass;
