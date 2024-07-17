import { useAppDispatch, useAppSelector } from '../../../hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/skelton/loading';
import { RootState } from '@/redux/store';
import { PaginationControls } from '@/Components/common/skelton';
import { getMyStudentAction } from '@/redux/store/actions/enrollment/getMyStudentAaction';

interface Data {
  _id: string;
  isBlocked: boolean;
}

const MyStudents: React.FC = () => {


  const{data}= useAppSelector((state:RootState)=> state.user)
  const dispatch = useAppDispatch();
  const [students, setStudents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limitPage=7;
  const [isModal ,setModal ] = useState(false)
  const [value ,setValue]= useState<any>({})


  const fetchStudents = async (page: number) => {
    try {
      setLoading(true);
      const studentsData = await dispatch(getMyStudentAction({ page, limit:limitPage,instructorId:data?.data?._id }));
      console.log('data student',studentsData?.payload?.data)
      if (getMyStudentAction?.fulfilled.match(studentsData)) {
        setStudents(studentsData?.payload?.data?.students?.reverse());
        setTotalPages(Math.ceil(studentsData?.payload?.data?.totalItems/limitPage));
      } else {
        setError('Failed to fetch students');
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchStudents(currentPage);
  }, [dispatch, currentPage]);

  return (
    <>
    
      <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold">My Students</h1>
      </div>
      <div className="flex w-[100%] justify-center h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-x-auto w-[90%]">
          <table className="table w-full rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border dark:hover:bg-gray-800">{index + 1 + (currentPage - 1) * 7}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={student.userId?.profile?.avatar} alt="Profile Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{student?.userId?.firstName}</td>
                  <td className="px-4 py-2 border">{student?.userId?.profession}</td>
                  <td className="px-4 py-2 border">{`${student?.userId?.isVerified ? 'Yes' : 'No'}`}</td>
                  <td className="px-4 py-2 border">
                  {student?.courseId?.courseTitle}
                  </td>
                </tr>
              ))}
            </tbody>
         
          </table>
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

export default MyStudents;
