import { useAppDispatch } from '../../../hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/skelton/loading';
import AddCategory from './addCategoryModal';
import EditCategory from './editCategory';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { format } from 'date-fns';
import { editCategoryAction } from '@/redux/store/actions/course/editCategoryAction';
import { PaginationControls } from '@/Components/common/skelton';
import ConfirmModal from '@/Components/common/skelton/confirmModal';

// interface Data {
//   _id: string;
//   isBlocked: boolean;
// }

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
  const [value ,setValue ]= useState<any>({})
  const [isModal ,setModal]=useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(2);

  console.log(error);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(getAllCategoryAction({}));
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
  }, [dispatch,currentPage]);

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

  const handleBlock = async () => {
    setModal(false)
    setLoading(true);
    const response = await dispatch(editCategoryAction(value));
    if (response.payload && response.payload.success) {
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category._id === value._id ? { ...category, isBlocked: value.isBlocked } : category))
      );
      setLoading(false);
    }
  };

  const onCancel =( ) =>{
    setModal(false)
  }

  return (
    <>
      {isModal&& <ConfirmModal message={'Action'} onCancel={onCancel} onConfirm={handleBlock} />}
      {isAddModal && <AddCategory handleEdit={handleAddCategory} onClose={onClose} />}
      {isEditModal && <EditCategory handleEditCategory={handleEditCategory} handleSubmit={handleSubmit} onClose={onClose} data={name} />}
      <div className="mb-6 ml-[4.3rem] mt-[2rem] flex justify-between">
        <h1 className="text-xl font-bold">Category Management</h1>
        <button onClick={() => setAddModal(!isAddModal)} className="border-2 border-blue-500 py-1 mr-[3.7rem] hover:bg-blue-600 px-4 rounded-lg">
          Add category
        </button>
      </div>
      <div className="flex w-[100%] justify-center min-h-screen">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-x-auto w-[90%] rounded-lg">
          <table className="table  w-full rounded-lg">
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
                <tr key={index} className="text-center border-b dark:hover:bg-gray-800">
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
                      onClick={() =>{ setValue({ categoryName: category.firstName, isBlocked: !category.isBlocked, _id: category._id });setModal(true)}}
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
