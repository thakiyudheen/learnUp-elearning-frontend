
import React from 'react';
import Navbar from '../user/navbar/Navbar';

const ProcessingPage: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center h-[38rem] '>
    <div className="flex flex-col items-center justify-center h-screen shadow-lg  w-[70%] h-[25rem] mt-[10%]">
      <dotlottie-player 
        src="https://lottie.host/02a55678-c52e-461d-b662-81565a3d67f5/m54wbccbib.json" 
        background="transparent" 
        speed=".5" 
        style={{ width: '1500px', height: '150px' }} 
        loop 
        autoplay
      ></dotlottie-player>
      <h2 className="text-lg font-semibold mt-4">Processing your request, please wait...</h2>
    </div>
    </div>
    </>
  );
};

export default ProcessingPage;


