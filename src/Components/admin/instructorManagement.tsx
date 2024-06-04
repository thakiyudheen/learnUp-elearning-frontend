import { useAppDispatch } from '../../hooks/hooke';
import { getAllStudentAction } from '../../redux/store/actions/admin/getAllStudentAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
import { getAllInstructorsAction } from '../../redux/store/actions/admin/getAllInstructorsAction';

interface data {
  _id : string ,
  isBlocked : boolean ,
}



const instructorTable: React.FC = () => {

  const dispatch = useAppDispatch()
  const [instructors, setInstructor] = useState<any[]>([]);
  const [ error, setError] = useState< string | null >(null);
  const [ isLoading , setLoading] = useState< boolean >(true);
  

  const handleBlock =async (data : data ) => {
    
    const response = await dispatch(blockUnblockAction(data))
    console.log(response.payload.data)

    if(blockUnblockAction.fulfilled.match(response)){
      setInstructor((prevInstructor) =>
        prevInstructor.map((instructor) =>
          instructor._id === data._id
            ? { ...instructor, isBlocked: data.isBlocked }
            : instructor
        )
      );
    }

  }

 
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const instructorData = await dispatch(getAllInstructorsAction());
        
        
				if (getAllInstructorsAction.fulfilled.match( instructorData )) {

					setInstructor(instructorData.payload.data);

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
        <h1 className="text-xl font-bold ">Instructor Management</h1>
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
            {instructors.map(( instructor ,index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{instructor?.firstName}</td>
                <td className="px-4 py-2 border">{instructor?.email}</td>
                <td className="px-4 py-2 border">{instructor.profession}</td>
                <td className="px-4 py-2 border">{`${instructor.isVerified?'Yes':'No'}`}</td>
                <td className="px-4 py-2 border">
                <button
                  className={`border font-bold py-1 px-2 rounded-lg 
                    ${instructor.isBlocked ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600' : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'}`}
                  onClick={()=>handleBlock({_id : instructor._id , isBlocked : !instructor.isBlocked})}
                >
                  {instructor.isBlocked ? 'Unblock' : 'Block'}
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

export default instructorTable;
