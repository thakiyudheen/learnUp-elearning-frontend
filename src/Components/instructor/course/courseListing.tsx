// import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
// import React, { useEffect, useState } from 'react';
// import LoadingIndicator from '../../../Components/common/skelton/loading';
// import { updateCourseAction } from '@/redux/store/actions/course/updateCourseAction';
// import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
// import { PaginationControls } from '@/Components/common/skelton';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '@/redux/store';

// interface Data {
//   _id: string;
//   isBlocked?: boolean;
//   isPublished?: boolean;
//   isReject?: boolean;
// }



// const CourseListing: React.FC = () => {

//   const { data } = useAppSelector((state: RootState) => state.user)
//   const dispatch = useAppDispatch();
//   const [courses, setCourses] = useState<any[]>([]);
//   const [requests, setRequests] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<'requests' | 'courses'>('requests');
//   const [isLoading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate()

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       console.log('ivedeint ', data.data)
//       const response = await dispatch(getAllCourseAction({instructorRef:data.data._id}));
//       console.log('data',response.payload)
//       const allCourses = response.payload;
//       setCourses(allCourses);
      
//       setLoading(false);
//     };
//     getData();
//   }, [dispatch]);

//   const handleUpdate = async (updateData: Data) => {
//     const response = await dispatch(updateCourseAction(updateData));
    
//     if (updateCourseAction.fulfilled.match(response)) {
//       setCourses((prevCourses) =>
//         prevCourses.map((course) =>
//           course._id === updateData._id ? { ...course, ...updateData } : course
//         )
//       );

//     }
//   };

  
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage] = useState<number>(7);
//   const getPaginatedData = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return courses.slice(startIndex, endIndex);
//   };

//   const totalPages = Math.ceil(requests.length / itemsPerPage);
//   return (
//     <>
//       <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between">
//         <h1 className="text-xl font-bold">Course Management</h1>
//         <button onClick={() => navigate('/instructor/add-courses')} className="border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600 px-4 rounded-lg">
//           Add course
//         </button>
//       </div>
      
//       <div className="flex w-[100%] justify-center h-[570px]">
//         {isLoading && <LoadingIndicator />}
//         <div className="overflow-hidden w-[90%]">
//             <table className="w-full rounded-lg">
//               <thead>
//                 <tr className="bg-gray-700 text-white text-center">
//                   <th className="px-4 py-2">No</th>
//                   <th className="px-4 py-2">Title</th>
//                   <th className="px-4 py-2">Instructor Name</th>
//                   <th className="px-4 py-2">Category</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">View</th>
//                   <th className="px-4 py-2">Block/Unblock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {getPaginatedData().map((course: any, index: number) => (
//                   <tr key={index} className="text-center border-b">
//                     <td className="px-4 py-2 border">{index + 1}</td>
//                     <td className="px-4 py-2 border">{course?.courseTitle}</td>
//                     <td className="px-4 py-2 border">{course?.instructorRef?.firstName}</td>
//                     <td className="px-4 py-2 border">{course?.category.categoryName}</td>
//                     <td className="px-4 py-2 border">
//                       {course.pricing === 'free' ? '0' : course?.priceAmount}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <button
//                         onClick={()=>navigate(`/admin/view-course/`,{state : course?._id})}
//                         className="border font-bold py-1 px-2 rounded-lg hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
//                       >
//                         View
//                       </button>
//                       <button onClick={()=> navigate('/instructor/update-course',{state : course?._id})} >edit</button>
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {<p className={`${course.isBlocked?'text-[red]':'text-[green]'}`}>{course?.isBlocked?'Blocked':'Active'}</p>}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//           <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseListing;

import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import React, { useEffect, useState } from 'react';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { IoFilter } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { CiMenuKebab } from "react-icons/ci";
import { updateCourseAction } from '@/redux/store/actions/course/updateCourseAction';
import { RootState } from '@/redux/store';
import { PaginationControls } from '@/Components/common/skelton';
import { ToastContainer, toast } from 'react-toastify';

interface Data {
  _id: string;
  isBlocked?: boolean;
  isPublished?: boolean;
  isReject?: boolean;
}


