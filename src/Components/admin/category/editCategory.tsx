import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../common/form-input/inputField"; // Adjust the path as needed
import { useTheme } from "../../ui/theme-provider";
import { useAppDispatch } from "@/hooks/hooke";
import { useNavigate } from "react-router-dom";
import { editCategoryAction } from "@/redux/store/actions/course/editCategoryAction";
import { findCategoryAction } from "@/redux/store/actions/course/findCategoryAction";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
});

interface FormValues {
    categoryName: string;
}
interface AddCategoryProps {
    handleSubmit: (values: FormValues) => void;
    onClose: () => void;
    data :{initialName : string , isBlocked : boolean , _id : string } 
}


const EditCategory: React.FC<AddCategoryProps> = ({onClose , data }) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isError , setError ] = useState<boolean>(false)
    

    const handleSubmit = async ( updated :{categoryName: string}) =>{
        
        const update = {
            categoryName : updated.categoryName ,
            _id : data._id ,
            isBlocked : data.isBlocked
        }

        const response = await dispatch(findCategoryAction(updated))

        if(response.payload&&response.payload.success){
            setError(true)
        }else{
            setError(false)
            const response = await  dispatch(editCategoryAction(update))
            if(response.payload&&response.payload.success){
                onClose()
            }
        }
    }

    const initialValues: FormValues = { categoryName:data.initialName ||'' };

    return (
        <div className="relative min-h-screen">
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
                                onClose()
                            }}
                        >
                            {() => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <InputField name="categoryName" type="text" defaultValue={data.initialName} placeholder="Category Name" />
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

export default EditCategory;
