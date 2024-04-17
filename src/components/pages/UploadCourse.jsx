import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios';
// import { addCourse } from '../apihandler/api';

function UploadCourse() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const addCourse=async(formdata)=>{
    const res=await axios.post(`/courses/addCourse`,formdata,{
        headers:{'Content-Type':'multipart/form-data'},
      });
    if(!res.status===201){
        throw new Error("unable to add course");
    }
    const data=await res.data;
    return data;
}

  const onSubmit =async(data) => {
  const formdata=new FormData();
    formdata.append("title", data.title);
    formdata.append("video", data.video[0]);
    formdata.append("thumbnail", data.thumbnail[0]);
    formdata.append("category", data.category);
    formdata.append("description", data.description);

    try {
      toast.loading("Uploading Course...",{id: "upload"});
      const res=await addCourse(formdata);
      toast.success("Upload Successful!",{id:"upload"});
      
    } catch (error) {
     //console.log(error);
      toast.error("Error uploading Course",{id:"upload"})
    }
  };
  return (
    <div className="flex flex-col mt-4 justify-center items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Upload Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative flex gap-3 items-center">
          <p>Course Title:</p>
          <input type="text" className="border border-gray-600 px-2 py-1" name="title" {...register('title', { required: "the field is required" })} />
          {errors.title && <p className="error absolute top-8 left-0 text-[15px]  text-red-500">*{errors.title.message}</p>}

        </div>
        <div className="relative flex gap-3 items-center">
          <p>Your Course File:</p>
          <input type="file" name="video" {...register('video', { required: "Course Video is required!" })} />
          {errors.video && <p className="error absolute top-8 left-0 text-[15px]  text-red-500">*{errors.video.message}</p>}

        </div>
        <div className="relative flex gap-3 items-center mt-2">
          <p>Poster/Thumbnail of Course:</p>
          <input type="file" name="thumbnail" {...register('thumbnail', { required: "Thumbnail for Course is required" })} />
          {errors.thumbnail && <p className="error absolute top-8 left-0 text-[15px]  text-red-500">*{errors.thumbnail.message}</p>}
        </div>
        <div className="relative flex gap-3 items-center mt-3">
          <p>Select Course Category:</p>
          <select name="category" className="border px-2 py-1" {...register('category', { required: "Select Course Category" })}>
            <option value="">Select</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="FullStack Development">FullStack Development</option>
            <option value="Database Management">Database Management</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </select>
          {errors.category && <p className="error absolute top-8 left-0 text-[15px]  text-red-500">*{errors.category.message}</p>}
        </div>
        <div className="relative flex items-center mt-3">
          <p>Course Description:</p>
          <textarea className="border border-gray-600 px-2 py-1" name="description" {...register('description', { required: "Course Description is Required" })} cols="30" rows="4"></textarea>
        </div>
          {errors.description && <p className="error text-left  text-[15px]  text-red-500">*{errors.description.message}</p>}
          
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Upload</button>
      </form>
    </div>
  );
}

export default UploadCourse;
