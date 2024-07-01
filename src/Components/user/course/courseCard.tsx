import { useAppDispatch } from '@/hooks/hooke';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import React, { useEffect, useState } from 'react';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { IoFilter } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { PaginationControls } from '@/Components/common/skelton';
import { FaClock, FaTag, FaLevelUpAlt } from 'react-icons/fa';
import { IoLanguageSharp } from "react-icons/io5";

const CourseCards: React.FC = () => {
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
  const [itemsPerPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(1);


  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(getAllCourseAction({ isPublished: true, page: currentPage, limit: itemsPerPage, isBlocked:false }));
      const response1 = await dispatch(getAllCategoryAction({}));

      if (response.payload) {
        setCourses(response.payload.courses);
        setCategory(response1.payload.data);
        setTotalPages(Math.ceil(response.payload.totalItems/itemsPerPage))
        console.log('Data fetched', response.payload);
      }
    };
    getData();
  }, [dispatch, currentPage]);

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


  return (
    <>

      <div className='flex justify-between '>
        <input type="text" className='bg-gray-300 w-1/4 dark:bg-gray-700 py-1 ml-[12rem] px-6 rounded-full shadow-md' placeholder='search...' />
        <div className='mr-[9rem]'>
          <details className="dropdown dropdown-right ">
            <summary className="px-6 py-1 text-white  bg-blue-600 rounded-md font-semibold flex items-center"><small>Category</small></summary>
            <ul className="menu p-2 bg-white dark:bg-gray-700 rounded-box absolute">
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
                      <span className="label-text text-[12px] ml-1 text-black dark:text-gray-500 font-semibold">{category.categoryName}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </details>
          {/* level  0----------------- */}
          <details className="dropdown dropdown-right ml-3">
            <summary className="px-6 py-1 text-white  bg-blue-600 rounded-md font-semibold flex items-center"><small>Level</small></summary>
            <ul className="menu p-2 bg-white dark:bg-gray-700  absolute rounded-box">
              <li>
                <div className="form-control">
                  <label htmlFor="level1" className="label cursor-pointer ">
                    <input
                      type="checkbox"
                      id="level1"
                      checked={selectedLevels.includes('Beginner')}
                      onChange={() => handleLevelChange('Beginner')}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="label-text ml-1 text-black dark:text-gray-500 font-semibold">Beginner</span>
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
                    <span className="label-text ml-1 text-black dark:text-gray-500 font-semibold">Medium</span>
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
                    <span className="label-text ml-1 text-black dark:text-gray-500 font-semibold">Intermediate</span>
                  </label>
                </div>
              </li>
              {/* Add more levels as needed */}
            </ul>
          </details>
          {/* the filter ---------------- */}
          <details className="dropdown ">
            <summary className="px-6 py-1 mb-0   rounded-lg  flex items-center font-semibold"><small><div tabIndex={0} role="button" className="mt-2 flex items-center">
              <IoFilter className='text-[20px]' /><small>Filter</small>
            </div></small></summary>
            <ul className="menu p-2 bg-white dark:bg-gray-700 rounded w-[10rem] absolute">
              <li>

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
        </div>
      </div>
      <hr className='text-center w-[80%] ml-[10%] mt-5' />
      <div className="container mx-auto p-4 flex justify-center min-h-screen">
        <div className="grid grid-cols-1 w-3/4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredAndSortedCourses.map((course: any, index: any) => {
            return (
              // <div
              //   key={index}
              //   onClick={() => navigate('/course', { state: course?._id })}
              //   className="min-w-md dark:bg-gray-800 bg-white rounded-lg overflow-hidden shadow-lg m-4 md:h-[26rem] border dark:border-gray-800"
              // >
              //   <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt={course.courseTitle} />
              //   <div className="px-6 py-4">
              //     <div className="flex items-center justify-between">
              //       {/* <small><span className="bg-blue-500  text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{course?.category?.categoryName}</span></small> */}
              //       <span className="text-gray-500 text-xs"></span>
              //     </div>
              //     <div className='flex flex-col justify-between flex-grow'>

              //     <div className="font-bold text-xl mt-2 mb-2">{course.courseTitle}</div>
              //     <small className="text-gray-700 text-base dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</small>
              //     <div className="flex items-center justify-between mt-4">
              //       <div className='flex items-center'>
              //         <img className="w-8 h-8 rounded-full mr-2" src={course.instructorRef.profile.avatar} alt="Instructor" />
              //         <small className="text-gray-500 text-sm">{course?.instructorRef?.firstName} </small>
              //       </div>
              //       <div className='flex '>

              //         <div className="flex items-center ">
              //           <span className="text-blue-500 text-lg font-bold">₹ {course?.priceAmount}</span>
              //         </div>
              //       </div>
              //     </div>
              //     </div>
              //   </div>
              // </div>
              <div
                key={index}
                onClick={() => navigate('/course', { state: course?._id })}
                className="min-w-md dark:bg-gray-800 bg-white rounded-lg overflow-hidden shadow-lg m-4 md:h-[26rem] border dark:border-gray-800 cursor-pointer"
              >
                <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt={course.courseTitle} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mt-2 mb-2 min-h-[3rem]">{course.courseTitle}</div>
                  <div className="flex flex-col justify-between flex-grow space-y-2">
                    <div className="flex items-center text-[16px] font-semibold">
                      <FaTag className="text-gray-500 mr-2" />
                      <small className="text-gray-700 text-base dark:text-gray-500">{course?.category?.categoryName}</small>
                    </div>
                    <div className="flex items-center text-[16px] font-semibold">
                      <IoLanguageSharp className="text-gray-500 mr-2" />

                      <small className="text-gray-700 text-base dark:text-gray-500">{course?.language}</small>
                    </div>
                    <div className="flex items-center text-[16px] font-semibold">
                      <FaLevelUpAlt className="text-gray-500 mr-2" />
                      <small className="text-gray-700 text-base  dark:text-gray-500">{course.level}</small>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className='flex items-center'>
                      <img className="w-8 h-8 rounded-full mr-2" src={course.instructorRef.profile.avatar} alt="Instructor" />
                      <small className="text-gray-500 text-sm">{course?.instructorRef?.firstName}</small>
                    </div>
                    <div className='flex items-center'>
                      <span className="text-blue-500 text-lg font-bold">{course?.priceAmount ? `₹ ${course?.priceAmount}` : 'Free'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
};

export default CourseCards;

