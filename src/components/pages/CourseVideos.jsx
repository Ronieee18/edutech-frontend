import React, { useEffect, useState } from 'react'
import { getCourse } from '../apihandler/api'
import { Link, useNavigate, useParams } from 'react-router-dom'

function CourseVideos() {
    const {name}=useParams();
    const navigate=useNavigate();
    const [vidArray,setVidArray]=useState([]);
 
 

    useEffect(()=>{ 
        const fetchData=async()=>{
        if(name){
        const res=await getCourse(name);
       //console.log(res.courses);
        if(res && res.courses){
          setVidArray(res.courses)
         
        }
      }
        }
        fetchData();
    },[name])


  return (
    <>
    <div className='m-2 p-2'>
      {vidArray.length > 0 ? (
        vidArray.map((vid) => (
          <div key={vid._id} onClick={()=>navigate(`/courses/${name}/${vid._id}`)} className='flex cursor-pointer gap-10 my-4 max-[800px]:flex-col max-[800px]:items-center  '>
            <video className='' poster={vid.thumbnail} src={vid.video} height={350} width={350}></video>
            <div className="text-left imp">
            <h3 className='imp text-left text-xl'>{vid.title}</h3>
            {/* <p className='imp text-left'>{vid.description}</p> */}
           <h3 className="text-left text-lg text-gray-600">Uploaded By {vid.owner.name}</h3>
            </div>
          </div>
        ))
        ) : (
          vidArray.length===0?<p>No course found!</p>:<p>Loading...</p>
        )}
        </div>
    </>
  )
}

export default CourseVideos