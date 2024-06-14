// import { useAppDispatch } from '../../../hooks/hooke';
// import { getAllStudentAction } from '../../../redux/store/actions/admin/getAllStudentAction';
// import React, { useEffect, useState } from 'react';
// import LoadingIndicator from '../../common/skelton/loading';
// import { blockUnblockAction } from '../../../redux/store/actions/admin/blockUnblockAction';
// import AddCategory from './addCategoryModal';
// import EditCategory from './editCategory';
// import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
// import { format } from 'date-fns';
// import { editCategoryAction } from '@/redux/store/actions/course/editCategoryAction';

// interface data {
//   _id : string ,
//   isBlocked : boolean ,
// }
// interface Data {
//   categoryName : string ,
//   _id : string 
// }


// const Category: React.FC = () => {

//   const dispatch = useAppDispatch()
//   const [Categories, setCategories] = useState<any[]>([]);
//   const [ error, setError] = useState< string | null >(null);
//   const [ isLoading , setLoading] = useState< boolean >(true);
//   const [isAddModal , setAddmodal] = useState< boolean >(false)
//   const [isEditModal , setEditmodal] = useState< boolean >(false)
//   const [ Name , setName] = useState<{initialName:string ,isBlocked:boolean ,_id :string}>({
//     initialName: '',
//     isBlocked: false,
//     _id: ''
//   });
  

  
 
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await dispatch(getAllCategoryAction());
        
//         console.log('this is category data',response.payload.data)
// 				if (getAllCategoryAction.fulfilled.match( response )) {

// 					setCategories(response.payload.data);
//           console.log('to',Categories)

// 				} else {

// 					setError("Failed to fetch catgories");

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

//   const handleSubmit = (values :{categoryName : string}) => {
//     console.log('this is values', values)
//     // setAddmodal(false)
//   }
//   const onClose = () =>{
//     setAddmodal(false)
//     setEditmodal(false)
//   }
// const handleEdit = ( data : {initialName:string ,isBlocked:boolean ,_id :string} ) =>{
//   console.log('this is edit' , data)
//   setName(data)
//   setEditmodal(true)
// }
// const handleAddCategory = (data: {categoryName:string ,isBlocked:boolean ,_id :string ,createdAt:Date}) =>{
//     setLoading(true)
//     setCategories(prevCategories => [...prevCategories, data]);
//     setTimeout(()=>{
//       setLoading(false)
//     },1500)
   
// }

// const handleEditCategory =(data :Data )=>{

//   setCategories(prevCategories =>prevCategories.map((cat,index)=>{
//     console.log('modify',data)
//       return cat._id == data._id ? {...cat, categoryName:data.categoryName} : cat ;
//   }) )

// }

// const handleBlock =async  (data : {categoryName:string ,isBlocked:boolean ,_id :string}) => {
//   setLoading(true)
//      const response =await  dispatch(editCategoryAction(data))
//      if(response.payload&&response.payload.success){

//       setCategories((prevCategories) =>
//         prevCategories.map((Category) =>
//           Category._id === data._id
//             ? { ...Category , isBlocked: data.isBlocked }
//             : Category
//         )
//       );
      
//       setLoading(false)

//      }
// }
  

//   return (
//     <>
//     {isAddModal && <AddCategory handleEdit={handleAddCategory} onClose={onClose}/>}
//     {isEditModal && <EditCategory handleEditCategory={handleEditCategory} handleSubmit={handleSubmit} onClose={onClose} data={Name} />}
//     <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between">
//         <h1 className="text-xl font-bold ">Users Management</h1>
//         <button onClick={()=>setAddmodal(!isAddModal)} className='border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600  px-4 rounded-lg'>Add category</button>
//     </div>
//     <div className="flex w-[100%]  justify-center  h-[570px]">
//     { isLoading && <LoadingIndicator/> }
   
//       <div className="overflow-hidden w-[90%]">
//         <table className="w-full rounded-lg  ">
//           <thead>
//             <tr className="bg-gray-700 text-white text-center">
//               <th className="px-4 py-2">No</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Created At</th>
//               <th className="px-4 py-2">Edit</th>
//               <th className="px-4 py-2">Block/Unblock</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {Categories.map((category ,index) => (
//               <tr key={index} className="text-center border-b hover:bg-gray-800">
//                 <td className="px-4 py-2 border">{index+1}</td>
//                 <td className="px-4 py-2 border">{category?.categoryName}</td>
//                 <td className="px-4 py-2 border">{format(new Date(category?.createdAt), 'yyyy-MM-dd')}</td>
//                 <td className="px-4 py-2 border">
//                   <button onClick={()=>handleEdit({initialName : category.categoryName, isBlocked :category.isBlocked ,_id : category._id })} className='border hover:bg-blue-500 hover:text-white  border-blue-600 py-1 px-4 rounded-lg font-bold text-blue-600'>
//                     Edit
                    
