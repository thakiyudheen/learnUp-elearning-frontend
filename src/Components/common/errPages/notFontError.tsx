
import React from 'react';
import Navbar from '../user/navbar/Navbar';
import  Four from '../../../assets/404/404.svg'

const notFontError: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className='flex justify-center  min-h-screen font-Poppins'>
    <div className="flex flex-col items-center justify-center   rounded-lg p-8   w-[70%]  ">
    {/* <dotlottie-player src="https://lottie.host/8d179cd5-1ed9-425b-ba12-1896652e39b4/TGMzPkuD25.json" background="transparent" speed="1" style={{width:'250px', height: "250px"}} loop autoplay></dotlottie-player> */}
    <img src={Four} alt="" className='md:w-[40%] w-[100%] ' />
    <small className='text-blue-700 font-semibold'>Page Not Fount !</small>
      
    </div>
    </div>
    </>
  );
};

export default notFontError;



