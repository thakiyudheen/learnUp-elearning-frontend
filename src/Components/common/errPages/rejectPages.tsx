import React from 'react';
import Navbar from '../user/navbar/Navbar';

const RejectPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen font-Poppins">
        <div className="flex flex-col items-center justify-center w-[70%] h-[25rem]   rounded-lg">
          <dotlottie-player
            src="https://lottie.host/04c8bf50-1f92-4db4-a831-995e015139c5/AZclUMzIDb.json"
            background="transparent"
            speed=".5"
            style={{ width: '150px', height: '150px' }}

            autoplay
          ></dotlottie-player>
          <small className="text-lg font-semibold mt-3">Your request has been Rejected, check your Mail..!</small>
          <button className='bg-blue-700 text-white mt-6 py-1 px-5 rounded-lg'>
          <small>Re Apply</small> 
        </button>        
        </div>
        
      </div>
    </>
  );
};

export default RejectPage;
