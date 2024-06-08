import { useAppDispatch } from '../../../hooks/hooke';
import { getAllStudentAction } from '../../../redux/store/actions/admin/getAllStudentAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/skelton/loading';
import { blockUnblockAction } from '../../../redux/store/actions/admin/blockUnblockAction';
import AddCategory from './addCategoryModal';
import EditCategory from './editCategory';

interface data {
  _id : string ,
  isBlocked : boolean ,
}



const Category: React.FC = () => {

  const dispatch = useAppDispatch()
  const [students, setStudents] = useState<any[]>([]);
  const [ error, setError] = useState< string | null >(null);
  const [ isLoading , setLoading] = useState< boolean >(true);
  const [isAddModal , setAddmodal] = useState< boolean >(false)
  const [isEditModal , setEditmodal] = useState< boolean >(false)
  const [ Name , setName] = useState<{initialName:string ,isBlocked:boolean ,_id :string}>({
    initialName: '',
    isBlocked: false,
    _id: ''
  });
  

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

  const handleSubmit = (values :{categoryName : string}) => {
    console.log('this is values', values)
    // setAddmodal(false)
  }
  const onClose = () =>{
    setAddmodal(false)
    setEditmodal(false)
  }
const handleEdit = ( data : {initialName:string ,isBlocked:boolean ,_id :string} ) =>{
  console.log('this is edit' , data)
  setName(data)
  setEditmodal(true)
}
  

  return (
    <>
    {/* {isAddModal && <AddCategory handleSubmit={handleSubmit} onClose={onClose}/>} */}
    {isEditModal && <EditCategory handleSubmit={handleSubmit} onClose={onClose} data={Name} />}
    <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between">
        <h1 className="text-xl font-bold ">Users Management</h1>
        <button onClick={()=>setAddmodal(!isAddModal)} className='border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600  px-4 rounded-lg'>Add category</button>
    </div>
    <div className="flex w-[100%]  justify-center  h-[570px]">
    { isLoading && <LoadingIndicator/> }
   
      <div className="overflow-hidden w-[90%]">
        <table className="w-full rounded-lg  ">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Block/Unblock</th>
              
            </tr>
          </thead>
          <tbody>
            {students.map((student ,index) => (
              <tr key={index} className="text-center border-b hover:bg-gray-800">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{student?.firstName}</td>
                <td className="px-4 py-2 border">{student?.email}</td>
                <td className="px-4 py-2 border">
                  <button onClick={()=>handleEdit({initialName : student.firstName, isBlocked :student.isBlocked ,_id : student._id })} className='border hover:bg-blue-500 hover:text-white  border-blue-600 py-1 px-4 rounded-lg font-bold text-blue-600'>
                    Edit
                    
                  </button>
                </td>
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

export default Category;
