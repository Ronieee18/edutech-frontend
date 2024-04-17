import React, { useContext, useEffect, useRef, useState } from "react";
import {
  currentlyEnrolledUsers,
  enrollCourse,
  getOwner,
  getSingleCourse,
  removeCourse,
} from "../apihandler/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/Authcontext";
import FeedbackPopup from "./FeedbackPopup";

function CourseEnroll() {
  const { name, id } = useParams();
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const [courseData, setCourseData] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentEnrolled, setCurrentEnrolled] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [videoCompleted, setVideoCompleted] = useState(false); // State to track video completion

  const useAuth = useContext(AuthContext);
  const videoRef = useRef(null);
 
  ////console.log(useAuth.user.courses);

  const getCurrentEnrolled = async () => {
    const res = await currentlyEnrolledUsers(id);
    setCurrentEnrolled(res.courseCount[0].count); 
    ////console.log(res.courseCount[0].count);
  };
  useEffect(() => {
    setEnrolledCourses(useAuth.user.courses);
    getCurrentEnrolled();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await getSingleCourse(name, id);
      ////console.log(res);
      setCourseData(res.course);
      setLoading(false);
      
    };
    fetchCourse();
  }, [name, id]);
  
  useEffect(() => {
    ////console.log(courseData.owner.name); // Log courseData after it's updated
    if (enrolledCourses.includes(courseData._id)) {
      setEnrolled(true);
    }
    // courseOwner();
  }, [courseData]);

  // Function to enroll in course...
  const enrollInCourse = async () => {
    try {
      toast.loading("Enrolling in course", { id: "enroll" });
      const res = await enrollCourse(name, id);
      toast.success("Enrolled in this course", { id: "enroll" });
      setEnrolled(true);
    } catch (error) {
      ////console.log(error.response.data);
      if (error.response.data === "course already enrolled!") {
        toast("Already enrolled in this course❗", {
          id: "enroll",
          duration: 3000,
        });
      } else {
        toast.error("failed to enroll ! Try after some time", { id: "enroll" });
      }
    }
  };

  const playVideo = () => {
    if (enrolled && videoRef.current) {
      videoRef.current.play();
    } else {
      toast.error("PLease enroll to start learning!");
    }
  };

  const handleVideoEnd = async () => {
    if (!videoCompleted) {
      setVideoCompleted(true);
      toast.success("Congratulation on completing the course!!");
      setShowFeedbackPopup(true);
      const res = await removeCourse(id);
     //console.log(res);
    }
  };

  return (
    <>
    {loading?
    (<p>Loading...</p>):(
      <>
      <div className="m-2 p-2 flex max-[850px]:flex-col gap-10">
        <video
          controls={enrolled}
          ref={videoRef}
          poster={courseData.thumbnail}
          src={courseData.video}
          height={400}
          width={550}
          controlsList="nodownload"
          onEnded={handleVideoEnd}
          onContextMenu={(e) => e.preventDefault()}
        ></video>
        <div>
          <h1 className="font-sans text-2xl text-left">{courseData.title}</h1>
          <h3 className="text-left text-lg text-gray-600">Uploaded By {courseData.owner.name} </h3>
          <p className="text-left mt-5 ">
            <span className="text-blue-700"> Currently Enrolled Users :</span>{" "}
            {currentEnrolled}
          </p>
          <p className="text-left mt-1">
            <span className="text-blue-700"> Total Enrolled Users :</span>{" "}
            {courseData.enrolledUsers}
          </p>
          {enrolled ? (
            <button
              className="bg-blue-600  hover:bg-blue-800 text-white font-sans p-2 mt-5"
              onClick={playVideo}
            >
              Continue learning!
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-sans p-2 mt-5"
              onClick={enrollInCourse}
            >
              Enroll In Course
            </button>
          )}
        </div>
      </div>
      <h1 className="text-xl m-2 mt-5 font-serif text-left">
        Course Description:{" "}
      </h1>
      <h2 className="text-left m-3 mt-5">{courseData.description}</h2>
      </>
    )}
    {showFeedbackPopup && <FeedbackPopup
     isOpen={!showFeedbackPopup}
     onClose={() => setShowFeedbackPopup(false)}
    />}
    </>
  );
}

export default CourseEnroll;
