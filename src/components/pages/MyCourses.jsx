import React, { useEffect, useState } from "react";
import { getCategoryById, getEnrolledCourses } from "../apihandler/api";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const [courseArray, setcourseArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEnrolledCourses();
     //console.log(res);
      setcourseArray(res.courses);
    };
    fetchData();
  }, []);

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
 //console.log(courseArray);
  return (
    <>
      <div className="flex flex-col w-full max-[800px]:justify-center m-2 p-2">
        {courseArray.length > 0 ? (
          courseArray.map((vid) => (
            <div
              key={vid._id}
              onClick={() => handleCourseClick(vid.category, vid._id)}
              className="flex cursor-pointer gap-10 my-4 max-[800px]:flex-col max-[800px]:justify-center max-[800px]:items-center w-full"
            >
              <video
                className=""
                poster={vid.thumbnail}
                src={vid.video}
                height={350}
                width={350}
              ></video>
              <div className="">
                <h3 className="text-left  text-xl">{vid.title}</h3>
                <h3 className="text-left text-lg text-gray-600">By {vid.owner.name} </h3>
              </div>
            </div>
          ))  
        ) : (
          courseArray.length===0?<p>No course found!</p>:<p>Loading...</p>
          
        )}
      </div>
    </>
  );
}

export default MyCourses;