//                   </button>
//                 </td>
//                 <td className="px-4 py-2 border">
//                 <button
//                   className={`border font-bold py-1 px-2 rounded-lg 
//                     ${category.isBlocked ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600' : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'}`}
//                   onClick={()=>handleBlock({categoryName : category.firstName, isBlocked :!category.isBlocked ,_id : category._id })}
//                 >
//                   {category.isBlocked ? 'Unblock' : 'Block'}
//                 </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Category;

import { useAppDispatch } from '../../../hooks/hooke';
import { getAllStudentAction } from '../../../redux/store/actions/admin/getAllStudentAction';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/skelton/loading';
import { blockUnblockAction } from '../../../redux/store/actions/admin/blockUnblockAction';
import AddCategory from './addCategoryModal';
import EditCategory from './editCategory';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { format } from 'date-fns';
import { editCategoryAction } from '@/redux/store/actions/course/editCategoryAction';
import { PaginationControls } from '@/Components/common/skelton';

interface Data {
  _id: string;
  isBlocked: boolean;
}

interface CategoryData {
  categoryName: string;
  _id: string;
}

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAddModal, setAddModal] = useState<boolean>(false);
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const [name, setName] = useState<{ initialName: string; isBlocked: boolean; _id: string }>({
    initialName: '',
    isBlocked: false,
    _id: ''
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(getAllCategoryAction());
        if (getAllCategoryAction.fulfilled.match(response)) {
          setCategories(response.payload.data);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categories.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleSubmit = (values: { categoryName: string }) => {
    console.log('this is values', values);
  };

  const onClose = () => {
    setAddModal(false);
    setEditModal(false);
  };

  const handleEdit = (data: { initialName: string; isBlocked: boolean; _id: string }) => {
    setName(data);
    setEditModal(true);
  };

  const handleAddCategory = (data: { categoryName: string; isBlocked: boolean; _id: string; createdAt: Date }) => {
    setLoading(true);
    setCategories((prevCategories) => [...prevCategories, data]);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleEditCategory = (data: CategoryData) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => (cat._id === data._id ? { ...cat, categoryName: data.categoryName } : cat))
    );
  };

  const handleBlock = async (data: { categoryName: string; isBlocked: boolean; _id: string }) => {
    setLoading(true);
    const response = await dispatch(editCategoryAction(data));
    if (response.payload && response.payload.success) {
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category._id === data._id ? { ...category, isBlocked: data.isBlocked } : category))
      );
      setLoading(false);
    }
  };

  return (
    <>
      {isAddModal && <AddCategory handleEdit={handleAddCategory} onClose={onClose} />}
      {isEditModal && <EditCategory handleEditCategory={handleEditCategory} handleSubmit={handleSubmit} onClose={onClose} data={name} />}
      <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between">
        <h1 className="text-xl font-bold">Users Management</h1>
        <button onClick={() => setAddModal(!isAddModal)} className="border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600 px-4 rounded-lg">
          Add category
        </button>
      </div>
      <div className="flex w-[100%] justify-center min-h-screen">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-hidden w-[90%]">
          <table className="w-full rounded-lg">
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
              {getPaginatedData().map((category, index) => (
                <tr key={index} className="text-center border-b hover:bg-gray-800">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{category?.categoryName}</td>
                  <td className="px-4 py-2 border">{format(new Date(category?.createdAt), 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit({ initialName: category.categoryName, isBlocked: category.isBlocked, _id: category._id })}
                      className="border hover:bg-blue-500 hover:text-white border-blue-600 py-1 px-4 rounded-lg font-bold text-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`border font-bold py-1 px-2 rounded-lg ${
                        category.isBlocked
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                      }`}
                      onClick={() => handleBlock({ categoryName: category.firstName, isBlocked: !category.isBlocked, _id: category._id })}
                    >
                      {category.isBlocked ? 'Unblock' : 'Block'}
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



export default CategoryPage;
