// import { useAppDispatch } from '../../hooks/hooke';
// import { getAllStudentAction } from '../../redux/store/actions/admin/getAllStudentAction';
// import React, { useEffect, useState } from 'react';
// import LoadingIndicator from '../common/skelton/loading';
// import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
// import { getAllInstructorsAction } from '../../redux/store/actions/admin/getAllInstructorsAction';
// import { PaginationControls } from '../common/skelton';

// interface data {
//   _id : string ,
//   isBlocked : boolean ,
// }



// const instructorTable: React.FC = () => {

//   const dispatch = useAppDispatch()
//   const [instructors, setInstructor] = useState<any[]>([]);
//   const [ error, setError] = useState< string | null >(null);
//   const [ isLoading , setLoading] = useState< boolean >(true);
  

//   const handleBlock =async (data : data ) => {
    
//     const response = await dispatch(blockUnblockAction(data))
//     console.log(response.payload.data)

//     if(blockUnblockAction.fulfilled.match(response)){
//       setInstructor((prevInstructor) =>
//         prevInstructor.map((instructor) =>
//           instructor._id === data._id
//             ? { ...instructor, isBlocked: data.isBlocked }
//             : instructor
//         )
//       );
//     }

//   }

 
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const instructorData = await dispatch(getAllInstructorsAction());
        
        
// 				if (getAllInstructorsAction.fulfilled.match( instructorData )) {

// 					setInstructor(instructorData.payload.data);

// 				} else {

// 					setError("Failed to fetch students");

// 				}
//       } catch (error) {

//         console.error('Failed to fetch students:', error);
//         setError('Failed to fetch students');

//       } finally {
//         setLoading(false)
//       }
//     };

//     fetchStudents();
//   }, [dispatch]);

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage] = useState<number>(7);
//   const getPaginatedData = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return instructors.slice(startIndex, endIndex);
//   };

//   const totalPages = Math.ceil(instructors.length / itemsPerPage);
  

//   return (
//     <>
//     <div className="mb-6 ml-[4.3rem] mt-[2rem]">
//         <h1 className="text-xl font-bold ">Instructor Management</h1>
//     </div>
//     <div className="flex w-[100%]  justify-center  h-[570px]">
//     { isLoading && <LoadingIndicator/> }
//       <div className="overflow-hidden w-[90%]">
//         <table className="w-full rounded-lg  ">
//           <thead>
//             <tr className="bg-gray-700 text-white text-center">
//               <th className="px-4 py-2">No</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Profession</th>
//               <th className="px-4 py-2">Verified</th>
//               <th className="px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getPaginatedData().map(( instructor ,index) => (
//               <tr key={index} className="text-center border-b">
//                 <td className="px-4 py-2 border">{index + 1}</td>
//                 <td className="px-4 py-2 border">{instructor?.firstName}</td>
//                 <td className="px-4 py-2 border">{instructor?.email}</td>
//                 <td className="px-4 py-2 border">{instructor.profession}</td>
//                 <td className="px-4 py-2 border">{`${instructor.isVerified?'Yes':'No'}`}</td>
//                 <td className="px-4 py-2 border">
//                 <button
//                   className={`border font-bold py-1 px-2 rounded-lg 
//                     ${instructor.isBlocked ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600' : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'}`}
//                   onClick={()=>handleBlock({_id : instructor._id , isBlocked : !instructor.isBlocked})}
//                 >
//                   {instructor.isBlocked ? 'Unblock' : 'Block'}
//                 </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
//       </div>
//     </div>
//     </>
//   );
// };

// export default instructorTable;

import { useAppDispatch } from '../../hooks/hooke';
import { getAllInstructorsAction } from '../../redux/store/actions/admin/getAllInstructorsAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
import { PaginationControls } from '../common/skelton';

interface data {
  _id: string;
  isBlocked: boolean;
}

const InstructorTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [instructors, setInstructors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleBlock = async (data: data) => {
    const response = await dispatch(blockUnblockAction(data));
    if (blockUnblockAction.fulfilled.match(response)) {
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === data._id
            ? { ...instructor, isBlocked: data.isBlocked }
            : instructor
        )
      );
    }
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const instructorData = await dispatch(getAllInstructorsAction());
        if (getAllInstructorsAction.fulfilled.match(instructorData)) {
          setInstructors(instructorData.payload.data);
        } else {
          setError('Failed to fetch instructors');
        }
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
        setError('Failed to fetch instructors');
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return instructors.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(instructors.length / itemsPerPage);

  return (
    <>
      <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold">Instructor Management</h1>
      </div>
      <div className="flex w-[100%] justify-center h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-x-auto rounded-lg w-[90%]">
          <table className="table w-full ">
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
              {getPaginatedData().map((instructor, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={instructor.profile?.avatar} alt="Profile Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{instructor?.firstName}</td>
                  <td className="px-4 py-2 border">{instructor?.email}</td>
                  <td className="px-4 py-2 border">{instructor.profession}</td>
                  <td className="px-4 py-2 border">{`${instructor.isVerified ? 'Yes' : 'No'}`}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`border font-bold py-1 px-2 rounded-lg ${
                        instructor.isBlocked
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                      }`}
                      onClick={() => handleBlock({ _id: instructor._id, isBlocked: !instructor.isBlocked })}
                    >
                      {instructor.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default InstructorTable;
