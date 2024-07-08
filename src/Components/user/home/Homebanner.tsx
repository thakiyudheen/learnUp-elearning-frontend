// import React from 'react';
// import homebanner from '../../../assets/homebanner/homebanner.png';
// import home from '../../../assets/homebanner/home.png';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '@/redux/store';
// import { useAppSelector } from '@/hooks/hooke';

// const textContainer = {
//   hidden: { opacity: 1 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.5, // Stagger animation of children by 0.3 seconds
//     },
//   },
// };

// const textItem = {
//   hidden: { opacity: 0, x: '-100%' },
//   visible: { opacity: 1, x: 0 },
// };
// const variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };


// function Homebanner() {
//   const { data } = useAppSelector((state: RootState) => state.user)
//   const navigate = useNavigate()
//   return (
//     <div className=' md:flex justify-evenly items-center w-full md:h-[500px] font-josefin '>
//       <motion.div
//         className="text flex-[1] md:ml-[10rem] ml-[5rem] mt-[4rem] p-4 md:mt-0"
//         variants={textContainer}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1
//           className="font-bold md:text-[40px] text-[2rem] w-[94%] md:w-[80%]"
//           variants={textItem}
//         >
//           Grow up your skills by online courses with{' '}
//           <span className="text-blue-500">learnUp</span>
//         </motion.h1>
//         <motion.p
//           className="text-sm w-[77%] mt-2"
//           variants={textItem}
//         >
//           TOTC is an interesting platform that will teach you in a more interactive way
//         </motion.p>
//         <motion.div
//           className="flex mt-8"
//           variants={textItem}
//         >
//           {
//   !data?.data ? (
//     <button
//       className="bg-blue-700 bg-gradient-to-r from-blue-700 to-blue-700 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
//       onClick={() => navigate('/enrollment')}
//     >
//       Join Now
//     </button>
//   ) : (
//     <button
//       className="bg-blue-700 bg-gradient-to-r from-blue-700 to-blue-700 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
//       onClick={() => navigate('/course-listing')}
//     >
//       Explore More
//     </button>
//   )
// }

          
//           <button
//             className="bg-gray-500 ml-3 bg-gradient-to-r from-gray-500 to-gray-600  rounded-[2rem] shadow-lg text-[1rem] py-2 px-9 text-white"
//           >
//             View
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Motion for Image (Right to Left) */}
//       <motion.div
//         className="image w-full text-[1rem] md:mr-[5rem] flex-[1] mt-4 md:mt-10 flex justify-center relative"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >

//         <dotlottie-player
//           src="https://lottie.host/da0e13ce-8e92-48b2-a4e5-de886d3ba9de/ZxURYoKHcB.json"
//           background="transparent"
//           speed=".3"
//           style={{ width: '400px', height: '400px' }}
//           className='mt-10'
//           loop
//           autoplay
//         ></dotlottie-player>
//       </motion.div>
//     </div>
//   );
// }

// export default Homebanner;


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import Home from '../../../assets/homebanner/22378291_6567451.svg';


const textItem = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: 0 },
};
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const Homebanner: React.FC = () => {
    const { data } = useAppSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  font-Poppins   p-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 mt-[6rem] md:mt-0 md:p-0 p-4"
        >
          <h1 className="text-4xl text-[2rem]  font-bold text-gray-900 dark:text-white">
            Grow up your skills by online courses with
            <span className="text-blue-600"> learnUp</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            <small>
          Welcome to learnUp, where interactive online courses make learning engaging and effective. Designed for all learners, our courses help you achieve your goals. Join us today!
          </small>
             </p>
          <motion.div
          className="flex space-x-4"
          variants={textItem}
        >
          {
  !data?.data ? (
    <button
      className="bg-blue-700 bg-gradient-to-r from-blue-700 to-blue-700 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
      onClick={() => navigate('/enrollment')}
    >
      Join Now
    </button>
  ) : (
    <button
      className="bg-blue-700 bg-gradient-to-r from-blue-700 to-blue-700 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
      onClick={() => navigate('/course-listing')}
    >
      Explore More
    </button>
  )
}

          
          <button
            className="bg-gray-500 ml-3 bg-gradient-to-r from-gray-500 to-gray-600  rounded-[2rem] shadow-lg text-[1rem] py-2 px-9 text-white"
          >
            View
          </button>
        </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img src={Home} alt="LearnUp" className="max-w-full h-auto" />
          {/* <dotlottie-player
          src="https://lottie.host/da0e13ce-8e92-48b2-a4e5-de886d3ba9de/ZxURYoKHcB.json"
          background="transparent"
          speed=".3"
          style={{ width: '400px', height: '400px' }}
          className='mt-10'
          loop
          autoplay
        ></dotlottie-player> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Homebanner;
