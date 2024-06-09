import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../common/form-input/inputField"; // Adjust the path as needed
import { useTheme } from "../../ui/theme-provider";
import { useAppDispatch } from "@/hooks/hooke";
import { addCategoryAction } from "@/redux/store/actions/course/addCategoryAction";
import { findCategoryAction } from "@/redux/store/actions/course/findCategoryAction";


interface Data {
    _id :string ;
    isBlocked: boolean ;
    categoryName:string;
    createdAt:Date;
}
// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
});

interface FormValues {
    categoryName: string;

}
interface AddCategoryProps {
   handleEdit :(data : Data)=>void
    onClose: () => void;
}


const AddCategory: React.FC<AddCategoryProps> = ({onClose , handleEdit }) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const [isError ,setError]= useState<boolean>(false)
    const [isLoading , setLoading] = useState<boolean>(false)

    const initialValues: FormValues = { categoryName: '' };

    const handleSubmit = async ( data : {categoryName : string} ) => {
        data.categoryName = data.categoryName.toUpperCase()
        setLoading(true)
        const response = await dispatch(findCategoryAction(data))
        
        if(response.payload&&response.payload.success){
            setError(true)
            setLoading(false)
        }else {
            setError(false)
            const response = await dispatch(addCategoryAction(data))
            if(response.payload&&response.payload.success){
                
                setLoading(false)
                const catData : Data = {
                    _id : response.payload.data._id,
                    categoryName : response.payload.data.categoryName.toUpperCase(),
                    isBlocked : false,
                    createdAt :response.payload.data.createdAt
                }
                
                handleEdit(catData)
                onClose()
            }
        }
    }

    return (
        <div className="relative  mb-10">
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
                    <div className={`relative p-8 w-full max-w-md mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg`}>
                        <h1 className="text-lg mb-4">Enter Category Name</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values: FormValues) => {
                                console.log(values);
                                handleSubmit(values)
                                
                            }}
                        >
                            {() => (
                                <Form className="flex flex-col gap-4">
                                    {isError&&<small className="text-[red]">Category is Exist</small>}
                                    <div className="flex flex-col gap-2">
                                        <InputField name="categoryName" type="text" placeholder="Category Name" />
                                    </div>
                                    <div className="flex flex-row gap-4 mt-4">
                                        <button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg rounded-lg">
                                            Close
                                        </button>
                                        <button type="submit" className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-lg">
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
        </div>
    );
}

export default AddCategory;