const CourseListing: React.FC = () => {
  const { data } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [category, setCategory] = useState<any>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const navigate = useNavigate(); 
  
  // pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);

   
  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(getAllCourseAction({instructorRef:data.data._id}));
      const response1 = await dispatch(getAllCategoryAction());

      if (response.payload) {
        setCourses(response.payload);
        setCategory(response1.payload.data);
        console.log('Data fetched', response.payload);
      }
    };
    getData();
  }, [dispatch]);

  const handleUpdate = async (updateData: Data) => {
    const response = await dispatch(updateCourseAction(updateData));
    
    if (updateCourseAction.fulfilled.match(response)) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updateData._id ? { ...course, ...updateData } : course
        )
      );

    }
  };


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter(id => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prevLevels =>
      prevLevels.includes(level)
        ? prevLevels.filter(lvl => lvl !== level)
        : [...prevLevels, level]
    );
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const sortCourses = (courses: any[], order: 'asc' | 'desc') => {
    return courses.sort((a, b) => {
      const priceA = a.priceAmount || 0;
      const priceB = b.priceAmount || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };

  const filterCourses = (courses: any[]) => {
    return courses.filter(course =>
      (!selectedCategories.length || selectedCategories.includes(course?.category?._id)) &&
      (!selectedLevels.length || selectedLevels.includes(course?.level)));
  };
   
  
 
  

  const filteredAndSortedCourses = sortCourses(filterCourses(courses), sortOrder);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return  filteredAndSortedCourses.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil( filteredAndSortedCourses.length / itemsPerPage);


  return ( 
    <div className='min-h-screen'>
      <div className='w-full flex justify-end mt-6'>
        <button onClick={() => navigate('/instructor/add-courses')} className="border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600 px-4 rounded-lg">
          Add course
        </button>
      </div>
      <div className='flex justify-between mt-4 '>
        <input type="text" className='dark:bg-gray-700 py-1 ml-[12rem] bg-gray-200 px-6 rounded-lg shadow-lg' placeholder='search...' />
        <div className="dropdown dropdown-bottom dropdown-end mr-[15rem]">
          <div tabIndex={0} role="button" className="m-1 flex items-center">
            <IoFilter className='text-[19px]'/> &nbsp; <small>filter</small>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52">
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Category</summary>
                <ul className="menu p-2 bg-white dark:bg-gray-800 rounded-box">
                  {category.map((category: any, index: any) => (
                    <li key={index}>
                      <div className="form-control">
                        <label htmlFor={`category${index}`} className="label cursor-pointer">
                          <input
                            type="checkbox"
                            id={`category${index}`}
                            checked={selectedCategories.includes(category?._id)}
                            onChange={() => handleCategoryChange(category?._id)}
                            className="checkbox checkbox-sm checkbox-primary"
                          />
                          <span className="label-text text-[12px] ml-1">{category.categoryName}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Level</summary>
                <ul className="menu p-2 bg-white dark:bg-gray-800 rounded-box">
                  <li>
                    <div className="form-control">
                      <label htmlFor="level1" className="label cursor-pointer">
                        <input
                          type="checkbox"
                          id="level1"
                          checked={selectedLevels.includes('Beginner')}
                          onChange={() => handleLevelChange('Beginner')}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="label-text ml-1">Beginner</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-control">
                      <label htmlFor="level2" className="label cursor-pointer">
                        <input
                          type="checkbox"
                          id="level2"
                          checked={selectedLevels.includes('Medium')}
                          onChange={() => handleLevelChange('Medium')}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="label-text ml-1">Medium</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-control">
                      <label htmlFor="level3" className="label cursor-pointer">
                        <input
                          type="checkbox"
                          id="level3"
                          checked={selectedLevels.includes('Intermediate')}
                          onChange={() => handleLevelChange('Intermediate')}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="label-text ml-1">Intermediate</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Price</summary>
                <ul className="menu p-2 bg-white dark:bg-gray-800 rounded-box">
                  <li>
                    <div className="form-control">
                      <label htmlFor="priceLowToHigh" className="label cursor-pointer">
                        <input
                          type="radio"
                          id="priceLowToHigh"
                          name="price"
                          onClick={() => handleSortOrderChange('asc')}
                          className=""
                        />
                        <small><span className=" ml-1">Price Low to High</span></small>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="">
                      <label htmlFor="priceHighToLow" className="label cursor-pointer">
                        <input
                          type="radio"
                          id="priceHighToLow"
                          name="price"
                          onClick={() => handleSortOrderChange('desc')}
                        />
                        <small><span className="ml-1">Price High to Low</span></small>
                      </label>
                    </div>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="container  p-2 flex justify-center mt-7 ">

        <div className="grid grid-cols-1 w-3/4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {getPaginatedData().map((course: any, index: any) => {
            return (
              <div
                key={index}
                // onClick={() => navigate('/course', { state: course?._id })}
                className="card w-70  shadow-lg dark:bg-gray-800"
              >
                <figure><img className="w-full h-30 object-cover" src={course.courseThumbnail} alt={course.courseTitle} /></figure>
                <div className="badge badge-primary ml-3 mt-2">{course?.category?.categoryName}</div>
                <div className="card-body w-full ">
                  <p className=" font-bold">
                    {course.courseTitle}
                    
                  </p>
                  <small className="overflow-ellipsis overflow-hidden  h-10">{course.description}</small>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="md:relative bottom-3 w-full flex  w-full justify-end"><CiMenuKebab /></div>
                    <ul tabIndex={0} className="dropdown-content z-[10] absolute menu p-2 shadow-lg bg-gray-100 dark:bg-gray-700  rounded-box w-52">
                      <li  onClick={() => navigate('/course',{state : course?._id})} ><a> view </a></li>
                      <li onClick={()=>handleUpdate({_id:course._id, isBlocked :!course.isBlocked})}><a>{course.isBlocked?'unblock':'block'}</a></li>
                      <li  onClick={()=> course.isPublished?
                        
                          toast.info("You don't have the right to edit after published!!"):
                      navigate('/instructor/update-course',{state : course?._id})}><a>Edit</a></li>
                    </ul>
                  </div>
                 
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
      <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default CourseListing;

