import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTheme } from '../../ui/theme-provider';
import { PdfUpload } from "../../../utils/cloudinary/uploadPdf";


const SecondStep = () => {
  const { theme } = useTheme();

  // Custom file input component to handle file upload and show selected file name
  const CustomFileInput = ({ field, form } : {field : any, form : any}) => {
    const [dragging, setDragging] = useState(false);

    const handleDragOver = (event : any) => {
      event.preventDefault();
      setDragging(true);
    };

    const handleDragLeave = () => {
      setDragging(false);
    };

    const handleDrop = (event : any) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files[0];
     
      form.setFieldValue(field.name, file);
    };

    const handleChange = async (event : any) => {
      const file = event.currentTarget.files[0];
      console.log('this is field name',field.name)
      // form.setFieldValue(field.name, file);

      try {

        console.log('this is file', file)
         const imageUrl = await PdfUpload(file)
         form.setFieldValue(field.name, imageUrl)
         console.log('image upload url', imageUrl)

         if(!imageUrl){
           throw Error('"PDF upload failed"');
         }
      } catch ( error : any ) {
         console.log('cloudinary error')
      }
    };

    return (
      <div>
        <div
          className={`border-dashed border-2 p-2 rounded-md w-[85%] md:w-[100%] ${dragging ? 'border-blue-600' : 'border-gray-400'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={field.name}
            name={field.name}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor={field.name}
            className="cursor-pointer flex flex-col items-center"
          >
            {/* <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.88 7.551a1 1 0 0 0-1.22-.6l-2.21.63a1 1 0 0 0-.68 1.18c.34 1.31.26 2.71-.27 3.96a1 1 0 0 0 1.44 1.22c1.4-.7 2.6-1.76 3.47-3.06a1 1 0 0 0-.55-1.39zm-5.6 1.49a1 1 0 0 0-.99-1.33h-2.5a1 1 0 0 0-.99 1.33l.64 2.36a1 1 0 0 0 .99.75h1.72a1 1 0 0 0 .99-.75l.64-2.36zM4.88 6.551a1 1 0 0 0-1.22-.6l-2.21.63a1 1 0 0 0-.68 1.18c.34 1.31.26 2.71-.27 3.96a1 1 0 0 0 1.44 1.22c1.4-.7 2.6-1.76 3.47-3.06a1 1 0 0 0-.55-1.39zM10 1a9 9 0 0 0-9 9 9 9 0 1 0 9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
            </svg> */}
            <span className="mt-2 text-[12px] text-gray-500">Drop Your File Here</span>
            {/* <span className="mt-1 text-sm text-gray-500 text-[12px]">Or</span> */}
            <span className=" bg-gray-600 text-white text-[12px] py-1 px-4 mt-1 rounded">
              Browse
            </span>
          </label>
        </div>
        {field.value && (
          <div className="mt-2 text-sm text-gray-500">{field.value.name}</div>
        )}
      </div>
    );
  };

  return (
    <>
    <div className="md:grid grid-cols-2 gap-4">
      <div className="mb-4">
        <label htmlFor="address" className={`block ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'} text-gray-700 font-bold mb-2`}>
          Address
        </label>
        <Field
          id="address"
          name="address"
          placeholder="Address"
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        <ErrorMessage name="address" component="div" className="text-red-500 text-[14px]" />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className={`block ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'} text-gray-700 font-bold mb-2`}>
          Date of Birth
        </label>
        <Field
          id="dateOfBirth"
          name="dateOfBirth"
          placeholder="dd-mm-yyyy"
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-[14px]" />
      </div>
     
      <div className="mb-4">
        <label htmlFor="qualification" className={`block ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'} text-gray-700 font-bold mb-2`}>
          Qualification
        </label>
        <Field
          id="qualification"
          name="qualification"
          placeholder="Qualification"
          className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        <ErrorMessage name="qualification" component="div" className="text-red-500 text-[14px]" />
      </div>
      <br />
      
    </div>
    <div className="mb-4 ">
        <label htmlFor="cv" className={`block ${theme === 'light' ? 'text-gray-700' : 'text-gray-500'} text-gray-700 font-bold mb-2`}>
          Upload CV
        </label>
        <Field name="cv" component={CustomFileInput} />
        <ErrorMessage name="cv" component="div" className="text-red-500 text-[14px]" />
      </div>
  </>

  );
};

export default SecondStep;
