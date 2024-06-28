import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { getCourseByIdAction } from '@/redux/store/actions/course/getCourseByIdAction';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getProgressByIdAction } from '@/redux/store/actions/enrollment/getProgressByIdAction';
import { RootState } from '@/redux/store';
import { updateProgressAction } from '@/redux/store/actions/enrollment/updateProgressAction';
import { getReviewAction } from '@/redux/store/actions/review/getReviewsAction';
import { createReviewAction } from '@/redux/store/actions/review/createReviewAction';
import { ToastContainer, toast } from 'react-toastify';
import LoadingIndicator from '@/Components/common/skelton/loading';

const VideoLayout: React.FC = () => {
    const { data, error } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [course, setCourse] = useState<any>(null);
    const [currentVideo, setCurrentVideo] = useState<string>("");
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [description, setCurrentDescription] = useState<string>("")
    const [showMore, setShowMore] = useState(false);
    const [progress, setProgress] = useState<{ [key: number]: number }>({});
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [comments,setComments]=useState<any>([])
    const descriptionLimit = 100;
    const [comment ,setComment]= useState<string>("")
    const[input,setInput] =useState<string>("")
    const [isLoading, setLoading]= useState<boolean>(false)
    const [visibleComments, setVisibleComments] = useState<any>([]);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleLessonClick = (videoUrl: string, title: string, index: number, description: string) => {
        setCurrentVideo(videoUrl);
        setCurrentTitle(title);
        setActiveIndex(index);
        setCurrentDescription(description);
    };

    useEffect(() => {
        const getData = async () => {
            const response = await dispatch(getCourseByIdAction(location.state));

            console.log('the course new', response.payload);
            if (response.payload) {
                setCourse(response.payload);
                setCurrentVideo(response.payload?.videoTrailer);
                setCurrentTitle(response.payload?.courseTitle);
                setCurrentDescription(response.payload?.description);
                const response1 = await dispatch(getProgressByIdAction({ userId: data?.data?._id, courseId: location.state }))
                if (response1?.payload?.success) {
                    console.log('progress is working');

                    setCompletedLessons(response1.payload.data.progress.completedLessons)
                    console.log('completed lesson',completedLessons)
                }
            }
        };
        getData();
    }, [dispatch, location.state]);

    useEffect(()=>{
        const getData =async  () =>{
            const response=await dispatch(getReviewAction({courseId:location.state}))
            console.log('the getting ',response.payload)
            if(response.payload&&response.payload.success){
                setComments(response.payload.data.reviews.reverse())
                // setVisibleComments(response.payload.data.reviews.slice(0, 5))
            }
        }
        getData()
    },[dispatch])
    const [showAll, setShowAll] = useState(false);
    
    // console.log('the visible',visibleComments)

    const handleShowMore1 = () => {
        setShowAll(true);
    };

    const handleShowLess1 = () => {
        setShowAll(false);
    };

    

    const handlePost = async () => {
        const trimmedInput = input.trim(); 
        console.log('this is comment', trimmedInput);
    
        if (trimmedInput !== "") { 
            setLoading(true)
            setComment(trimmedInput); 
            setInput(""); 
    
            const review = {
                courseId: location.state,
                userId: data.data._id,
                comment: trimmedInput,
                rating: 5
            };
    
            const response = await dispatch(createReviewAction(review));
            if (response.payload && response.payload.success) {
                console.log('iam ok',response.payload)
                setComment(""); 
                setComments([...comments,{
                    courseId: location.state,
                    userId: data.data,
                    comment: trimmedInput,
                    rating: 5
                }].reverse());
                setLoading(false)
                 
            } else {
                toast.info('Please enter a comment !!');
            }
        } else {
            toast.info('Please enter a comment !!');
        }
    };
   

    const handleProgress = async (state: { played: number }) => {
        if (activeIndex !== null) {
            
            const lessonId = course?.lessons[activeIndex]._id;
            setProgress((prevProgress) => ({
                ...prevProgress,
                [activeIndex]: state.played,
            }));
            console.log('this is progress ', state.played, lessonId)
            if (state.played >= 0.8 && !completedLessons.includes(lessonId)) {
                setCompletedLessons([...completedLessons, lessonId])
                await dispatch(updateProgressAction({ userId: data.data._id, courseId: course._id, progress: [...completedLessons, lessonId] }))
                console.log("Lesson completed 80%:", lessonId); // Log the lesson ID
            }
        }
    };



    const playerWrapperStyle = {
        borderRadius: '10px',
        overflow: 'hidden',
    };

    console.log('new data fetched', course?.videoTrailer);
    
    return (
        <div className="flex flex-col lg:flex-row w-full p-3 ">
            {isLoading&&<LoadingIndicator/>}
            <div className="md:w-[70%] mt-[3rem]  w-full p-6">
                <div style={playerWrapperStyle} className='h-64 lg:h-[45%]'>
                    <ReactPlayer
                        url={currentVideo}
                        controls
                        width="100%"
                        height="100%"
                        onProgress={handleProgress}
                    />
                </div>
                <div className="mt-4 text-lg font-bold flex justify-between">
                    <h1>{currentTitle}</h1>
                    {(completedLessons.length === course?.lessons?.length || (activeIndex !== null && course?.lessons && course.lessons[activeIndex] && completedLessons.includes(course.lessons[activeIndex]._id))) ? (
                        <small className='flex pl-2 items-center font-semibold text-green-600'>
                            Completed <IoMdCheckmarkCircleOutline className='ml-1' />
                        </small>
                    ) : null}
                </div>
                <div className="flex items-center w-full mt-5 bg-gray-300 dark:text-gray-400 mb-3  dark:bg-gray-800 rounded-lg justify-between p-2 text-black">
                    <div className="flex items-center">
                        <img
                            src={course?.instructorRef?.profile?.avatar}
                            alt="Profile"
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="ml-4 flex flex-col">
                            <small className="text-lg font-semibold">{course?.instructorRef?.firstName || 'Your Name'}</small>
                            <small className="text-sm">3 students</small>
                        </div>
                    </div>
                </div>
                <hr className='bg-black dark:bg-black' />
                <div className='mt-3 bg-gray-300 dark:bg-gray-800 p-4 rounded-lg'>
                    <p className='text-black dark:text-gray-400 font-bold'>Description</p>
                    <small className='dark:text-gray-400'>
                        {showMore ? description : `${description.substring(0, descriptionLimit)}...`}
                        {description.length > descriptionLimit && (
                            <button onClick={handleShowMore} className="text-blue-500 ml-2">
                                {showMore ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </small>
                </div>
                <div className="mt-4 p-4 rounded-lg dark:bg-gray-800 bg-gray-300">
                    <h2 className="text-xl font-bold">Comments</h2>
                    <div className="mt-2 flex items-center">
                        <img
                            src={data?.data?.profile?.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-gray-300 dark:bg-gray-800 focus:outline-none p-2 border-b border-gray-800 dark:border-gray-600"
                        />
                        <a className='py-1 px-5 rounded-lg dark:bg-gray-600 bg-gray-400 font-semibold ml-3' onClick={handlePost}> Post </a>
                    </div>
                    {/* <div className="mt-4 space-y-4">
                        { comments.map((comment:any , index:any) => (
                            <div key={index} className="flex items-start space-x-4 m-3">
                                <img
                                    src={comment?.userId?.profile?.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className=''>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 text-[14px]">{comment?.userId?.firstName}</div>
                                    <small className="text-gray-600 dark:text-gray-400">{comment?.comment}</small>
                                </div>
                            </div>
                        ))}
                    </div> */}
            <div className="mt-4 space-y-4 overflow-y-scroll max-h-96 " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {(showAll ? comments : comments?.slice(0,5))?.map((comment:any, index:any ) => (
                <div key={index} className="flex items-start space-x-4 m-5">
                    <img
                        src={comment?.userId?.profile?.avatar}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300 text-[14px]">
                            {comment?.userId?.firstName}
                        </div>
                        <small className="text-gray-600 dark:text-gray-400">
                            {comment?.comment}
                        </small>
                    </div>
                </div>
            ))}
            {comments?.length > 7 && (
                <div className="flex justify-center mt-4">
                    {!showAll ? (
                        <button
                            onClick={handleShowMore1}
                            className="text-blue-600"
                        >
                            <small>{'Show More...'}</small>
                        </button>
                    ) : (
                        <button
                            onClick={handleShowLess1}
                            className="text-blue-600"
                        >
                            <small>{'Show Less...'}</small>
                        </button>
                    )}
                </div>
            )}
        </div>
                </div>
            </div>
            <div className=" w-full p-4 min-h-screen overflow-y-auto md:w-[30%] rounded-lg dark:bg-gray-800 bg-gray-300 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Course Playlists</h2>
                <ul>
                    {course?.lessons?.map((lesson: any, index: any) => (
                        <li key={index} className="mb-4">
                            <div
                                className={`p-2 cursor-pointer flex items-center space-x-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md ${activeIndex === index ? 'border-2 border-blue-500' : ''}`}
                                onClick={() => handleLessonClick(lesson.video, lesson.title, index, lesson.description)}
                            >
                                <img src={course?.courseThumbnail} alt="not available" className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <div className="text-lg font-semibold">{lesson.title}</div>
                                    <small className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{lesson.description}</small>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoLayout;
