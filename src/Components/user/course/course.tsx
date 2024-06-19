import { useTheme } from '@/Components/ui/theme-provider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { getCourseByIdAction } from '@/redux/store/actions/course/getCourseByIdAction';
import React, { useEffect, useState, IframeHTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosShareAlt } from "react-icons/io";
import { FaRupeeSign, FaLock, FaSync } from 'react-icons/fa';
import { RootState } from '@/redux/store';


const CourseCard: React.FC<IframeHTMLAttributes<HTMLIFrameElement>> = () => {
    const { data } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [course, setCourse] = useState<any>({})
    const { theme } = useTheme()
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

    const handleVideoClick = (lessonId: string) => {
      setSelectedLesson(lessonId === selectedLesson ? null : lessonId);
    };



    useEffect(() => {
        const getData = async () => {
            const response = await dispatch(getCourseByIdAction(location.state))
            console.log('this is coursedatas', response.payload)
            if (response.payload) {
                setCourse(response.payload)
                console.log(course)

            }
        }
        getData()
    }, [dispatch])


    return (
        <div className=" mx-auto font-Poppins   shadow-md">

            <div className="h-[26rem] flex bg-gradient-to-r from-gray-800 to-gray-700  bg-opacity-40 p-6 items-center relative">
                <div className="text-left w-3/4 z-10 p-10">
                    <h2 className="text-[2rem] font-bold text-white">{course?.courseTitle}</h2>
                    <h4 className="text-lg w-3/4 text-gray-300 mt-2">{course?.subTitle}</h4>
                    <div className="mt-4 text-gray-300">
                        <span>{"rating"} ⭐⭐⭐⭐⭐</span> ({5} ratings) {'10000'} students
                    </div>
                    <p className="mt-2 text-gray-300">Created by {course?.instructorRef?.firstName}</p>
                    <p className="mt-1 text-gray-300">Last updated {course?.updatedAt} | {course.language}</p>
                </div>
            </div>




            <div className="flex justify-between ">
                <div className="w-3/4 p-6 ">

                    <div className="flex items-center w-[86%] dark:text-gray-400 mb-3 shadow-md dark:bg-gray-800 rounded-t-lg justify-between p-2  text-black">
                        <div className="flex items-center ">
                            <img
                                src={course?.instructorRef?.profile?.avatar} // Replace with the actual profile image URL
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-bold">{course?.instructorRef?.firstName || 'Your Name'}</h2>
                                <p className="text-sm">3 students</p>
                            </div>
                           
                        </div>
                        <button className="flex items-center px-4 py-2 bg-opacity-50 bg-gray-500 shadow-sm hover:bg-gray-700 text-white font-semibold rounded-full">

                        <IoIosShareAlt className='mr-2' /> Share
                            </button>


                    </div>
                    <hr className='w-[86%]' />

                    <div className="mb-6 border bg-white border-gary-600 dark:bg-gray-800 p-7 mt-4 w-[86%]">
                        <h3 className="text-xl font-semibold text-[20px] mb-4">What you'll learn</h3>
                        <p className='text-sm w-[100%]'>{course.description}</p>
                    </div>

        

    <div className="mb-6 p-7 w-[86%] dark:bg-gray-800 bg-white border border-gray-300">
      <h3 className="text-xl font-semibold text-[20px]">This course includes:</h3>
      {course?.lessons?.map((item: any, index: number) => (
        <div className="collapse collapse-arrow bg-white text-gray-700 mt-2" key={index}>
          <input type="radio" name="course-accordion" />
          <div className="collapse-title text-xl dark:text-white font-medium dark:bg-gray-700 bg-gray-100 shadow-sm">
            {item.title}
          </div>
          <div className="collapse-content dark:bg-gray-700">
            <ul className="list-disc list-inside text-black dark:text-gray-100">
              <li key={index} className="mt-1 mb-5">
                <small>{item.description}</small>
              </li>
              {data.data.role=='admin'&&
                selectedLesson === item.id && (
                    <>                  
                    <video controls className="w-[50%]" src={item.video} type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                   
                 </>
                 

                )}
             <li className='mt-5'>
                 <button className="text-blue-500 hover:text-blue-700" onClick={() => handleVideoClick(item.id)}>
                   <small>{selectedLesson === item.id ? 'Hide Video' : 'Show Video'}</small>
                 </button>
               </li>
             
              
            </ul>
          </div>
        </div>
      ))}
    </div>
  



                    <div className="border border-gray-300 p-4 md:p-10 lg:p-8 w-[86%]">
                        <h2 className="text-lg  md:text-xl lg:text-2xl font-bold mb-2">
                            Top companies offer this course to their employees
                        </h2>
                        <small className="text-sm md:text-base lg:text-lg mb-4">
                            This course was selected for our collection of top-rated courses trusted by businesses worldwide.
                            <a href="#" className="text-blue-600 ml-1">Learn more</a>
                        </small>
                        <div className="flex mt-5 flex-wrap justify-center items-center space-x-4 space-y-4 md:space-y-0">
                            <img src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg" alt="Nasdaq" className="h-8 md:h-8 ml-3 lg:h-16 w-[7rem]" />
                            <img src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg" alt="NetApp" className="h-8 md:h-8 lg:h ml-3 w-[7rem]" />
                            <img src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg" alt="Eventbrite" className="h-8 md:h-8 ml-3 w-[7rem] lg:h-16" />
                        </div>
                    </div>
                </div>




                <div className={` dark:bg-gray-800  bg-white p-3  shadow-lg rounded-lg relative right-[5rem] h-[32rem] bottom-[12rem]`}>
                    <div className=" inset-0 flex items-center justify-center mt-0">
                        <iframe src={course.videoTrailer} frameBorder="0"></iframe>
                    </div>



                    <div className=" z-10 text-center ">
                        <h1 className='text-center font-bold text-[17px] mt-4'>Subscribe to LearnUp's top courses</h1>
                        <ul className='text-start mt-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-md'>
                            <li><small><FaRupeeSign className='inline mr-2' /> Monthly fee required</small></li>
                            <li><small><FaLock className='inline mr-2' /> Exclusive content access</small></li>
                            <li><small><FaSync className='inline mr-2' /> Auto-renewal option</small></li>
                        </ul>

                        <p className="text-[20px] font-bold text-black dark:text-gray-300 text-left mt-4">
                            {course.pricing == 'free' ? 'Free !!' : `₹ ${course.priceAmount}`}
                        </p>
                        <div className='flex w-full justify-center flex-col '>
                            <button className="border transition-all duration-300  hover:border-blue-700 hover:text-blue-600 text-white font-semibold px-4 py-2 mt-4 w-[100%] rounded hover:bg-gray-200 bg-blue-700">
                                Buy this course
                            </button>
                            <button className="border transition-all duration-300  border-blue-700 text-blue-700 hover:text-white font-semibold px-4 py-2 mt-2 w-[100%] rounded hover:bg-blue-700">
                                Add to Cart
                            </button>

                        </div>


                        <small className="mt-4 text-center">30-Day Money-Back Guarantee</small>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default CourseCard;