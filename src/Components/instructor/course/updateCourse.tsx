import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useDropzone } from 'react-dropzone';
import { instructorCourseSchema } from '@/validation-schema/instructorCourseSchema';
import { instructorCourseSchema2 } from '@/validation-schema/instructorCourseSchema';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getAllCategoryAction } from '@/redux/store/actions/course/getAllCategoryAction';
import { getCourseByIdAction } from '@/redux/store/actions/course/getCourseByIdAction';
import { GrCloudUpload } from "react-icons/gr";
import { ClipLoader, BounceLoader, BarLoader, ClimbingBoxLoader, PacmanLoader } from 'react-spinners';
import { useTheme } from '@/Components/ui/theme-provider';

const Level = ['Beginner','Medium','Intermediate'];

const DropzoneField = ({ setFieldValue, fieldName, accept, previewType , defaultImageUrl }: any) => {
  const [preview, setPreview] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setPreview(defaultImageUrl);
  }, [defaultImageUrl]);
  

  const onDrop = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true);
      try {
        const imageUrl = await FileUpload(file);
        setFieldValue(fieldName, imageUrl.secure_url);
        setPreview(URL.createObjectURL(file));
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
    accept,
  });

  return (
    <div {...getRootProps()} className="border-2 border-gray-500 border-dashed rounded-md h-48 flex items-center justify-center">
      <input {...getInputProps()} />
      {loading ? (
        <BarLoader color="#4A90E2" loading={loading} />
      ) : preview ? (
        previewType === 'image' ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <iframe src={preview} title="Video Preview" className="h-full w-full object-cover border-2 border-gray-200 rounded-md" allowFullScreen />
        )
      ) : (
        <>
          <GrCloudUpload className="text-bold text-[2rem] text-gray-400" />
          <br />
          <span className="text-gray-400">Click to upload</span>
        </>
      )}
    </div>
  );
};

const CourseForm = () => {
  const [isPaid, setPaid] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.category);
  const { theme } = useTheme()

  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(getCourseByIdAction(location.state));
      await dispatch(getAllCategoryAction({}));
      if (response.payload) {

        setCourse(response.payload);
        setPaid(response?.payload?.pricing === 'Paid' ? true : false);
      }
    };
    getData();
  }, [dispatch, location.state]);

  const categories = data?.data?.filter((el: any) => !el.isBlocked) || [];

  const initialValues = {
    courseTitle: course?.courseTitle || "",
    subTitle: course?.subTitle || "",
    level: course?.level || "",
    description: course?.description || "",
    category: course?.category._id || "",
    pricing: course?.pricing || "",
    language: course?.language || "",
    priceAmount: course?.priceAmount || '',
    courseThumbnail: course?.courseThumbnail || "",
    videoTrailer: course?.videoTrailer || "",
  }


  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6">Update Course</h1>
      {course && (
        <Formik
          initialValues={initialValues}
          validationSchema={!isPaid ? instructorCourseSchema : instructorCourseSchema2}
          onSubmit={(values) => {
            console.log('Updated datas', values);
            navigate('/instructor/update-lesson', { state:{ values , course }});
          }}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-2 gap-6 mb-6 ">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Course Thumbnail</label>
                  <DropzoneField setFieldValue={setFieldValue} fieldName="courseThumbnail"  defaultImageUrl={course.courseThumbnail} accept="image/*" previewType="image" />
                  <ErrorMessage name="courseThumbnail" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Video Trailer</label>
                  <DropzoneField setFieldValue={setFieldValue}  defaultImageUrl={course.videoTrailer} fieldName="videoTrailer" accept="video/*" previewType="video" />
                  <ErrorMessage name="videoTrailer" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Course Title</label>
                  <Field type="text" placeholder="Course Title" name="courseTitle" className={`w-full px-2 py-1 dark:bg-[#1D232A] bg-white border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Sub Title</label>
                  <Field type="text" placeholder="Sub Title" name="subTitle" className={`w-full px-2 py-1 dark:bg-[#1D232A] bg-white border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} />
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-500 mb-1">Level</label>
              <Field
                as="select"
                name="level"
                className="border-b border-gray-500 w-full bg-white text-gray-400 py-2 dark:bg-[#1D232A] bg-white dark:text-white outline-none"
              >
                <option value="" label="Select a level" />
                {Level.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="level" component="small" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
              <Field
                as="select"
                name="category"
                className="border-b border-gray-500 w-full py-2 bg-white text-gray-400 py-2 bg-white dark:bg-[#1D232A] dark:text-white outline-none"
              >
                <option value="" label="Select a category" />
                {categories.map((category : any, index : any) => (
                  <option key={index} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                  <Field type="text" placeholder="Description" name="description" className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>
                  <Field type="text" placeholder="Language" name="language" className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 mt-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Price (If Only Paid)</label>
                  <Field type="text" placeholder="Enter Price " name="priceAmount" className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} disabled={!isPaid} />
                </div>

                <div className="mb-6 mt-10 ml-4">
                  <div className="flex ">
                    <button
                      type="button"
                      className={`py-1 px-6 rounded-l-lg  ${!isPaid ? 'bg-blue-700 text-white border-2 border-blue-700' : 'border-2 border-blue-700 text-blue-700'}`}
                      onClick={() => {
                        setPaid(false);
                        setFieldValue('pricing', 'Free');
                      }}
                    >
                      Free
                    </button>
                    <button
                      type="button"
                      className={`py-1 px-6 rounded-r-lg ${isPaid ? 'bg-blue-700 text-white border-2 border-blue-700' : 'border-2 border-blue-700 text-blue-700'}`}
                      onClick={() => {
                        setPaid(true);
                        setFieldValue('pricing', 'Paid');
                      }}
                    >
                      Paid
                    </button>
                  </div>
                  <ErrorMessage name="pricing" component="small" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button type="submit" className="bg-gradient-to-r bg-blue-700 rounded-lg shadow-lg text-[1rem] py-2 px-8 text-white">
                  Update Course
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CourseForm;


