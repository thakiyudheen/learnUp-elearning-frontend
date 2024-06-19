import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useDropzone } from 'react-dropzone';
import InputField from '../../common/form-input/inputField';
import { instructorCourseSchema } from '@/validation-schema/instructorCourseSchema';
import { instructorCourseSchema2 } from '@/validation-schema/instructorCourseSchema';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { GrCloudUpload } from "react-icons/gr";
import { ClipLoader,BounceLoader , BarLoader,ClimbingBoxLoader, PacmanLoader} from 'react-spinners';



const Level = ['Biginner', 'Medium', 'Intermediate']
// Initial form values
const initialValues = {
  courseTitle: '',
  subTitle: '',
  level: '',
  description: '',
  category: '',
  pricing: 'free',
  language: '',
  courseThumbnail: null,
  videoTrailer: null,
};
const initialValues2 = {
  courseTitle: '',
  subTitle: '',
  level: '',
  description: '',
  category: '',
  pricing: '',
  language: '',
  priceAmount: '',
  courseThumbnail: null,
  videoTrailer: null,
};

interface DropzoneFieldProps {
  setFieldValue: (fieldName: string, file: File) => void;
  fieldName: string;
  accept: string;
  previewType:'image' | 'video';
}

const DropzoneField: React.FC<DropzoneFieldProps> = ({ setFieldValue, fieldName, accept, previewType }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewtype, setPreviewType] = useState<string | null>(null);





  const onDrop = async (acceptedFiles: File[]) => {
    console.log('this is dropped file ', acceptedFiles[0])
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const imageUrl = await FileUpload(file);
        setFieldValue(fieldName, imageUrl);
        console.log('image or video upload url', imageUrl);

        if (!imageUrl) {
          throw Error('image or video upload failed');
        }

        setPreview(URL.createObjectURL(file));
        setPreviewType(file.type.startsWith('image') ? 'image' : 'video'); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-gray-500 border-dashed rounded-md h-48 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex items-center justify-center">
          <BarLoader color="#4A90E2" loading={loading}  />
        </div>
      ) : preview ? (
        previewType === 'image' ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
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
        <>
          <GrCloudUpload className="text-bold text-[2rem] text-gray-400" />
          <br />
          <span className="text-gray-400">click to upload</span>
        </>
      )}
    </div>
  );
};

const CourseForm: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data } = useAppSelector((state: RootState) => state.category)
  console.log('this is the category data', data)
  useEffect(() => {
    const getCategories = async () => {
      const response = await dispatch(getAllCategoryAction())
      console.log('this is the category data', data?.data)
    }
    getCategories()

  }, [dispatch])
  console.log('helloooooo', data?.data)
  const categories = data?.data?.filter((el: any) => !el.isBlocked) || []


  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6">Create Course</h1>
      <Formik
        initialValues={!isPaid ? initialValues : initialValues}
        validationSchema={!isPaid ? instructorCourseSchema : instructorCourseSchema2}
        onSubmit={(values: any) => {
          console.log('this is data', values)
          navigate('/instructor/Add-lesson', { state: values })
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


            <div className="flex flex-wrap mb-6">
              {/* Course Title Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Course Title
                </label>
                <InputField
                  type="text"
                  placeholder="Course Title"
                  name="courseTitle"
                  background="bg-[#1D232A]"
                />
              </div>

              {/* Sub Title Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Sub Title
                </label>
                <InputField
                  type="text"
                  placeholder="Sub Title"
                  name="subTitle"
                  background="bg-[#1D232A]"
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-6">
              {/* Level Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Level
                </label>
                <Field
                  as="select"
                  name="level"
                  className="border-b border-gray-500 w-full bg-white text-gray-400 py-2 dark:bg-[#1D232A] dark:text-white outline-none"
                >
                  <option value="" label="Select a level" />
                  {Level.map((level: any, index: any) => (
                    <option key={index} value={level} label={level} />
                  ))}
                </Field>
                <ErrorMessage name="level" component="small" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Category Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="border-b border-gray-500 w-full py-2 bg-white text-gray-400 py-2 dark:bg-[#1D232A] dark:text-white outline-none"
                >
                  <option value="" label="Select a category" />
                  {categories.map((category: any, index: any) => (
                    <option key={index} value={category._id} label={category.categoryName} />
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="flex flex-wrap mb-6">
              {/* Description Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Description
                </label>
                <InputField
                  type="text"
                  placeholder="Description"
                  name="description"
                  background="bg-[#1D232A]"
                />
              </div>

              {/* Language Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Language
                </label>
                <InputField
                  type="text"
                  placeholder="Language"
                  name="language"
                  background="bg-[#1D232A]"
                />
              </div>

              {/* Price Section */}
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 mt-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Price (If Only Paid)
                </label>
                <InputField
                  type="text"
                  placeholder="Enter Price "
                  name="priceAmount"
                  background="bg-[#1D232A]"
                  disabled={!isPaid}
                />
              </div>

             {/* Pricing Section */}
              <div className="mb-6 mt-10 ml-4">
              {/* <label className="block text-sm font-medium text-gray-500 mb-1">
                Pricing
              </label> */}
              <div className="flex ">
                <button
                  type="button"
                  className={`py-1 px-6 rounded-l-lg  ${!isPaid ? 'bg-blue-700 text-white border-2 border-blue-700' : 'border-2 border-blue-700 text-blue-700'}`}
                  onClick={() => {
                    setIsPaid(false);
                    setFieldValue('pricing', 'Free');
                  }}
                >
                  Free
                </button>
                <button
                  type="button"
                  className={`py-1 px-6 rounded-r-lg ${isPaid ? 'bg-blue-700 text-white border-2 border-blue-700' :  'border-2 border-blue-700 text-blue-700'}`}
                  onClick={() => {
                    setIsPaid(true);
                    setFieldValue('pricing', 'Paid');
                  }}
                >
                  Paid
                </button>
              </div>
              <ErrorMessage name="pricing" component="small" className="text-red-500 text-sm mt-1" />
            </div>
             
            </div>

           
           
            

          

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button

                type="submit"
                className="bg-gradient-to-r bg-blue-700 rounded-lg shadow-lg text-[1rem] py-2 px-8 text-white"
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

