import React from 'react';
import { motion } from 'framer-motion';
import AboutImg from '../../assets/aboutUs/aboutUs.svg';
import Navbar from '@/Components/common/user/navbar/Navbar';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-base-100 min-h-screen py-16 px-4 md:text-left text-center sm:px-6 lg:px-8 font-Poppins">
        <motion.div
          className="md:w-1/2 flex flex-col items-start  mt-[3vh]  md:mr-8 md:text-left text-center"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={fadeUpVariants}
        >
          <h2 className="text-base font-semibold md:text-left text-center tracking-wider text-blue-700 uppercase ">About Us</h2>
          <h1 className="mt-2 text-3xl  text-gray-500 sm:text-4xl lg:text-5xl">
            Helping businesses deliver <span className="text-blue-500">exceptional</span> buyer experiences.
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:bg-gary-300">
            Vidyard is the leading video messaging and asynchronous communications platform for go-to-market teams.
            Millions of sales professionals and more than 250,000 go-to-market teams use Vidyard’s AI-powered video
            messaging, video hosting, and digital sales rooms to connect with more prospects and generate more revenue.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700"
            >
              Sign Up for Free
            </a>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 relative "
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.5 }}
          variants={fadeUpVariants}
        >
          <motion.div
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-700 to-blue-200 rounded-full shadow-lg"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
            variants={bubbleVariants}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-r from-blue-700 to-blue-200 rounded-full"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
            variants={bubbleVariants}
          />
          <img
            className="w-full max-w-lg mx-auto relative z-10"
            src={AboutImg}
            alt="Vidyard Illustration"
          />
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;
