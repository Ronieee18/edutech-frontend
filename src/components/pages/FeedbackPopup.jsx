import React from 'react';
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast';
import { postFeedback } from '../apihandler/api';

const FeedbackPopup = ({ onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const submitFeedback=async(data)=>{
        try {
            toast.loading("Submitting feedback...",{id:"feedback"});
            const res= await postFeedback(data.comment );
            toast.success("Feedback Submitted",{id:"feedback"});
            onClose();
            reset();
            
        } catch (error) {
           //console.log(error);
            toast.error("some error occured while submitting FeedBack",{id:"feedback"});
        }
    }
    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-md z-50">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
        <p className="mb-4">
          We appreciate you completing the course. Your feedback helps us improve.
        </p>
        <form onSubmit={handleSubmit(submitFeedback)} className='relative'>
        <textarea
          rows={4}
          placeholder="Enter your feedback..."
          className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
          {...register("comment",{required:"Please enter your Feedback"})}
        ></textarea>
         {errors.comment && <p className="error absolute top-28 left-0 text-[15px] text-red-500">*{errors.comment.message}</p>}

        <button type='submit' className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4">
          Submit Feedback
        </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;
