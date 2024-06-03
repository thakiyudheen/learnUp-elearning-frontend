import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import InputField from '../../common/form-input/inputField'; // Assuming the InputField component is in a separate file
import confirmImg from '../../../assets/forgot-password/confirmEmail.svg'
import { useTheme } from '../../ui/theme-provider';

const YourComponent: React.FC = () => {
    const { theme } = useTheme();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  
  const initialValues = {
    email: '',
  };


  const onSubmit = (values: any) => {
    console.log(values); 
  };

  return (
    <>
    
    <div className="flex flex-col md:flex-row justify-evenly md:items-center md:h-[40rem] min-h-screen">
      {/* Form Section */}
      
      <div className={`md:w-[40%] order-2 md:order-1  flex ${theme == 'light' ? 'bg-white':'bg-gray-800'} justify-center md:shadow-lg p-10 rounded-lg`}>
        
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className='flex flex-col gap-4 w-full  max-w-md'>
          <p className=''> Email Address</p>
            <InputField type="email" placeholder="Email Address" name="email" />
            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      {/* Image Section */}
      <div className="md:w-[40%] p-15 md:order-2 md:order-1">
        <img
          src={confirmImg} // Replace with your image path
          alt="Your Image"
          className="h-auto w-[30rem] "
        />
      </div>
    </div>
    </>
  );
};

export default YourComponent;
