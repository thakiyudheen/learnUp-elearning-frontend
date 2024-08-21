import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Feature from '../../../assets/features/1stimg.svg';
import Feature2 from '../../../assets/features/2ndimg.svg';
import Feature3 from '../../../assets/features/3rdimg.svg';

const Features: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=' font-Poppins p-6 md:p-0'>
      <h1 className='text-center font-bold text-[20px]'>
        <span className='text-blue-900'>Our</span> <span className='text-blue-500'>Features</span>
      </h1>
      <p className='p-2 md:p-0 text-[14px] text-center'>
        This very extraordinary feature can make learning activities more efficient
      </p>

      {/* First Section */}
      <div className='md:flex mt-10 md:h-[350px] justify-evenly'>
        <motion.div
          className="image flex-[1] flex justify-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 100 ? 1 : 0, // Fade in when scroll position is greater than 100
            y: scrollPosition > 100 ? 0 : 20, // Move up when scroll position is greater than 100
          }}
          transition={{ duration: 0.5 }}
        >
          <img src={Feature} className='md:h-[20rem] h-[15rem] md:ml-[7rem]' alt="feature" />
        </motion.div>
        <motion.div
          className='flex-[1] text-center md:text-start md:ml-[6rem]'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 100 ? 1 : 0, // Fade in when scroll position is greater than 100
            y: scrollPosition > 100 ? 0 : 20, // Move up when scroll position is greater than 100
          }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-blue-900 text-[25px] font-bold md:w-[60%] mt-11'>A <span className='text-blue-500'>user interface</span> designed for the classroom</h1>
          <ul className="md:list-disc  md:w-[50%] w-[70%] mt-[1rem] w-full flex justify-center flex-col">
            <li className='text-[14px] pt-2'>Teachers don’t get lost in the grid view and have a dedicated Podium space.</li>
            <li className='text-[14px] pt-2'>TA’s and presenters can be moved to the front of the class.</li>
            <li className='text-[14px]'>Teachers can easily see all students and class data at one time.</li>
          </ul>
        </motion.div>
      </div>

      {/* Second Section */}
      <div className='md:flex md:h-[400px] justify-evenly items-center'>
        <motion.div
          className="image flex-[1] flex justify-center md:order-2 md:relative right-[10rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 300 ? 1 : 0, // Fade in when scroll position is greater than 300
            y: scrollPosition > 300 ? 0 : 20, // Move up when scroll position is greater than 300
          }}
          transition={{ duration: 0.5 }}
        >
          <img src={Feature2} className='md:h-[23rem] h-[15rem] md:ml-[7rem]' alt="feature" />
        </motion.div>
        <motion.div
          className='flex-[1] md:ml-[13rem] md:order-1 text-center md:text-start'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 300 ? 1 : 0, // Fade in when scroll position is greater than 300
            y: scrollPosition > 300 ? 0 : 20, // Move up when scroll position is greater than 300
          }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-blue-900 text-[25px] font-bold md:w-[60%] '><span className='text-blue-500'>Tools </span>for Teachers and Learners </h1>
          <p className='text-[14px]  mt-[1.5rem]   md:w-[23rem] '> Class has a dynamic set of teaching tools built to be deployed and used during class.Teachers can handout assignments in real-time for students to complete and submit</p>
        </motion.div>
      </div>

      {/* Third Section */}
      <div className='md:flex mt-10  md:h-[350px] justify-evenly'>
        <motion.div
          className="image flex-[1] flex justify-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 500 ? 1 : 0, // Fade in when scroll position is greater than 500
            y: scrollPosition > 500 ? 0 : 20, // Move up when scroll position is greater than 500
          }}
          transition={{ duration: 0.5 }}
        >
          <img src={Feature3} className='md:h-[20rem] h-[15rem] md:ml-[7rem]' alt="feature" />
        </motion.div>
        <motion.div
          className='flex-[1] text-center md:text-start md:ml-[6rem]'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollPosition > 500 ? 1 : 0, // Fade in when scroll position is greater than 500
            y: scrollPosition > 500 ? 0 : 20, // Move up when scroll position is greater than 500
          }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-blue-900 text-[25px] font-bold md:w-[60%] mt-11'>Assessments,<span className='text-blue-500'> Quizzes</span>,Tests</h1>
          <p className='
            text-[14px] md:w-[23rem]  mt-[1.5rem]'>Easily launch live assignments, quizzes, and tests.Student results are automatically entered in the online gradebook</p>
        </motion.div>
      </div>

    </div>
  );
};

export default Features;
