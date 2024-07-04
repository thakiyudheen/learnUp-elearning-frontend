import { useAppDispatch } from '@/hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/skelton/loading';
import { updateCourseAction } from '@/redux/store/actions/course/updateCourseAction';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import { PaginationControls } from '@/Components/common/skelton';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../common/skelton/confirmModal'

interface Data {
  _id: string;
  isBlocked?: boolean;
  isPublished?: boolean;
  isReject?: boolean;
}

const Assessment: React.FC = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [rejects, setRejects] = useState<any[]>([]);
  const [isModal, setModal] = useState<any>(false);
  const [updateData, setUpdateData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'requests' | 'courses' | 'rejects'>('courses');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await dispatch(getAllCourseAction({ page: currentPage, limit: itemsPerPage }));
      console.log('data course', response.payload);
      const { courses, totalItems } = response.payload;
      setCourses(courses.filter((course: any) => course.isPublished));
      setRequests(courses.filter((course: any) => !course.isPublished && !course.isReject));
      setRejects(courses.filter((course: any) => course.isReject));
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      setLoading(false);
    };
    getData();
  }, [dispatch, currentPage]);

  const handleUpdate = async () => {
    console.log('the data', updateData);
    setModal(!isModal);
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
      setRejects((prevRejects) =>
        prevRejects.map((reject) =>
          reject._id === updateData._id ? { ...reject, ...updateData } : reject
        )
      );
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeTab === 'requests'
      ? requests.slice(startIndex, endIndex)
      : activeTab === 'courses'
      ? courses.slice(startIndex, endIndex)
      : rejects.slice(startIndex, endIndex);
  };

  const onCancel = () => {
    setModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <ConfirmModal onConfirm={handleUpdate} onCancel={onCancel} message={"This Action"} />
      )}
      <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between mr-[4rem]">
        <h1 className="text-xl font-bold">Course Management</h1>
      </div>
      <div className="flex ml-[4rem] mb-4"></div>
      <div className="flex w-[100%] justify-center h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-hidden w-[90%]">
          <div className="overflow-x-auto rounded-lg">
            <table className="table">
              <thead>
                <tr className="bg-gray-700 text-white text-center">
                  <th>No</th>
                  <th>Title</th>
                  <th>Instructor Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>View</th>
                  <th>Block/Unblock</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((course: any, index: number) => (
                  <tr key={index} className="text-center border-b border-gray-600 dark:hover:bg-gray-800">
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
                    </td>
                    <td>
                      <button
                        className={`border font-bold py-1 px-2 rounded-lg ${
                          course.isBlocked
                            ? 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                            : 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                        }`}
                        onClick={() => {
                          navigate('/instructor/add-assessment',{state:course?._id})
                        }}
                      >
                        Add Exam
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default Assessment;
