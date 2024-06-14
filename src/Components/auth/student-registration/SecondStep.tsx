import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTheme } from '../../ui/theme-provider';

const SecondStep = () => {
    const {theme}=useTheme()
  return (
    <div className="md:grid grid-cols-2 gap-4">
      <div className="mb-4">
    <label htmlFor="address" className={`block ${theme=='light'?'text-gray-700':'text-gray-500' } text-gray-700 font-bold mb-2`}>
          Address
        </label>
        <Field
          id="address"
          name="address"
          placeholder="Address"
          className={`${theme=='light'?'bg-white':'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        <ErrorMessage name="address" component="div" className="text-red-500 text-[14px]" />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth"  className={`block ${theme=='light'?'text-gray-700':'text-gray-500' } text-gray-700 font-bold mb-2`}>
          Date of Birth
        </label>
        <Field
          id="dateOfBirth"
          name="dateOfBirth"
          placeholder="dd-mm-yyyy"
          className={`${theme=='light'?'bg-white':'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
        <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-[14px]" />
      </div>
      
      <div className="mb-4">
        <label htmlFor="qualification"  className={`block ${theme=='light'?'text-gray-700':'text-gray-500' } text-gray-700 font-bold mb-2`}>
          Qualification
        </label>
        <Field
          id="qualification"
          name="qualification"
          placeholder="Qualification"
          className={`${theme=='light'?'bg-white':'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        <ErrorMessage name="qualification" component="div" className="text-red-500 text-[14px]" />
      </div>
    </div>
  );
};

export default SecondStep;
