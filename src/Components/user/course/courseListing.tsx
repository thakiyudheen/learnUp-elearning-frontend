

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Home from '../../../assets/homebanner/home.png'
import Navbar from '@/Components/common/user/navbar/Navbar';
import CourseCards from './courseCard';
import { useTheme } from '@/Components/ui/theme-provider';
import { useAppDispatch } from '@/hooks/hooke';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { resetPasswordAction } from '@/redux/store/actions/auth/resetPasswordAction';

const PromoSection: React.FC = () => {
  const [selectedLevels, setSelectedLevels] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const {theme}=useTheme()
  const dispatch = useAppDispatch()
  const [categories , setCategory] = useState<any>([])



  useEffect(()=>{
    const getCategory =async () =>{
      const response= await dispatch(getAllCategoryAction())
      if(response.payload.success){
        setCategory(response.payload.data)
        console.log('this is the main thing',response.payload)
      }
    }
    getCategory()
  },[dispatch])

  return (
    <>
      <Navbar />
      <div className={`py-10 ${theme == 'light' && 'bg-gradient-to-t from-white to-gray-200'}`}>
        <div className="container mx-auto flex  flex-col md:flex-row items-center mt-[4rem]">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-2/4 md:pr-7 mb-10 md:mb-0 md:ml-[3rem]"
          >
            <div className="dark:bg-gray-800 p-4  ">
              <h6 className="text-[35px] font-bold mb-3 text-black ">Unlock Your Potential with <span className='text-blue-600'>Courses</span>  </h6>
              <small className="text-sm mb-3 ">Discover a wide range of courses tailored to your learning journey. Whether you're a beginner or an expert, our courses are designed to help you succeed. Enroll now and take 
                advantage of our special sale ending on June 13. Start learning for just ₹449!</small>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-[30%] md:left-[59rem]  bg-gradient-to-r  md:mt-[6.5rem] from-blue-100 to-blue-500 h-[20rem] absolute md:top-0 top-[16rem] md:block rounded-tl-[20rem] rounded-bl-[5rem]"
          >
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:w-2/4 flex z-10 h-[20rem] mr-[3rem]  ml-[4rem] md:justify-end"
          >
            <img
              src={Home}
              alt="Promo"
              className="rounded-lg"
            />
          </motion.div>
        </div>
        <div className="container text-center mx-auto mt-10 ">
          <h3 className="text-[22px] font-bold text-center text-blue-900">All the skills you need in one <span className='text-blue-600'>place</span> </h3>
          <small className="text-center text-lg mt-2">
            From critical skills to technical topics, Udemy supports your professional development.
          </small>
        </div>
      </div>
      <CourseCards />
    </>
  );
};

export default PromoSection;


