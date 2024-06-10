import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage ,Field } from 'formik';
import { useDropzone } from 'react-dropzone';
import InputField from '../../common/form-input/inputField';
import { instructorCourseSchema } from '@/validation-schema/instructorCourseSchema';
import { instructorCourseSchema2 } from '@/validation-schema/instructorCourseSchema';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';



// Initial form values
const initialValues = {
  courseTitle: '',
  description: '',
  category: '',
  pricing: 'free',
  language :'',
  courseThumbnail: null,
  videoTrailer: null,
};
const initialValues2 = {
  courseTitle: '',
  description: '',
  category: '',
  pricing: '',
  language :'',
  priceAmount: '',
  courseThumbnail: null,
  videoTrailer: null,
};

interface DropzoneFieldProps {
  setFieldValue: (fieldName: string, file: File) => void;
  fieldName: string;
  accept: string;
  previewType: string;
}

const DropzoneField: React.FC<DropzoneFieldProps> = ({ setFieldValue, fieldName, accept, previewType }) => {
  const [preview, setPreview] = useState<string | null>(null);




  const onDrop = async (acceptedFiles: File[]) => {
    console.log('this is dropped file ',acceptedFiles[0] )
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = await FileUpload(file)
      setFieldValue(fieldName, imageUrl);
      console.log('image or video upload  url', imageUrl)

      if(!imageUrl){
        throw Error('image or video upload filed');
      }
      
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="border-2 border-gray-200 border-dashed rounded-md h-48 flex items-center justify-center">
      <input {...getInputProps()} />
      {preview ? (
        previewType === 'image' ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <iframe
            src={preview}
            title="Video Preview"
            className="h-full w-full object-cover border-2 border-gray-200 rounded-md"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      ) : (
        <span className="text-gray-400">Drag & drop or click to upload</span>
      )}
    </div>
  );
};

const CourseForm: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {data}= useAppSelector((state:RootState)=> state.category )
  console.log('this is the category data',data)
  useEffect(()=>{
    const getCategories = async ( ) =>{
      const response = await dispatch(getAllCategoryAction())
      console.log('this is the category data',data?.data)
    }
    getCategories()
    
  },[dispatch])
  console.log('helloooooo',data?.data)
  const categories = data?.data?.filter((el : any)=> !el.isBlocked) || []
  

  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6">Create Course</h1>
      <Formik
        initialValues={!isPaid?initialValues:initialValues}
        validationSchema={!isPaid?instructorCourseSchema:instructorCourseSchema2}
        onSubmit={(values : any) => {
           navigate('/instructor/Add-lesson',{state:values})
        }}
      >
        {({ setFieldValue }) => (
          <Form >
            {/* Course Thumbnail and Video Trailer Section */}
            <div className="grid grid-cols-2 gap-6 mb-6 ">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Course Thumbnail
                </label>
                <DropzoneField
                  setFieldValue={setFieldValue}
                  fieldName="courseThumbnail"
                  accept="image/*"
                  previewType="image"
                />
                <ErrorMessage name="courseThumbnail" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Video Trailer
                </label>
                <DropzoneField
                  setFieldValue={setFieldValue}
                  fieldName="videoTrailer"
                  accept="video/*"
                  previewType="video"
                />
                <ErrorMessage name="videoTrailer" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Course Title Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Course Title
              </label>
              <InputField type="text" placeholder="Course Title" name="courseTitle" background='bg-[#1D232A]' />
              
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Description
              </label>
              <InputField type="text" placeholder="Description" name="description" background='bg-[#1D232A]' />
             
            </div>

            {/* Category Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Category
              </label>
              <Field as="select" name="category" className="border-b border-gray-500 w-full py-2 bg-[#1D232A] text-white outline-none">
                <option value="" label="Select a category" />
                {categories.map((category:any, index :any) => (
                  <option key={index} value={category._id} label={category.categoryName} />
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* language Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Language
              </label>
              <InputField type="text" placeholder="Language" name="language" background='bg-[#1D232A]' />
             
            </div>
            {/* Pricing Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Pricing
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`py-2 px-4 rounded-full ${!isPaid ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                  onClick={() => {
                    setIsPaid(false);
                    setFieldValue('pricing', 'Free');
                  }}
                >
                  Free
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-full ${isPaid ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                  onClick={() => {
                    setIsPaid(true);
                    setFieldValue('pricing', 'Paid');
                  }}
                >
                  Paid
                </button>
              </div>
              <ErrorMessage name="pricing" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Payment Details Section (conditionally rendered) */}
            {isPaid && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Price Amount
                </label>
                <InputField type="number" placeholder="Enter Price" name="priceAmount" background='bg-[#1D232A]' />
               
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                
                type="submit"
                className="bg-gradient-to-r from-blue-400 to-blue-800 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
              >
                Create Course

              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseForm;
