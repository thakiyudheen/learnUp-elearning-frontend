// src/components/auth/resetPassword.tsx

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../common/form-input/inputField';
import confirmImg from '../../../assets/forgot-password/confirmEmail.svg';
import { useTheme } from '../../ui/theme-provider';

const ResetPassword: React.FC = () => {
  const { theme } = useTheme();

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly md:items-center md:h-[40rem] min-h-screen">
      {/* Form Section */}
      <div className={`md:w-[40%] order-2 md:order-1 flex ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} justify-center md:shadow-lg p-10 rounded-lg`}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="flex flex-col gap-4 w-full max-w-md">
           
            <p>New Password</p>
            <InputField type="password" placeholder="New Password" name="newPassword" />
            <p>Confirm Password</p>
            <InputField type="password" placeholder="Confirm Password" name="confirmPassword" />
            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      {/* Image Section */}
      <div className="md:w-[40%] p-15 md:order-2 md:order-1">
        <img
          src={confirmImg}
          alt="Confirm Email"
          className="h-auto w-[30rem]"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
