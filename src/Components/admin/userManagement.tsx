import { useAppDispatch } from '../../hooks/hooke';
import { getAllStudentAction } from '../../redux/store/actions/admin/getAllStudentAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';

interface data {
  _id : string ,
  isBlocked : boolean ,
}



const UserTable: React.FC = () => {

  const dispatch = useAppDispatch()
  const [students, setStudents] = useState<any[]>([]);
  const [ error, setError] = useState< string | null >(null);
  const [ isLoading , setLoading] = useState< boolean >(true);
  

  const handleBlock =async (data : data ) => {
    
    const response = await dispatch(blockUnblockAction(data))
    console.log(response.payload.data)

    if(blockUnblockAction.fulfilled.match(response)){
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === data._id
            ? { ...student, isBlocked: data.isBlocked }
            : student
        )
      );
    }

  }

 
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await dispatch(getAllStudentAction());
        
        
				if (getAllStudentAction.fulfilled.match( studentsData )) {

					setStudents(studentsData.payload.data);

				} else {

					setError("Failed to fetch students");

				}
      } catch (error) {

        console.error('Failed to fetch students:', error);
        setError('Failed to fetch students');

      } finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [dispatch]);

 
  

  return (
    <>
    <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold ">Users Management</h1>
    </div>
    <div className="flex w-[100%]  justify-center  h-[570px]">
    { isLoading && <LoadingIndicator/> }
      <div className="overflow-hidden w-[90%]">
        <table className="w-full rounded-lg  ">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">Verified</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student ,index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{student?.firstName}</td>
                <td className="px-4 py-2 border">{student?.email}</td>
                <td className="px-4 py-2 border">{student.profession}</td>
                <td className="px-4 py-2 border">{`${student.isVerified?'Yes':'No'}`}</td>
                <td className="px-4 py-2 border">
                <button
                  className={`border font-bold py-1 px-2 rounded-lg 
                    ${student.isBlocked ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600' : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'}`}
                  onClick={()=>handleBlock({_id : student._id , isBlocked : !student.isBlocked})}
                >
                  {student.isBlocked ? 'Unblock' : 'Block'}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UserTable;
