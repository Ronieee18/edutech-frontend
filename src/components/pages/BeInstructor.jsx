import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { addInstructor } from '../apihandler/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function BeInstructor() {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {register,handleSubmit,reset,formState:{errors}}=useForm();
  const uploadInstructorDetails=async(data)=>{
    setLoading(true);
    const formdata=new FormData();
    formdata.append("degree",data.degree);
    formdata.append("experience",data.experience);
    formdata.append("specialization",data.specialization);
    formdata.append("certificate",data.certificate[0]);
    formdata.append("resume",data.resume[0]);

    try {
      toast.loading("Uploading all details...",{id:"instructor"})
      const res=await addInstructor(formdata);
      toast.success("Details Uploaded.",{id:"instructor"})
     //console.log(res);
      navigate('/uploadCourse')
      

      
    } catch (error) {
      toast.error("Error Occured while uploading the data.",{id:"instructor"});
     //console.log(error);

    }
  }
  return (
    <div>
        <div className="flex gap-20">
            <img src="instructor.png" alt="Become an Instructor" />
            <div className='my-4'>
                <h1 className='text text-2xl text-left'>Become an Instructor</h1>
                <h1 className='text-xl text-left mt-2'>Share your Academic Career & Experience:</h1>
                <form onSubmit={handleSubmit(uploadInstructorDetails)}>
                  <div className='relative flex gap-3 mt-5'>
                  <p>Degree:</p> 
                  <input type="text" name='degree' className='border border-black' placeholder='Degree'
                  {...register('degree',{required:'this field is required'})}
                  />
                  {errors.degree && <p className="error absolute top-6 left-0 text-[15px]  text-red-500">*{errors.degree.message}</p>}
                  </div>
                  <div className='relative flex gap-3 mt-5'>
                   <p>Experience :</p>
                   <input min={0} type="number" name='experience' className='border border-black' placeholder='Job experience' 
                   {...register('experience',{required:'please mention your job experience'})}
                   />years
                   {errors.experience && <p className="error absolute top-6 left-0 text-[15px]  text-red-500">*{errors.experience.message}</p>}
                  </div>
                  <div className='relative flex gap-3 mt-5'>
                    <p>Select your specialization: </p>
                    <select name="specialization" className='border' id=""
                    {...register('specialization',{required:'this field is required'})}
                    >
                      <option selected value="" >Select</option>
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend Development">Backend Development</option>
                      <option value="FullStack Development">FullStack Development</option>
                      <option value="Database Management">Database Management</option>
                    </select>
                    {errors.specialization && <p className="error absolute top-6 left-0 text-[13px]  text-red-500">*{errors.specialization.message}</p>}

                    
                  </div>
                  <div className='relative flex gap-3 mt-5'>
                  <p>Upload Your Degree :</p>
                    <input type="file" name="certificate" id="" 
                     {...register('certificate',{required:'this field is required'})}
                    />
                  {errors.certificate && <p className="error absolute top-11 left-0 text-[15px]  text-red-500">*{errors.certificate.message}</p>}

                    <p className='absolute top-6 text-red-500'>*Only image allowed</p>
                  </div>

                  <div className='relative flex gap-3 mt-10'>
                  <p>Upload Your Resume :</p>
                    <input type="file" name="resume" id=""
                     {...register('resume',{required:'this field is required'})}
                    />
                  {errors.resume && <p className="error absolute top-11 left-0 text-[15px]  text-red-500">*{errors.resume.message}</p>}

                    <p className='absolute top-6 text-red-500'>*Only image allowed</p>
                  </div>

                    <p className='mt-10 text-left text-sm text-gray-600'>*Note: You will be able to upload course after submitting all details, but your 
                      documents will be scrutinized by Our team, and if found  unfit or misleading, we may remove courses 
                      uploaded by you.
                    </p>
                    <div>
                    <button type="submit" className='bg-[#846446] text-xl text-white w-2/4 px-2 py-1 rounded-xl mt-5 text '>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default BeInstructor