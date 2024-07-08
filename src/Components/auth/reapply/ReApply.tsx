import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { LuUploadCloud } from 'react-icons/lu';

const FileUploadField = ({ field, form } :any) => {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event :any) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event:any) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleChange({ target: { files: [file] } });
  };

  const handleChange = async (event:any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setUploading(true);
      try {
        // Simulate upload process
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds upload time
        form.setFieldValue(field.name, file);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div
      className={`border-dashed border-2 p-2 rounded-md w-full ${
        dragging ? 'border-blue-600' : 'border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id={field.name}
        name={field.name}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor={field.name} className="cursor-pointer flex flex-col items-center">
        {uploading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            <span className="text-[12px] text-blue-700">Uploading...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <LuUploadCloud className="text-blue-600 text-[20px]" />
            <span className="p-3 text-[12px] text-blue-600">Drop Your CV (PDF) Here</span>
          </div>
        )}
      </label>
    </div>
  );
};

const ReApply: React.FC = () => {
  const navigate = useNavigate(); 

  const validationSchema = Yup.object().shape({
    cv: Yup.mixed().required('CV is required').test('fileType', 'Only PDF files are allowed', (value:any) =>
      value ? ['application/pdf'].includes(value?.type) : true
    ),
  });

  const initialValues = {
    cv: undefined,
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values);
    
    try {
      // Set loading state
      setSubmitting(true);

      // Dispatch action to find email
      // You can add findEmailAction logic if required

      // Dispatch action to forget password
      // You can add forgetPasswordAction logic if required

      // Notify user
      toast.success('Reset Password Mail Sent!');

      // Redirect to login page after delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      // Reset loading state
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly md:items-center md:h-[40rem] min-h-screen">
        <div className="md:w-[40%] order-2 md:order-1 flex bg-white justify-center md:shadow-lg p-10 rounded-lg">
          <ToastContainer />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4 w-full max-w-md">
                <Field name="cv" component={FileUploadField} />
                <ErrorMessage name="cv" component="div" className="text-red-500" />
                
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="md:w-[40%] p-15  md:order-1">
          {/* Placeholder image or remove this section if not needed */}
        </div>
      </div>
    </>
  );
};

export default ReApply;
