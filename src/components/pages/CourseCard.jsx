import React from 'react'
import { getCategoryById } from '../apihandler/api';
import {useNavigate} from 'react-router-dom'


function CourseCard({course}) {
    const navigate=useNavigate();
    const handleCourseClick = async (id, videoId) => {
        try {
          const category = await getCategoryById(id);
          if (!category) {
           //console.log("category not found");
          }
          navigate(`/courses/${category.name}/${videoId}`);
        } catch (error) {
         //console.log(error);
        }
      };
  return (
    <div className='flex items-center flex-col border border-gray-300 rounded p-4 w-[250px] gap-5'>
    <img src={course.thumbnail} alt="" height={200} width={200} />
    <h2 className='text-lg font-semibold'>{course.title}</h2>
    <p className='text-sm text-gray-600'>Total Enrolled Users {course.enrolledUsers}</p>
    {/* Other course details */}
    <button className='text-white bg-blue-600 hover:bg-blue-800 text-md p-2'
    onClick={() => handleCourseClick(course.category, course._id)}
    >View Course</button>
  </div>
  )
}

export default CourseCard