import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import InputField from '../../common/form-input/inputField';

// Validation schema
const validationSchema = Yup.object({
  courseTitle: Yup.string().required('Course Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  pricing: Yup.string().required(),
  priceAmount: Yup.number().when('pricing', {
    is: (val: string) => val === 'Paid', // Use a function to check the value of 'pricing'
    then: Yup.number().required('Price Amount is required').min(1, 'Price must be at least $1'),
  }),
  courseThumbnail: Yup.mixed().required('Course Thumbnail is required'),
  videoTrailer: Yup.mixed().required('Video Trailer is required'),
});

// Initial form values
const initialValues = {
  courseTitle: '',
  description: '',
  category: '',
  pricing: '',
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
  
    const onDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Set the type of the file
        file.type = previewType; // Assuming previewType contains the desired type
        setFieldValue(fieldName, file);
        setPreview(URL.createObjectURL(file));
      }
    };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="border-2 border-gray-200 border-dashed rounded-md h-48 flex items-center justify-center">
      <input {...getInputProps()} />
      {preview ? (
        previewType === 'image' ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <iframe src={preview} title="Video Preview" className="h-full w-full object-cover" frameBorder="0" />
        )
      ) : (
        <span className="text-gray-400">Drag & drop or click to upload</span>
      )}
    </div>
  );
};

const CourseForm: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Course</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Course Thumbnail and Video Trailer Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <InputField type="text" placeholder="Course Title" name="courseTitle" background='bg-[#1D232A]' />
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <InputField type="text" placeholder="Description" name="description" background='bg-[#1D232A]' />
            </div>

            {/* Category Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <InputField type="text" placeholder="Category" name="category" background='bg-[#1D232A]'/>
            </div>

            {/* Pricing Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
