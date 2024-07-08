import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import InputField from '../../common/form-input/inputField'; // Assuming the InputField component is in a separate file
import confirmImg from '../../../assets/forgot-password/confirmEmail.svg'
import { useTheme } from '../../ui/theme-provider';
import { useAppDispatch } from '../../../hooks/hooke';
import { findEmailAction } from '../../../redux/store/actions/auth/findEmailAction';
import { forgetPasswordAction } from '../../../redux/store/actions/auth/forgetPasswordAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const YourComponent: React.FC = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch()
    const [ isError ,setError ] = useState<boolean>(false)
    const [ isLoading ,setLoading ] = useState<boolean>(false)
    const navigate = useNavigate()
  
    console.log(ErrorMessage,isLoading,Field);
    
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  
  const initialValues = {
    email: '',
  };


  const onSubmit = async  (values: any) => {

    setLoading(true)

    const response = await dispatch(findEmailAction( values.email )) 
    
    console.log('here hea',response.payload)
    if(response.payload && response.payload.success) { 
      
      return setError(true)

    }else{

      setError(false)
      await dispatch(forgetPasswordAction( values.email ))
      toast('Reset Password Mail Send ! ')
      setTimeout(() => {
        navigate('/login')
      }, 1500);
        
      
    }
    



  };

  return (
    <>
    
    <div className="flex flex-col md:flex-row justify-evenly md:items-center md:h-[40rem] min-h-screen">
      
    
      <div className={`md:w-[40%] order-2 md:order-1  flex ${theme == 'light' ? 'bg-white':'bg-gray-800'} justify-center md:shadow-lg p-10 rounded-lg`}>
      <ToastContainer />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          
          <Form className='flex flex-col gap-4 w-full  max-w-md'>
          <p className=''> Email Address</p>
          {isError && <small className='text-[red]'>Email is not exist !!</small>}
            <InputField type="email" placeholder="Email Address" name="email" />
            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      
      <div className="md:w-[40%] p-15 md:order-2">
        <img
          src={confirmImg} 
          alt="Your Image"
          className="h-auto w-[30rem] "
        />
      </div>
    </div>
    </>
  );
};

export default YourComponent;
