import React, { useState, useEffect, ChangeEvent } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import Otp from '../../../assets/otp/otp-security.svg';
import { useTheme } from '../../ui/theme-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooke';
import { sendOtpAction } from '../../../redux/store/actions/auth/sendOtpAction';
import LoadingIndicator from '../../../Components/common/skelton/loading';
import { verifyOtpAction } from '../../../redux/store/actions/auth/verifyOtpAction';
import { signupAction } from '../../../redux/store/actions/auth/signupAction';
import { SignupFormData } from '../../../types/ISignupData';

interface OtpFormValues {
  otp: string[];
}


const OtpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const [resendAvailable, setResendAvailable] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          setResendAvailable(true);
          return 0;
        }
      });
    }, 1000);


    return () => clearInterval(countdown); // Cleanup interval on unmount
  }, [resendAvailable]); // Add resendAvailable as a dependency

  const handleSubmit = async (values: { otp: string[] }, actions: FormikHelpers<{ otp: string[] }>) => {
    actions.setSubmitting(false);

    const response = await dispatch(verifyOtpAction({ email: location.state.email, otp: values.otp.join('') }));

    if (!response.payload || !response.payload.success) {
      setError(true);
    } else {
      const signupData: SignupFormData = location.state;
      const response1: any = await dispatch(signupAction(signupData));

      if (!response1.error && response1.payload.success) {
        navigate(signupData.role === 'student' ? '/' : '/');
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const { value } = e.target;
    const regex = /^\d$/;

    if (regex.test(value)) {
      setFieldValue(`otp[${index}]`, value);
      if (index < 3 && value !== '') {
        const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement | null;
        nextInput?.focus();
      }
    } else if (value === '') {
      setFieldValue(`otp[${index}]`, value);
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement | null;
        prevInput?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    await dispatch(sendOtpAction(location.state.email));
    setLoading(false);
    setResendAvailable(false); // Reset resendAvailable to false
    setTimer(5); // Reset timer to 5 seconds
  };

  return (
    <div className={`flex justify-center items-center min-h-screen p-5 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <div className="hidden md:block md:w-1/3">
        <img src={Otp} alt="Description" className="w-[85%] h-auto" />
      </div>
      {isLoading && <LoadingIndicator />}
      <div className="w-full md:w-1/3 p-5 md:p-10 md:ml-[2rem] rounded-lg">
        <h1 className={`text-[20px] font-bold text-center mb-[1rem] ${theme === 'light' ? 'text-blue-900' : 'text-blue-600'}`}>
          Verification <span className="text-blue-500">Code</span>
        </h1>
        <h1 className="text-[14px] mb-[1rem] text-center">{location.state.email}</h1>
        <Formik
          initialValues={{ otp: ['', '', '', ''] }}
          validationSchema={Yup.object({
            otp: Yup.array()
              .of(Yup.string().matches(/^[0-9]$/, 'Must be a digit').required('Required'))
              .length(4, 'Must be exactly 4 digits'),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched , isSubmitting, setFieldValue, values }:
          { errors : any, touched : any, isSubmitting : any , setFieldValue : any , values : any }) => (
            <Form>
              {isError && <small className="text-[red] md:ml-[9rem] ml-[7rem]">Incorrect OTP</small>}
              <div className="flex justify-center mb-6 md:mr-2">
                {['', '', '', ''].map((_, index ) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    name={`otp[${index}]`}
                    maxLength={1}
                    className={`w-16 h-12 text-center text-black rounded-lg border-2 ${
                      theme === 'light' ? 'bg-white' : 'bg-gray-600'
                    } ${touched.otp?.[index ] && errors.otp?.[index] ? 'border-red-500' : 'border-gray-800'} ${
                      index !== 3 ? 'mr-2' : ''
                    }`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index, setFieldValue)}
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !values.otp.every((val : any) => val !== '')}
                className={`w-full md:w-[18rem] py-1 mt-4 md:ml-[2rem] rounded-md ${
                  theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                } ${isSubmitting || !values.otp.every((val : any) => val !== '') ? 'bg-gray-400' : ''}`}
              >
                Submit
              </button>
              <div className="flex justify-center mt-4">
                {resendAvailable ? (
                  <button type="button" onClick={handleResendOtp} className="text-blue-600">
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-600">Resend OTP in {timer} seconds</span>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OtpForm;