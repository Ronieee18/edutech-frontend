import React, { useEffect, useState } from 'react';
import About from './About';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['img11.png', 'img22.png'];
  

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
   
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      
    }, 3000);

    return () => clearInterval(interval); // Cleanup function to clear the interval

  }, [images.length]);

  return (
    <>
    <div className='flex max-[900px]:hidden mt-[105px] justify-center my-10 items-center h-[75vh] max-[]: gap-20 max-[900px]:my-5 mx-10'>
      <div className='relative overflow-hidden'>
        <img
          className={`h-[70%] w-[100%] p-7  `}
          src={images[currentImageIndex]}
          alt=""
        />
        <button
          className="absolute top-1/2 left-6 text-4xl font-extrabold transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          onClick={goToPreviousImage}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-6 text-4xl font-extrabold transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          onClick={goToNextImage}
        >
          &gt;
        </button>
      </div>
    </div>


    <div className='flex min-[900px]:hidden flex-col  items-center h-[75vh] gap-20 my-5 max-[900px]:my-10 mx-10'>
        <img src="home.jpg" alt="" height={500} width={500} />
        <div>
            <h1 className='home-h1'>Welcome to Edutech!</h1>
            <p className='text-[#474444] w-[100%]  '>"Embark on your journey of knowledge with our comprehensive range of courses, designed for learners of all levels. Discover, learn, and grow with ease on our platform."
                </p>
            <button className='p-2 bg-[#846446] text-white mt-4 w-2/4 text-2xl rounded-lg'>Login</button>
        </div>
    </div>
    <About/>
    </>
  );
}

export default Home;
