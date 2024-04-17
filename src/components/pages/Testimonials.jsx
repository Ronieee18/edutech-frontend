import React, { useEffect, useState } from 'react';
import { getallFeedbacks } from '../apihandler/api';

function Testimonials() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await getallFeedbacks();
                setFeedbacks(res.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        fetchFeedbacks();
    }, []);

    const totalPages = Math.ceil(feedbacks.length / cardsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * cardsPerPage;
    const visibleFeedbacks = feedbacks.slice(startIndex, startIndex + cardsPerPage);

    return (
        <>
            <hr  className='h-0.5 bg-black mt-10'/>
            <h1 className='text-2xl text-center mt-7'>Testimonials</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4  ">
                {visibleFeedbacks.map((feedback, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 max-[650px]:w-[220px] mx-auto justify-center items-center">
                        <img src="coma.png" alt="" height={35} width={35} />
                        <div className='flex flex-col gap-4 justify-center items-center'>
                        <img src="user.png" className='p-2 rounded-full bg-white border border-gray-600' alt="USER" height={60} width={60} />

                        <h3 className="text-lg font-semibold">{feedback.name}</h3>
                        </div>
                        <p className="text-gray-600">{feedback.comment}</p>
                        
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 py-5">
                <button
                    className="bg-blue-500 disabled:bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <button
                    className="bg-blue-500 disabled:bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </>
    );
}

export default Testimonials;
