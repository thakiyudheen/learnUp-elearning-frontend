
import React from 'react';
import Navbar from '../user/navbar/Navbar';

const notFontError: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className='flex justify-center  min-h-screen '>
    <div className="flex flex-col items-center justify-center h-[50%] mt-[10%] rounded-lg p-8   w-[70%]  ">
    <dotlottie-player src="https://lottie.host/8d179cd5-1ed9-425b-ba12-1896652e39b4/TGMzPkuD25.json" background="transparent" speed="1" style={{width:'250px', height: "250px"}} loop autoplay></dotlottie-player>

      <h2 className="text-lg font-semibold mt-4">Not Found Error</h2>
    </div>
    </div>
    </>
  );
};

export default notFontError;



