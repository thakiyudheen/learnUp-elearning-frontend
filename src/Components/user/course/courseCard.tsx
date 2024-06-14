import { useAppDispatch } from '@/hooks/hooke';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import React, { useEffect, useState } from 'react';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { IoFilter } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const CourseCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [category, setCategory] = useState<any>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const navigate=useNavigate()

  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(getAllCourseAction());
      const response1 = await dispatch(getAllCategoryAction());

      if (response.payload) {
        setCourses(response.payload);
        setCategory(response1.payload.data)
        console.log('Data fetched', response.payload);
      }
    };
    getData();
  }, [dispatch]);

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
        <input type="text" className='bg-gray-200 py-1 ml-[12rem]  px-6 rounded-lg shadow-lg' placeholder='search...' />

        <div className="dropdown dropdown-bottom dropdown-end mr-[15rem]">
          <div tabIndex={0} role="button" className="  m-1">
            <IoFilter />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Category</summary>
                <ul className="menu p-2 bg-white rounded-box">
                  {category.map((category: any, index: any) => (
                    <li key={index}>
                      <label htmlFor={`category${index}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category${index}`}
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                          className="mr-2"
                        />
                        {category.categoryName}
                      </label>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Level</summary>
                <ul className="menu p-2 bg-white rounded-box">
                  <li>
                    <label htmlFor="level1" className="flex items-center">
                      <input
                        type="checkbox"
                        id="level1"
                        checked={selectedLevels.includes('Beginner')}
                        onChange={() => handleLevelChange('Beginner')}
                        className="mr-2"
                      />
                      Beginner
                    </label>
                  </li>
                  <li>
                    <label htmlFor="level2" className="flex items-center">
                      <input
                        type="checkbox"
                        id="level2"
                        checked={selectedLevels.includes('Medium')}
                        onChange={() => handleLevelChange('Medium')}
                        className="mr-2"
                      />
                      Medium
                    </label>
                  </li>
                  <li>
                    <label htmlFor="level3" className="flex items-center">
                      <input
                        type="checkbox"
                        id="level3"
                        checked={selectedLevels.includes('Intermediate')}
                        onChange={() => handleLevelChange('Intermediate')}
                        className="mr-2"
                      />
                      Intermediate
                    </label>
                  </li>
                  {/* Add more levels as needed */}
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown dropdown-right">
                <summary className="px-2 py-1 font-semibold">Price</summary>
                <ul className="menu p-2 bg-white rounded-box">
                  <li>
                    <label htmlFor="priceLowToHigh" onClick={() => handleSortOrderChange('asc')} className="flex items-center">
                      Price Low to High
                    </label>
                  </li>
                  <li>
                    <label htmlFor="priceHighToLow" onClick={() => handleSortOrderChange('desc')} className="flex items-center">
                      Price High to Low
                    </label>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>



      </div>
      <div className="container mx-auto p-4 flex justify-center min-h-screen ">
        <div className=" grid grid-cols-1 w-3/4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredAndSortedCourses.map((course: any, index: any) => {
            return (
              <div key={index} onClick={()=> navigate('/course',{state:course._id})} className="min-w-md dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg m-4 border dark:border-gray-700">
                <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt={course.courseTitle} />
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">Design</span>
                    <span className="text-gray-500 text-xs">3 Month</span>
                  </div>
                  <div className="font-bold text-xl mt-2 mb-2">{course.courseTitle}</div>
                  <small className="text-gray-700 text-base dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</small>
                  <div className="flex items-center mt-4">
                    <img className="w-8 h-8 rounded-full mr-2" src="/path/to/avatar.jpg" alt="Instructor" />
                    <div>
                      <p className="text-gray-800 text-sm">{course?.instructorRef}</p>
                      <div className="flex items-center">
                        <span className="text-gray-500 line-through mr-2">{course?.priceAmount}</span>
                        <span className="text-blue-500 text-lg font-bold">{"100"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CourseCards;
