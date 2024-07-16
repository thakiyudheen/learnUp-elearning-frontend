import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import GoogleLogo from '../../assets/google/google.svg';
import LoginSVG from '../../assets/login/login.svg';
import LearnUp from '../../assets/LearnUp.png';
import { useTheme } from "../../Components/ui/theme-provider";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooke';
import { loginUserAction } from '../../redux/store/actions/auth/loginUserAction';
import LoadingIndicator from '../../Components/common/skelton/loading';
import { LoginSchema } from '../../validation-schema';
import Navbar from '../../Components/common/user/navbar/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { googleAuthAction } from '../../redux/store/actions/auth/googleAuthAction';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUserDataAction } from '../../redux/store/actions/auth/getUserDataAction';
import { motion } from 'framer-motion';
import Footer from '@/Components/common/user/footer/footer';
import {toast} from 'sonner'

interface data {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: data) => {
    setLoading(true);

    const response = await dispatch(loginUserAction(values));
    console.log('this is first', response.payload);
    if (!response?.payload || !response?.payload.success) {
      console.log('this is the actual error',response)
      if(response?.payload){
        setError(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);

      }else{
        toast.error('Network Error!')
        setLoading(false);
      }
    } else {
      setError(false);
      setLoading(false);
      navigator('/');
    }
  };

  const googleAuthHandle = async (credentials: any) => {
    const response = await dispatch(googleAuthAction(credentials));

    if (response.payload.existingUser) {
      await dispatch(getUserDataAction())
      navigator('/');
      return;
    } else {
      navigator('/enrollment');
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col md:flex-row items-center justify-evenly font-Poppins md:dark:bg-gray-800 h-screen font-Poppins">
        <img className='absolute md:h-[12%] h-[9%] top-0 left-0 md:left-4' src={LearnUp} alt="" />
        <motion.img 
          className='md:h-[70%] h-[30%] md:mb-0 mb-8' 
          src={LoginSVG} 
          alt="" 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className={`max-w-md w-full p-10 relative bottom-[10vh] md:bottom-0 rounded-[10px] md:shadow-md m-3 md:space-y-4 `}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-5 text-center">Login</h2>
          {isLoading && <LoadingIndicator />}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
              handleSubmit(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {isError && <small className='text-[red] text-center'>Incorrect Email or Password</small>}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`w-full px-2 py-1 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] focus:outline-none border-[grey] text-sm`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-[12px]" />
                </div>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={`w-full px-2 py-1 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] focus:outline-none border-[grey] text-sm`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-[12px]" />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {isSubmitting || isLoading ? 'Loading...': 'Login'}
                  </button>
                  <div className="flex items-center justify-between mt-2">
                    <p className='text-[12px] text-[gray]'>I don't have any account <a onClick={() => navigator('/signup', { state: location.state })} className="text-blue-500 text-sm font-bold cursor-pointer">Sign up</a></p>
                    <a onClick={()=>navigator('/confirmMail')} className="text-blue-500 text-sm text-[12px] font-bold cursor-pointer">Forgot Password?</a>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div>
                    <GoogleLogin
                      onSuccess={googleAuthHandle}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;

