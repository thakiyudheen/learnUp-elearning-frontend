import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTheme } from '../../ui/theme-provider';
import { PdfUpload } from "../../../utils/cloudinary/uploadPdf";
import { FaSpinner } from 'react-icons/fa';
import { LuUploadCloud } from "react-icons/lu";
import { toast} from 'sonner'

const SecondStep = () => {
  const { theme } = useTheme();
  const [uploading, setUploading] = useState(false);

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

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
  
      if (!file) return;
  
      setUploading(true);
  
      try {
        const imageUrl = await PdfUpload(file); 
        form.setFieldValue(field.name, imageUrl); 
        console.log('PDF upload url', imageUrl);
        
        if (!imageUrl) {
          throw new Error('PDF upload failed');
          toast.error('Error while uploading doc!')
        }else{
          toast.success('Uploaded Successfully ')
        }
        
      } catch (error) {
        console.error('Cloudinary error:', error);
      
      } finally {
        setUploading(false);
      }
    };


  return (
    <div>
      <div
        className={`border-dashed border-2 p-2 rounded-md w-[85%] md:w-[100%] ${
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
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor={field.name} className="cursor-pointer flex flex-col items-center">
          {uploading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              <span className=" text-[12px] text-blue-700">Uploading...</span>
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <LuUploadCloud className='text-blue-600 text-[20px]'/>
              <span className="p-3 text-[12px] text-blue-600">Drop Your File Here</span>
              {/* <span className="bg-gray-600 text-white text-[12px] py-1 px-4 mt-1 rounded cursor-pointer">
                Browse
              </span> */}
            </div>
          )}
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
