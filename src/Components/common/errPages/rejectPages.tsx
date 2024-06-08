import React from 'react';
import Navbar from '../user/navbar/Navbar';

const RejectPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center shadow-lg w-[70%] h-[25rem]   rounded-lg">
          <dotlottie-player
            src="https://lottie.host/04c8bf50-1f92-4db4-a831-995e015139c5/AZclUMzIDb.json"
            background="transparent"
            speed=".5"
            style={{ width: '150px', height: '150px' }}

            autoplay
          ></dotlottie-player>
          <h2 className="text-lg font-semibold mt-4">Your request has been Rejected, check your Mail..!</h2>
        </div>
      </div>
    </>
  );
};

export default RejectPage;
