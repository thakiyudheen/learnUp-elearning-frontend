import { useTheme } from '@/Components/ui/theme-provider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { getCourseByIdAction } from '@/redux/store/actions/course/getCourseByIdAction';
import React, { useEffect, useState, IframeHTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosShareAlt } from "react-icons/io";
import { RootState } from '@/redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'
import { createSessionAction } from '@/redux/store/actions/Payment/createSessionAction';
import { storeData } from '@/utils/localStorage';
import { getEnrollmentByIdAction } from '@/redux/store/actions/enrollment/getEnrollmentByIdAction';
import { createEnrollmentAction } from '@/redux/store/actions/enrollment/createEnrollment';
import { FaRupeeSign, FaLock, FaSync, FaUsers, FaBook, FaToolbox } from 'react-icons/fa';
import { createChatAction } from '@/redux/store/actions/chat/createChatAction';
import LoadingIndicator from '@/Components/common/skelton/loading';
import { getProgressByIdAction } from '@/redux/store/actions/enrollment/getProgressByIdAction';



const CourseCard: React.FC<IframeHTMLAttributes<HTMLIFrameElement>> = () => {
    const { data } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [course, setCourse] = useState<any>({})
    const { theme } = useTheme()
    const [isLoading , setLoading ]= useState<boolean>(false)
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
    const [isEnrolled , setEnrolled] = useState<boolean>(false)

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
        fetchEnrollment()
       
    }, [dispatch])
    useEffect(()=>{
        if(data?.data && course._id ){
            fetchEnrollment()
        }
    },[data,course])

    // checking is enrolled --------------------------
    const fetchEnrollment = async  () =>{
       
        console.log('the enrollment1')
        try{
            const response = await dispatch(getProgressByIdAction({userId:data?.data?._id,courseId:location.state}))
            console.log('the enrollment2',response.payload)
            if(response?.payload?.data){
                console.log('finally get that',response.payload.data)
                    setEnrolled(true)
              }
        }catch(error : any ){
            toast.error('error while fetching enrollment')
            throw new Error('error while fetching enrollment')
        }
    }

    // handleEnrollment --------------------------------
    const handleEnrollment = async () => {
        try {
            const enrollmentData = {
                userId : data?.data?._id ,
                instructorId : course.instructorRef._id ,
                courseId : course._id,
                amount : 0,
            }

           
            const response = await  dispatch(createEnrollmentAction(enrollmentData))
            if(response?.payload?.data){
                setEnrolled(true)
                createChat(data.data._id,course?.instructorRef)
                setEnrolled(true)
                setLoading(true)
                setTimeout(()=>{
                    setLoading(false)
                    toast.success('Enrolled successfully !')
                },3000)
                

            }

            

        }catch (error : any ) {
            toast.error('Error occured')
        }
    }

    // handle payment ----------------------------------

    const handlePayment = async () => {
        try {


            if (!data?.data) {
                toast.info("Please login !! ")
                navigate('/login')
                return;
            }
            setLoading(true)
            const stripe = await loadStripe(
                import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
            );

            const sessionData = {
                courseName: course?.courseTitle,
                courseThumbnail: course?.courseThumbnail,
                courseId: course?._id,
                amount: course?.priceAmount,
                userId: data?.data?._id,
            };

            const response = await dispatch(createSessionAction(sessionData))

            if (!response.payload && !response?.payload?.success) {
                toast.error('Payment error !!')
                throw new Error("Something went wrong, try again!");

            }
           
        
            console.log('its res from session',response.payload.data)
            // store local storage about session info--------
            storeData('payment_session', {...response.payload.data,instructorId:course?.instructorRef._id,amount:course.priceAmount})

            const sessionId = response.payload.data.sessionId;

            setLoading(false)
            const result = await stripe?.redirectToCheckout({ sessionId });
             
            if (result?.error) {

                throw new Error(result.error.message)
            }
        } catch (error: any) {
            toast.error(error.messsage)
        }
    }

    // crete chat -----------------
    const createChat =async (studentId:string,instructorId: string)=>{
        console.log('create chat is working');
        
        const response = await dispatch(createChatAction({
			participants:[studentId,instructorId]
		}))
		
		

    }



    return (
        <div className=" mx-auto font-Poppins   shadow-md">
           {isLoading && <LoadingIndicator/>}
            <div className="h-[26rem] flex bg-gradient-to-r from-gray-900 to-blue-800  bg-opacity-60 p-6 items-center relative "  >
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




            <div className="flex justify-between bg-gray-200 dark:bg-base-100">
                <div className="w-3/4 p-6 ">

                    <div className="flex items-center w-[86%] bg-white  dark:text-gray-400 mb-3 shadow-md dark:bg-gray-800 rounded-lg justify-between p-2  text-black">
                        <div className="flex items-center ">
                            <img
                                src={course?.instructorRef?.profile?.avatar} // Replace with the actual profile image URL
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4 flex flex-col">
                                <small className="text-lg font-bold">{course?.instructorRef?.firstName || 'Your Name'}</small>
                                <small className="text-sm">3 students</small>
                            </div>

                        </div>
                        <button className="flex items-center px-3 bg-gradient-to-r from-gray-600 to-gray-500 shadow-md py-1 bg-opacity-50 bg-gray-500 shadow-sm hover:bg-gray-700 text-white font-semibold rounded-full">

                            <IoIosShareAlt className='mr-2' /> Share
                        </button>


                    </div>
                    <hr className='w-[86%] bg-gray-700' />

                    <div className="mb-6 border bg-white shadow-lg rounded-lg border-gary-600 dark:bg-gray-800 p-7 mt-2 w-[86%]">
                        <h3 className="text-xl font-semibold text-[20px] mb-4">What you'll learn</h3>
                        <small className='text-sm w-[100%]'>{course.description}</small>
                    </div>



                    <div className="mb-6 p-7 w-[86%] dark:bg-gray-800  bg-white border rounded-lg border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-semibold text-[20px]">This course includes:</h3>
                        {course?.lessons?.map((item: any, index: number) => (
                            <div className="collapse collapse-arrow bg-gray-200 text-gray-800 mt-2" key={index}>
                                <input type="radio" name="course-accordion" />
                                <div className="collapse-title text-xl dark:text-white font-medium dark:bg-gray-700 bg-gray-300 shadow-xl">
                                    {item.title}
                                </div>
                                <div className="collapse-content dark:bg-gray-700">
                                    <ul className="list-disc list-inside text-black dark:text-gray-100">
                                        <li key={index} className="mt-1 mb-5">
                                            <small>{item.description}</small>
                                        </li>
                                        {data?.data?.role == 'admin' &&
                                            selectedLesson === item.id && (
                                                <>
                                                    <video controls className="w-[50%]" src={item.video} >
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




                    <div className="border dark:border-gray-800 dark:bg-gray-800 bg-white  rounded-lg p-4 md:p-10 lg:p-8 w-[86%]">
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




                <div className={` dark:bg-gray-800  bg-white p-3  shadow-xl rounded-lg  relative right-[5rem] h-[33rem] bottom-[12rem]`}>
                    <div className=" inset-0 flex items-center justify-center mt-0">
                        <iframe src={course.videoTrailer} frameBorder="0"></iframe>
                    </div>
                    <p className="text-[20px] font-bold text-black dark:text-gray-300 text-start mt-4">
                            {!isEnrolled?course.pricing == 'free' ? 'Free' : `₹ ${course.priceAmount}`:''}
                        </p>
                    
                             <div className='flex w-full justify-center flex-col '>
                                {isEnrolled?
                                
                            (<button disabled={true} className="border transition-all duration-300  hover:border-blue-700 hover:text-blue-600 text-white font-semibold px-4 py-2 mt-4 w-[100%] rounded hover:bg-white bg-blue-700">
                                already Enrolled
                            </button>): course.pricing=='free'?
                            (<button onClick={handleEnrollment} className="border transition-all duration-300  hover:border-blue-700 hover:text-blue-600 text-white font-semibold px-4 py-2 mt-4 w-[100%] rounded hover:bg-white bg-blue-700">
                                Enroll now
                            </button>):
                            (<button onClick={handlePayment} className="border transition-all duration-300  hover:border-blue-700 hover:text-blue-600 text-white font-semibold px-4 py-2 mt-4 w-[100%] rounded hover:bg-white bg-blue-700">
                                Buy Now
                            </button>)}
                                
                            <small className="mt-2 text-center">30-Day Money-Back Guarantee</small>
    
                            </div>
                            <div className="z-10 text-center">
      {/* <h1 className='text-center font-bold text-[17px] mt-4 mb-4'>
        Subscribe to LearnUp's top courses
      </h1> */}
      <ul className='text-start mt-2 p-3 bg-gray-300 dark:text-gray-200 text-gray-700 border space-y-2 dark:bg-gray-700 rounded-md'>
        <li>
          <small><FaRupeeSign className='inline mr-2' /> Monthly fee required</small>
        </li>
        <li>
          <small><FaLock className='inline mr-2' /> Exclusive content access</small>
        </li>
        <li>
          <small><FaSync className='inline mr-2' /> Auto-renewal option</small>
        </li>
        <li>
          <small><FaUsers className='inline mr-2' /> For teams of 2 or more users</small>
        </li>
        <li>
          <small><FaBook className='inline mr-2' /> 26,000+ fresh & in-demand courses</small>
        </li>
        <li>
          <small><FaToolbox className='inline mr-2' /> Learning Engagement tools</small>
        </li>
      </ul>
    </div>

                       


                        



                    {/* <div className=" z-10 text-center ">
                        <h1 className='text-center font-bold  text-[17px] mt-4 mb-4'>Subscribe to LearnUp's top courses</h1>
                        <ul className='text-start mt-2 p-3 bg-gray-300 border  dark:bg-gray-700 rounded-md'>
                            <li><small><FaRupeeSign className='inline mr-2' /> Monthly fee required</small></li>
                            <li><small><FaLock className='inline mr-2' /> Exclusive content access</small></li>
                            <li><small><FaSync className='inline mr-2' /> Auto-renewal option</small></li>
                        </ul>

                        
                    </div> */}
                </div>

            </div>

        </div>
    );
};

export default CourseCard;