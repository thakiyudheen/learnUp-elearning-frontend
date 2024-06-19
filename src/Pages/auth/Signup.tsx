
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import SignupSVG from '../../assets/signup.svg';
import LearnUp from '../../assets/LearnUp.png';
import { useTheme } from '../../Components/ui/theme-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooke';
import { findEmailAction } from '../../redux/store/actions/auth/findEmailAction';
import { findUsernameAction } from '../../redux/store/actions/auth/findUsernameAction';
import LoadingIndicator from '../../Components/common/skelton/loading';
import { SignupSchema } from '../../validation-schema';
import Navbar from '../../Components/common/user/navbar/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { googleAuthAction } from '../../redux/store/actions/auth/googleAuthAction';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEmailExist, setEmailExist] = useState<boolean>(false);
  const [isUsernameExist, setUsernameExist] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const response1 = await dispatch(findEmailAction(values.email));
    if (!response1.payload || !response1.payload.success) {
      setLoading(false);
      return setEmailExist(true);
    } else {
      setEmailExist(false);
    }

    const response2 = await dispatch(findUsernameAction(values.username));
    if (!response2.payload || !response2.payload.success) {
      setLoading(false);
      return setUsernameExist(true);
    } else {
      setUsernameExist(false);
    }

    if (values?.role == 'student') {
      navigator('/userRegister', { state: values });
    } else {
      navigator('/instructorRegister', { state: values });
    }
  };

  const googleAuthHandle = async (credentials: any) => {
    const response = await dispatch(googleAuthAction(credentials));
    if (response.payload.existingUser) {
      navigator('/');
      return;
    }
    console.log('this is role ,',location.state.role)
    const signUpData: any = {
      role: location.state.role,
      email: response.payload.data.email,
      password: response.payload.data.password,
      username: response.payload.username,
      isGauth: true
    };

    navigator(location.state.role === 'student' ? '/userRegister' : '/instructorRegister', { state: signUpData });
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex items-center justify-evenly h-screen font-sans">
        <img className="absolute md:h-[12%] h-[9%] top-0 left-0 md:left-4" src={LearnUp} alt="" />
        <img className="h-[70%]" src={SignupSVG} alt="" />
        {isLoading && <LoadingIndicator />}
        <div className={`max-w-md w-full p-10 rounded-[10px] md:shadow-md absolute m-3 md:relative md:space-y-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <h2 className="text-2xl font-bold text-blue-500 mb-5 text-center">Sign Up</h2>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              role: location?.state?.role,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
              handleSubmit(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <small className="text-[red]">{isEmailExist && "Email already exists!!"} {isUsernameExist && "Username is not available"}</small>
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={`w-full px-2 py-1 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] focus:outline-none border-[grey] text-sm`}
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-[12px]" />
                </div>
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
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-[12px]" />
                </div>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full px-2 py-1 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b-[1px] focus:outline-none border-[grey] text-sm`}
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-[12px]" />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                  </button>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-[grey]">If you have an account, </span>
                    <a onClick={() => navigator('/login', { state: location.state })} className="text-blue-500 text-sm font-bold">sign in</a>
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
        </div>
      </div>
    </>
  );
};

export default Signup;

