
import { useAppDispatch } from '@/hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../../Components/common/skelton/loading';
import { updateCourseAction } from '@/redux/store/actions/course/updateCourseAction';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import { PaginationControls } from '@/Components/common/skelton';
import { useNavigate } from 'react-router-dom';
import CourseTable from './courseTable';

interface Data {
  _id: string;
  isBlocked?: boolean;
  isPublished?: boolean;
  isReject?: boolean;
}

const CourseManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [rejects, setRejects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'courses' | 'rejects'>('courses');
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await dispatch(getAllCourseAction({}));
      console.log('data', response.payload);
      const allCourses = response.payload;
      setCourses(allCourses.filter((course: any) => course.isPublished));
      setRequests(allCourses.filter((course: any) => !course.isPublished && !course.isReject));
      setRejects(allCourses.filter((course: any) => course.isReject));
      setLoading(false);
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
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updateData._id ? { ...request, ...updateData } : request
        )
      );
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeTab === 'requests' ? requests.slice(startIndex, endIndex) : activeTab === 'courses' ? courses.slice(startIndex, endIndex) : rejects.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(activeTab === 'requests' ? requests.length / itemsPerPage : courses.length / itemsPerPage);

  return (
    <>
      <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between mr-[4rem]">
        <h1 className="text-xl font-bold">Course Management</h1>
        
      </div>
      <div className="flex ml-[4rem] mb-4">
          <div role="tablist" className="tabs tabs-boxed bg-gray-200 dark:bg-gray-700">
            <a role="tab" onClick={() => setActiveTab('courses')} className={`tab ${activeTab === 'courses' && 'tab-active'}`}>Courses</a>
            <a role="tab" onClick={() => setActiveTab('rejects')} className={`tab ${activeTab === 'rejects' && 'tab-active'}`}>Rejected</a>
            <a role="tab" onClick={() => setActiveTab('requests')} className={`tab ${activeTab === 'requests' && 'tab-active'}`}>Requests</a>
          </div>
        </div>
      <div className="flex w-[100%] justify-center  h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-hidden  w-[90%]">
          <div className="overflow-x-auto rounded-lg">
            {activeTab === 'requests' ? (
              <CourseTable handleUpdate={handleUpdate} getPaginatedData={getPaginatedData} />
            ) : activeTab == 'courses' ? (
              <table className="table">
                <thead>
                  <tr className="bg-gray-700 text-white text-center"><th>No</th>
                    <th>Title</th>
                    <th>Instructor Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>View</th>
                    <th>Block/Unblock</th>
                  </tr>
                </thead>
                <tbody >
                  {getPaginatedData().map((course: any, index: number) => (<tr key={index} className="text-center border-b border-gray-600">

                    <td>{index + 1}</td>
                    <td>{course?.courseTitle}</td>
                    <td>{course?.instructorRef?.firstName}</td>
                    <td>{course?.category.categoryName}</td>
                    <td>{course.pricing === 'free' ? '0' : course?.priceAmount}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/view-course/`, { state: course?._id })}
                        className="border font-bold py-1 px-2 rounded-lg hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
                      >
                        View
                      </button>
                    </td>                      <td>
                      <button
                        className={`border font-bold py-1 px-2 rounded-lg ${course.isBlocked
                            ? 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                            : 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          }`}
                        onClick={() =>
                          handleUpdate({
                            isBlocked: !course.isBlocked,
                            _id: course._id,
                          })
                        }
                      >                           
                      {course.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            ) :
              (<CourseTable handleUpdate={handleUpdate} getPaginatedData={getPaginatedData} />)
            }
          </div>
          <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default CourseManagement;
