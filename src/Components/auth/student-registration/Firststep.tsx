import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTheme } from '../../ui/theme-provider';

const FirstStep = () => {
    const {theme}=useTheme()
    const [isLoading,setLoading] = useState<boolean>(false)
    

  return (
    <div className="rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">

          <label htmlFor="firstName" className={`block font-bold mb-2 ${theme=='light'? 'text-gray-700':'text-gray-500'}`}>
            First Name
          </label>
          <Field
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className={` border-b-[1px] border-gray-700 w-full py-2 px-3 ${theme=='light'?'bg-white':'bg-gray-800'}  ${theme=='light'? 'text-gray-700':'text-gray-300'} leading-tight focus:outline-none`}
          />
          <ErrorMessage name="firstName" component="div" className="text-red-500 text-[13px]" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className={`block font-bold mb-2 ${theme=='light'? 'text-gray-700':'text-gray-500'}`}>
            Last Name
          </label>
          <Field
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className={` border-b-[1px] border-gray-700 w-full py-2 px-3 ${theme=='light'?'bg-white':'bg-gray-800'}  ${theme=='light'? 'text-gray-700':'text-gray-300'} leading-tight focus:outline-none`}
          />
          <ErrorMessage name="lastName" component="div" className="text-red-500 text-[13px]" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className={`block font-bold mb-2 ${theme=='light'? 'text-gray-700':'text-gray-500'}`}>
            Phone
          </label>
          <Field
            id="phone"
            name="phone"
            placeholder="Phone"
            className={` border-b-[1px] border-gray-700 w-full py-2 px-3 ${theme=='light'?'bg-white':'bg-gray-800'}  ${theme=='light'? 'text-gray-700':'text-gray-300'} leading-tight focus:outline-none`}
          />
          <ErrorMessage name="phone" component="div" className="text-red-500 text-[13px]" />
        </div>
        <div className="mb-4">
          <label htmlFor="social" className={`block font-bold mb-2 ${theme=='light'? 'text-gray-700':'text-gray-500'}`}>
            Social
          </label>
          <Field
            id="social"
            name="social"
            placeholder="Social"
            className={` border-b-[1px] border-gray-700 w-full py-2 px-3 ${theme=='light'?'bg-white':'bg-gray-800'}  ${theme=='light'? 'text-gray-700':'text-gray-300'} leading-tight focus:outline-none`}
          />
          <ErrorMessage name="social" component="div" className="text-red-500 text-[13px]" />
        </div>
        <div className="mb-4">
        <label htmlFor="profession"  className={`block ${theme=='light'?'text-gray-700':'text-gray-500' } text-gray-700 font-bold mb-2`}>
          Profession
        </label>
        <Field
          as="select"
          id="profession"
          name="profession"
          className={`${theme=='light'?'bg-white':'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          >
          <option value="">Select Profession</option>
          <option value="student">Student</option>
          <option value="working">Working</option>
          
        </Field>
        <ErrorMessage name="profession" component="div" className="text-red-500 text-[14px]" />
      </div>
        <div className="mb-4">
          <label htmlFor="gender" className={`block font-bold mb-2 ${theme=='light'? 'text-gray-700':'text-gray-500'}`}>
            Gender
          </label>
          <Field
            as="select"
            id="gender"
            name="gender"
            className={` border-b-[1px] border-gray-700 w-full py-2 px-3 ${theme=='light'?'bg-white':'bg-gray-800'}  ${theme=='light'? 'text-gray-700':'text-gray-300'} leading-tight focus:outline-none`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage name="gender" component="div" className="text-red-500 text-[13px]" />
        </div>
        
      </div>
    </div>
  );
};

export default FirstStep;