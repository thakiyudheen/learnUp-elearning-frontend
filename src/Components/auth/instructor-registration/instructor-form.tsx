import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FirstStep from './Firststep';
import SecondStep from './SecondStep';
import Register1 from '../../../assets/registration/register1.svg';
import { useTheme } from '../../ui/theme-provider';;
import { sendOtpAction } from '../../../redux/store/actions/auth/sendOtpAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooke';
import InstructorSchema, { FormValues } from '../../../validation-schema/Instructor-reg-schema';
import { signupAction } from '../../../redux/store/actions/auth/signupAction';
import { SignupFormData } from '../../../types/ISignupData';



const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
  address: '',
  dateOfBirth: '',
  profession: '',
  qualification: '',
  social: '',
  cv: null, 
};

const FormComponent: React.FC = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [isLoading , setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues) => {
    
    setLoading(true)
    const allData = {...values,...location.state,isVerified:true}
    

    const signupData : SignupFormData  =  {
      firstName: allData.firstName,
      lastName: allData.lastName,
      username:allData.username,
      email: allData.email,
      password: allData.password,
      role:allData.role,
      cv : allData.cv.name,
      profile: {
        dateOfBirth:allData.dateOfBirth,
        gender: allData.gender,
      },
      contact: {
        phone:allData.phone,
        socialMedia: {
          linkedIn: allData.social,
        },
      },
      isVerified: allData.isVerified,
      profession: allData.profession,
      isGauth : allData?.isGauth
    };
    
    
    
    if( signupData.isGauth ){
      
      const response1 : any  = await dispatch(
        signupAction(signupData)
       );
       
      if (!response1.error && response1.payload.success) {
        setLoading(false)
        navigate(signupData.role === 'student' ? '/' : '/');

      }

     

    }else{
      await dispatch(sendOtpAction( signupData.email ))
      setLoading(false)
      navigate('/otp',{state : signupData})

    }
   
  };

  return (
    <div className="md:flex justify-evenly items-center min-h-screen w-full">
      <div className="md:w-1/2">
      <h1 className='text-center text-[26px] md:mr-[8rem] font-bold text-blue-500 md:mt-0 md:p-0 md:mt-[3rem]  mt-[4rem] p-2'> Instructor <span className='text-blue-900'>Registration</span>  </h1>
        <img src={Register1} alt="registration" className="w-[60%] ml-[5rem] mt-[4rem] md:w-[65%] h-auto" />
      </div>
      <div className={`md:w-1/2 max-w-md p-6 md:mt-[2rem] rounded-lg md:shadow-lg md:p-[3rm] md:mt-[6rem] md:mr-[4rem] ${theme=='light'?'bg-white':'bg-gray-800'} `}>
        <Formik
          initialValues={initialValues}
          validationSchema={InstructorSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form>
              {step === 1 ? <FirstStep /> : <SecondStep />}
              {step === 1 && (
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-gray-600 text-white py-2 px-4 rounded-[2rem] shadow-lg hover:bg-blue-700"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="flex justify-between mt-6 ">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-[2rem] shadow-lg hover:bg-blue-700"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`bg-blue-600 text-white py-2 px-4 rounded-[2rem] shadow-lg hover:bg-blue-700 ${
                      isValid ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormComponent;
