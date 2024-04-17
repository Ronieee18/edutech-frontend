import React, { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import {IoKeyOutline} from 'react-icons/io5'
import {toast} from 'react-hot-toast'
import { changePass, getCoursesUploadedByUser } from '../apihandler/api';
import {useNavigate} from 'react-router-dom'
import CourseCard from './CourseCard';

function Profile() {
    const useAuth=useContext(AuthContext);
    const navigate=useNavigate();
    const [courseArray,setCourseArray]=useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const handleOpenPopup = () => {
      setShowPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
      setOldPassword('');
      setNewPassword('');
      setCnfPassword('');
    };
    const handleOldPasswordChange = (e) => {
      setOldPassword(e.target.value);
    };
    const handleCnfPasswordChange = (e) => {
      setCnfPassword(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
    const handleSubmit = async(e) => {
     try {
      toast.loading("Changing Password",{id:"change"})
       e.preventDefault();
       if(newPassword.trim()==='' || newPassword.length<6){
         toast.error("new password must be of 6 or more characters",{id:"change"});
         return;
       }
       if(newPassword !== cnfPassword){
        toast.error("Confirm password does not match new password",{id:"change"});
        return;
      }
      const res=await changePass(newPassword,oldPassword);
      toast.success("Password Changed  Successfully!",{id:"change"});
      handleClosePopup();
    } catch (error) {
     //console.log(error);
      if(error.response.status===401){
        toast.error("Wrong old Password!",{id:"change"});
      }else{
      toast.error("Error changing password",{id:"change"});
      }
     }
      
    }

    useEffect(()=>{
      const getCourses=async()=>{
        const res=await getCoursesUploadedByUser();
        setCourseArray(res.courses);
       //console.log(res.courses);
      }
      getCourses();
    },[])

     // Pagination logic
  const itemsPerPage = 3;
  const totalPages = Math.ceil(courseArray.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, courseArray.length);
  const currentCourses = courseArray.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  return (
    <>
    <div className='relative flex mx-5 my-5 gap-4 items-center'>

      <img src="user.png" className='p-2 rounded-full bg-white border border-gray-600' alt="USER" height={60} width={60} />
      <div className=''>
        <p className='text-left text-xl mb-1'>Username : {useAuth.user.name}</p>
        <p className='text-xl'>Email : {useAuth.user.email}</p>
    </div>
    <button 
    onClick={handleOpenPopup}
    className='p-2 flex gap-1 items-center max-[600px]:left-3 max-[600px]:top-16 max-[600px]:w-[37%] align-center absolute right-2 bg-blue-600 hover:bg-blue-800 text-white'>
      Change Password
      <IoKeyOutline/></button>
    </div>
    {showPopup && (
        <div className='relative blurred-background flex flex-col gap-5 justify-center items-center'>
          <div className='popup-container1 flex flex-col gap-5'>
           <h1 className=' font-bold text-xl text-center'>Change Password</h1>
            <div className='flex flex-col gap-2 justify-center items-center'>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <div className='flex gap-3'>
              <h2 className='text-lg'>Old Password : </h2>
              <input type='password' className='border border-gray-600 p-2 max-[600px]:p-1' value={oldPassword} onChange={handleOldPasswordChange} required />
              </div>
              <div className='flex gap-3'>
              <h2 className='text-lg'>New Password : </h2>
              <input type='password' className='border border-gray-600 p-2 max-[600px]:p-1' value={newPassword} onChange={handleNewPasswordChange} required />
              </div>
              <div className='flex gap-1'>
              <h2 className='text-left w-full'>Confirm Password : </h2>
              <input type='password' className='border border-gray-600 p-2 max-[600px]:p-1' value={cnfPassword} onChange={handleCnfPasswordChange} required />
              </div>
              <button type='submit' 
              className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2'
              >Change Password</button>
            </form>
            <button onClick={handleClosePopup} className='absolute top-2 right-3'>❌</button>
            </div>
          </div>
        </div>
      )}

<hr  className='mt-10 h-0.5 bg-black max-[600px]:mt-16'/>
      <div className=' mt-10 mx-10'>
        <h1 className='text-2xl text text-left my-3 '>Courses Uploaded By You:</h1>
        <div className='relative flex flex-wrap justify-center gap-10'>
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className='flex justify-between mt-4'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='bg-blue-500  hover:bg-blue-700 text-white disabled:bg-gray-600 font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile