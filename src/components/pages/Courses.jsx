import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCardClick = (name) => {
    setSelectedCategory(name);
    navigate(`/courses/${name}`);
  };
  return (
    <>
      <h1 className="text text-left text-2xl m-3">Choose Course Category:</h1>
      <div className="flex max-[700px]:flex-col justify-center items-center gap-10 m-3">
        <div
          onClick={() => handleCardClick("Frontend Development")}
          className="card flex flex-col items-center  frontend border border-gray-700 p-2"
        >
          <img src="frontend.jpg" alt="Frontend" height={150} width={150} />
          <p className="text-center">Frontend Development</p>
        </div>

        <div
          onClick={() => handleCardClick("Backend Development")}
          className="card flex flex-col items-center backend border border-gray-700 p-2"
        >
          <img src="backend.png" alt="Backend" height={100} width={100} />
          <p className="text-center">Backend Development</p>
        </div>
      </div>

      <div className="flex max-[700px]:flex-col justify-center items-center gap-10 mt-12">
        <div
          className="card flex flex-col items-center  frontend border border-gray-700 p-2"
          onClick={() => handleCardClick("FullStack Development")}
        >
          <img src="fullstack.png" alt="Fullstack" height={100} width={180} />
          <p className="text-center">FullStack Development</p>
        </div>

        <div
          onClick={() => handleCardClick("Database Management")}
          className="card flex flex-col items-center backend border border-gray-700 p-2"
        >
          <img src="database.jpg" alt="Database" height={160} width={170} />
          <p className="text-center">Database Management</p>
        </div>


        <div
          onClick={() => handleCardClick("Artificial Intelligence")}
          className="card flex flex-col items-center backend border border-gray-700 p-2"
        >
          <img src="ai.jpg" alt="Artificial Intelligence" height={160} width={170} />
          <p className="text-center">Artificial Intelligence</p>
        </div>
      </div>
    </>
  );
}

export default Courses;
