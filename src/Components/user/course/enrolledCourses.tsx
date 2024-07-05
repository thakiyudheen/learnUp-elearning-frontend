import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import React, { useEffect, useState } from 'react';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { IoFilter } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { PaginationControls } from '@/Components/common/skelton';
import { getEnrollmentByIdAction } from '@/redux/store/actions/enrollment/getEnrollmentByIdAction';
import { RootState } from '@/redux/store';
import {  FaTag } from 'react-icons/fa';

const EnrolledCourses: React.FC = () => {
  const { data } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  // const [Completedcourses, setCompletedCourses] = useState<any[]>([]);
  const [category, setCategory] = useState<any>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [searchQuery, setSearch] = useState<string>('')
  const navigate = useNavigate();

  // pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);


  useEffect(() => {
    getData();
    getCategory()
  }, [dispatch, currentPage]);
  const getData = async () => {


    const response2 = await dispatch(getEnrollmentByIdAction({
      userId: data?.data?._id,
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,

    }));
    if (response2.payload) {
      console.log()
      setCourses(response2.payload.data);

    }
  };
  const getCategory = async () => {
    const response1 = await dispatch(getAllCategoryAction({}));

    setCategory(response1.payload.data);

  }


  useEffect(() => {
    getData();
  }, [searchQuery])

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
      const priceA = a.courseId.priceAmount || 0;
      const priceB = b.courseId.priceAmount || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };

  // console.log(selectedLevels,courses?.courseId)
  const filterCourses = (courses: any[]) => {
    return courses.filter(course =>
      (!selectedCategories.length || selectedCategories.includes(course?.courseId.category?._id)) &&
      (!selectedLevels.length || selectedLevels.includes(course?.courseId.level)));
  };

  const filteredAndSortedCourses = sortCourses(filterCourses(courses), sortOrder);

  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);

  return (
    <div className='mt-[3.5rem] '>

      <div className='flex justify-between pt-4'>
        <input type="text" onChange={(e) => setSearch(e.target.value)} className='bg-gray-300 w-100  dark:bg-gray-700 py-1 ml-[12rem] px-6 rounded-full shadow-md' placeholder='search...' />
        <div className='mr-[9rem]'>
          <details className="dropdown dropdown-right ">
            <summary className="px-6 py-1 text-white  bg-blue-600 rounded-md font-semibold flex items-center"><small>Category</small></summary>
            <ul className="menu p-2 bg-gray-200 shadow-lg dark:bg-gray-700 rounded-box absolute z-30">
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
            <ul className="menu p-2 bg-gray-200 shadow-lg dark:bg-gray-700 z-30 absolute rounded-box">
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
            <ul className="menu p-2 bg-gray-200 shadow-lg dark:bg-gray-700 rounded z-30 w-[10rem] absolute">
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
        <div className="grid grid-cols-1 w-3/4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
          {filteredAndSortedCourses.map((course: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => navigate('/student/view-video', { state: course?.courseId?._id })}
                className="card   w-70 dark:bg-gray-800 bg-white z-10 rounded-lg overflow-hidden shadow-lg m-2 md:h-[20rem] border dark:border-gray-800 cursor-pointer"
              >
                <figure>
                  <img className="w-full h-48 object-cover" src={course?.courseId?.courseThumbnail} alt={course.courseTitle} />
                </figure>
                <div className="card-body px-6 py-4 flex flex-col justify-between h-full">
                  <div>
                    <div className=" font-bold mt-2 mb-2 min-h-[3rem]">
                      <p>{course?.courseId?.courseTitle}</p>
                    </div>
                    <div className="flex flex-col justify-between flex-grow space-y-2">
                      <div className="flex items-center text-[16px] font-semibold">
                        <FaTag className="text-gray-500 mr-2" />
                        <small className="text-gray-700 text-base dark:text-gray-500">{course?.courseId?.category?.categoryName}</small>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center">
                      <a className="py-2 px-6 border-2 border-blue-600 text-blue-600 rounded-lg flex items-center">
                        <small>Learn more</small>
                      </a>
                    </div>
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

export default EnrolledCourses;

