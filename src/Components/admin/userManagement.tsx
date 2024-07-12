import { useAppDispatch } from '../../hooks/hooke';
import { getAllStudentAction } from '../../redux/store/actions/admin/getAllStudentAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
import { PaginationControls } from '../common/skelton';
import ConfirmModal from '../common/skelton/confirmModal';

// interface Data {
//   _id: string;
//   isBlocked: boolean;
// }

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [students, setStudents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limitPage=7;
  const [isModal ,setModal ] = useState(false)
  const [value ,setValue]= useState<any>({})

  const handleBlock = async () => {
    setModal(false)
    const response = await dispatch(blockUnblockAction(value));
    if (blockUnblockAction.fulfilled.match(response)) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === value._id
            ? { ...student, isBlocked: value.isBlocked }
            : student
        )
      );
    }
  };
console.log(error)
  const fetchStudents = async (page: number) => {
    try {
      setLoading(true);
      const studentsData = await dispatch(getAllStudentAction({ page, limit:limitPage }));
      console.log('data student',studentsData.payload)
      if (getAllStudentAction.fulfilled.match(studentsData)) {
        setStudents(studentsData.payload.data.students);
        setTotalPages(Math.ceil(studentsData.payload.data.totalItems/limitPage));
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

  const onCancel =()=>{
    setModal(false)
  }

  useEffect(() => {
    fetchStudents(currentPage);
  }, [dispatch, currentPage]);

  return (
    <>
    {isModal&& <ConfirmModal message={"This Action"} onConfirm={handleBlock} onCancel={onCancel}/>}
      <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold">Users Management</h1>
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
                <th className="px-4 py-2">Email</th>
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
                          <img src={student.profile?.avatar} alt="Profile Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{student?.firstName}</td>
                  <td className="px-4 py-2 border">{student?.email}</td>
                  <td className="px-4 py-2 border">{student.profession}</td>
                  <td className="px-4 py-2 border">{`${student.isVerified ? 'Yes' : 'No'}`}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`border font-bold py-1 px-2 rounded-lg ${
                        student.isBlocked
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                      }`}
                      onClick={() =>{ setValue({ _id: student._id, isBlocked: !student.isBlocked });setModal(true)}  }
                    >
                      {student.isBlocked ? 'Unblock' : 'Block'}
                    </button>
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

export default UserTable;
