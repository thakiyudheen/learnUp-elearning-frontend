import { useAppDispatch } from '@/hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../../Components/common/skelton/loading';
import { updateCourseAction } from '@/redux/store/actions/course/updateCourseAction';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import { PaginationControls } from '@/Components/common/skelton';
import { useNavigate } from 'react-router-dom';

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
  const [activeTab, setActiveTab] = useState<'requests' | 'courses'>('requests');
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await dispatch(getAllCourseAction());
      console.log('data',response.payload)
      const allCourses = response.payload;
      setCourses(allCourses.filter((course: any) => course.isPublished));
      setRequests(allCourses.filter((course: any) => !course.isPublished));
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
  const [itemsPerPage] = useState<number>(7);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeTab=='requests'?requests.slice(startIndex, endIndex):courses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(requests.length / itemsPerPage);
  return (
    <>
      <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between mr-[4rem]">
        <h1 className="text-xl font-bold">Course Management</h1>
        <div className="flex mb-4">
          <button
              className={`px-4 py-1 rounded-bl-lg rounded-tl-lg ${activeTab != 'courses' ? 'border border-blue-700 text-blue ' : 'bg-blue-700 text-white'}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button
              className={` px-7 py-1 rounded-br-lg rounded-tr-lg ${activeTab != 'requests' ? 'border border-blue-700 text-blue' : 'bg-blue-700 text-white'}`}
              onClick={() => setActiveTab('requests')}
            >
              Requests
            </button>
           
          </div>
      </div>
      <div className="flex w-[100%] justify-center h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-hidden w-[90%]">
         

          {activeTab === 'requests' ? (
            <table className="w-full rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-white text-center">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Instructor Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Reject/Accept</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((course: any, index: number) => (
                  <tr key={index} className="text-center border-b">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{course?.courseTitle}</td>
                    <td className="px-4 py-2 border">{course?.instructorRef?.firstName}</td>
                    <td className="px-4 py-2 border">{course?.category.categoryName}</td>
                    <td className="px-4 py-2 border">
                      {course.pricing === 'free' ? '0' : course?.priceAmount}
                    </td>
                    <td className="px-4 py-2 border">
                      <button onClick={()=>navigate(`/admin/view-course/`,{state : course?._id})} className="border font-bold py-1 px-2 rounded-lg hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600">
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      {!course.isReject && (
                        <button
                          className={`border font-bold py-1 px-2 rounded-lg ${
                            !course?.isPublished
                              ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                              : 'hover:bg-gray-600 hover:text-white border-gray-600 text-gray-600'
                          }`}
                          disabled={course?.isPublished}
                          onClick={() =>
                            handleUpdate({
                              isReject: false,
                              _id: course._id,
                              isPublished: true,
                            })
                          }
                        >
                          {course?.isPublished ? 'Accepted' : 'Accept'}
                        </button>
                      )}
                      {!course.isPublished && (
                        <button
                          className={`border font-bold py-1 px-2 ml-2 rounded-lg ${
                            course.isReject
                              ? 'hover:bg-red-600 hover:text-white border-gray-600 text-gray-600'
                              : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                          }`}
                          disabled={course.isReject}
                          onClick={() =>
                            handleUpdate({ isReject: true, _id: course })
                          }
                        >
                          {course.isReject ? 'Rejected' : 'Reject'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-white text-center">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Instructor Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Block/Unblock</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((course: any, index: number) => (
                  <tr key={index} className="text-center border-b">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{course?.courseTitle}</td>
                    <td className="px-4 py-2 border">{course?.instructorRef?.firstName}</td>
                    <td className="px-4 py-2 border">{course?.category.categoryName}</td>
                    <td className="px-4 py-2 border">
                      {course.pricing === 'free' ? '0' : course?.priceAmount}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={()=>navigate(`/admin/view-course/`,{state : course?._id})}
                        className="border font-bold py-1 px-2 rounded-lg hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className={`border font-bold py-1 px-2 rounded-lg ${
                          course.isBlocked
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
            
          )}
          <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default CourseManagement;
