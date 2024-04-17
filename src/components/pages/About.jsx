import React, { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Testimonials from "./Testimonials";

const About = () => {
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  const [card1InView, setCard1InView] = useState(false);
  const [card2InView, setCard2InView] = useState(false);
  const { ref: card1Ref, inView: card1IsInView } = useInView({
    triggerOnce: true,
    threshold: 0.0,
  });
  const { ref: card2Ref, inView: card2IsInView } = useInView({
    triggerOnce: true,
    threshold: 0.0,
  });

  useEffect(() => {
    if (card1IsInView) {
      setCard1InView(true);
    }
  }, [card1IsInView]);

  useEffect(() => {
    if (card2IsInView) {
      setCard2InView(true);
    }
  }, [card2IsInView]);

  return (
    <>
    <div className="container mx-auto py-1 mt-48 min-[900px]:mt-36">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>

      <div className="flex flex-col gap-10 max-[800px]:items-center">
        <div
          ref={card1Ref}
          className={`bg-white shadow-lg ml-5 max-[700px]:flex-col max-[700px]:max-w-[500px] max-w-[600px] rounded-lg overflow-hidden flex items-center ${
            card1InView ? "" : "transition-none"
          } ${
            card1InView
              ? "transform opacity-100 transition-transform duration-[2000ms] translate-x-0"
              : "translate-x-80 opacity-0"
          }`}
        >
          <img
            src="img111.jpg" // Add your image source
            alt="About Us"
            className="w-[250px] object-cover h-[200px]"
          />
          <div className="p-4 w-1/2 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Our Mission
            </h2>
            <p className="text-gray-700 text-center">
              "We empower lifelong learners with diverse, accessible courses,
              fostering continuous growth in knowledge and skills for personal
              and professional development."
            </p>
          </div>
        </div>

        <div
          ref={card2Ref}
          className={`bg-white ml-auto max-[800px]:mr-1 mr-16 shadow-lg max-[700px]:flex-col max-[700px]:max-w-[500px] max-w-[700px] rounded-lg overflow-hidden flex items-center
          ${
            card2InView
              ? "transform opacity-100 transition-transform duration-[2000ms] translate-x-0"
              : "-translate-x-80 opacity-0"
          }
          `}
        >
          <img
            src="courses.jpg" // Add your image source
            alt="Courses"
            className="w-1/2 h-auto object-cover"
          />
          <div className="p-4 w-1/2">
            <h2 className="text-xl font-semibold mb-2">Course Categories</h2>
            <p className="text-gray-700 text-center">
              "Discover programming, design, data science, and more in our
              diverse course catalog. Accessible learning for all levels. Start
              your journey with us today!"{" "}
            </p>
            <button
              className="p-2 rounded-md bg-blue-600 text-white mt-4"
              onClick={() =>
                navigate(useAuth.isLoggedIn ? "/courses" : "/login")
              }
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <Testimonials/>
    </>
  );
};

export default About;
