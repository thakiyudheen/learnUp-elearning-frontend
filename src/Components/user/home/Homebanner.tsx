import React from 'react';
import homebanner from '../../../assets/homebanner/homebanner.png';
import home from '../../../assets/homebanner/home.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const textContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Stagger animation of children by 0.3 seconds
    },
  },
};

const textItem = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: 0 },
};
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};


function Homebanner() {
  const navigate=useNavigate()
  return (
    <div className=' md:flex justify-evenly items-center w-full md:h-[500px] '>
      {/* Motion for Text Content (Left to Right) */}
      {/* <motion.div
        className="text flex-[1] md:ml-[10rem] ml-[5rem]"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'tween', duration: 0.5 }}
      >
        <h1 className='font-bold text-[2rem] w-[90%] md:w-[75%]'>Grow up your skills by online courses with <span className='text-blue-500'>learnUp</span></h1>
        <p className='text-sm w-[77%] mt-2'>TOTC is an interesting platform that will teach you in a more interactive way</p>
        <div className="flex mt-8">
          <button className='bg-blue-700 rounded-[2rem] shadow-lg text-[1rem] py-2 px-3 text-white' onClick={()=>navigator('/enrollment')}>Join Now</button>
          <button className='bg-gray-500  ml-3 rounded-[2rem] shadow-lg text-[1rem] py-2 px-5 text-white'>View</button>
        </div>
      </motion.div> */}
       <motion.div
      className="text flex-[1] md:ml-[10rem] ml-[5rem] mt-[4rem] p-4 md:mt-0"
      variants={textContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-bold md:text-[35px] text-[2rem] w-[94%] md:w-[75%]"
        variants={textItem}
      >
        Grow up your skills by online courses with{' '}
        <span className="text-blue-500">learnUp</span>
      </motion.h1>
      <motion.p
        className="text-sm w-[77%] mt-2"
        variants={textItem}
      >
        TOTC is an interesting platform that will teach you in a more interactive way
      </motion.p>
      <motion.div
        className="flex mt-8"
        variants={textItem}
      >
        <button
          className="bg-blue-700 bg-gradient-to-r from-blue-400 to-blue-900 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
          onClick={() => navigate('/enrollment')}
        >
          Join Now
        </button>
        <button
          className="bg-gray-500 ml-3 bg-gradient-to-r from-gray-400 to-gray-700  rounded-[2rem] shadow-lg text-[1rem] py-2 px-5 text-white"
        >
          View
        </button>
      </motion.div>
    </motion.div>
      
      {/* Motion for Image (Right to Left) */}
      <motion.div
        className="image w-full text-[1rem] md:mr-[5rem] flex-[1] mt-4 md:mt-10 flex justify-center relative"
        initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
      >
       {/* <div className='bg-blue-600 w-[20rem] h-[15rem] absolute top-[8rem]  rounded-tl-[6rem] hidden md:block rounded-lg'></div> */}
        {/* <motion.img
          src={home}
          alt="Home Banner"
          className='md:h-[23rem] h-[11rem] '
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'tween', duration: 0.5 }}
        /> */}
        

        <dotlottie-player
        src="https://lottie.host/da0e13ce-8e92-48b2-a4e5-de886d3ba9de/ZxURYoKHcB.json"
        background="transparent"
        speed="1"
        style={{ width: '400px', height: '400px' }}
        className='mt-10'
        loop
        autoplay
      ></dotlottie-player>
      </motion.div>
    </div>
  );
}

export default Homebanner;
