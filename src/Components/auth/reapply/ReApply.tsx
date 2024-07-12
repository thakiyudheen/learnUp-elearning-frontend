import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { LuUploadCloud } from 'react-icons/lu';
import Reapply from '../../../assets/enrollment/reapply.svg';
import Navbar from '@/Components/common/user/navbar/Navbar';
import { PdfUpload } from '@/utils/cloudinary/uploadPdf';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { updateUserAction } from '@/redux/store/actions/user/updateUserAction';
import { RootState } from '@/redux/store';

const FileUploadField = ({ field, form }:any) => {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
 

  const handleDragOver = (event:any) => {
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

  const handleChange = async (event:any)=> {
    const file = event.currentTarget.files[0];
    if (file) {
      setFileName(file.name);
      setUploading(true);
      try {
        const imageUrl = await PdfUpload(file);
        form.setFieldValue(field.name, imageUrl);
        toast.success('Uploaded Successfully');
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
            <span className="p-3 text-[12px] text-blue-600">
              {fileName ? fileName : 'Drop Your CV (PDF) Here'}
            </span>
          </div>
        )}
      </label>
    </div>
  );
};

const ReApply = () => {
  // const navigate = useNavigate(); 
  const dispatch= useAppDispatch()
  const { data } = useAppSelector((state:RootState)=>state.user)

  const validationSchema = Yup.object().shape({
    cv: Yup.mixed().required('CV is required')
  });

  const initialValues = {
    cv: undefined,
  };

  const onSubmit = async (values : any , { setSubmitting }:any) => {
    console.log(values);
    
    try {
      setSubmitting(true);
      const response = await dispatch(updateUserAction({isReject:false,_id:data?.data?._id,cv:values?.cv}))
      console.log(response.payload.data)
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-evenly md:items-center md:h-[40rem] min-h-screen">
        <div className="md:w-[40%] order-2 md:order-1 flex justify-center md:shadow-lg p-10 rounded-lg">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {() => (
              <Form className="flex flex-col gap-4 w-full max-w-md">
                <Field name="cv" component={FileUploadField} />
                <ErrorMessage name="cv" component="div" className="text-red-500" />
                
                <button
                  type="submit"
                  className="mt-4 bg-blue-700 hover:bg-blue-700 text-white py-1 px-4 rounded-lg"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="md:w-[40%] p-15 md:order-1">
          <img src={Reapply} alt="Reapply" />
        </div>
      </div>
    </>
  );
};

export default ReApply;

