import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FirstStep from './Firststep';
import SecondStep from './SecondStep';
import Register from '../../../assets/registration/register.svg';
import { useTheme } from '../../ui/theme-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../common/skelton/loading';
import { sendOtpAction } from '../../../redux/store/actions/auth/sendOtpAction';
import { useAppDispatch } from '../../../hooks/hooke';
import { FormValues, studentSchema } from '../../../validation-schema/student-reg-schema';
import { signupAction } from '../../../redux/store/actions/auth/signupAction';


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
};

const FormComponent: React.FC = () => {
    const {theme}=useTheme()
    const [step, setStep] = useState(1);
    const location = useLocation()
    const [isLoading, setLoading] = useState<boolean>( false )
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
 

  const handleSubmit = async  (values: FormValues) => {
    setLoading(true)
    const allData = {...values,...location.state,isVerified:true}
    console.log('this is all data', allData);

    const signupData =  {
      firstName: allData.firstName,
      lastName: allData.lastName,
      username:allData.username,
      email: allData.email,
      password: allData.password,
      role:allData.role,
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
      isVerified: true,
      profession: allData.profession,
      isGauth: allData.isGauth
    };
    

    
    if( signupData.isGauth ){
      
      const response1 : any  = await dispatch(
        signupAction(signupData)
       );
       console.log('hii iam res for google auth',response1.payload)
       
      if (!response1.error && response1.payload.success) {
        setLoading(false)
        navigate(signupData.role === 'student' ? '/' : '/');

      }

    } else {

      await dispatch(sendOtpAction( signupData.email ))
      setLoading(false)
      navigate('/otp',{state : signupData})

    }
    
  };

  return (
    <div className="md:flex justify-evenly items-center min-h-screen w-full">
      <div className="md:w-1/2">
        <h1 className='text-center text-[26px] md:relative top-[4rem] md:mr-[8rem] font-bold text-blue-500 md:mt-0 md:p-0 mt-[4rem] p-2'>Student <span className='text-blue-900'>Registration</span>  </h1>
        <img src={Register} alt="registration" className="w-[50%] ml-[6rem] mt-[4rem] md:w-[80] h-auto" />
      </div>
      {isLoading && <LoadingIndicator/>}
      <div className={`md:w-1/2 max-w-md p-6 md:mt-[2rem] rounded-lg md:shadow-lg  md:mr-[4rem] ${theme=='light'?'bg-white':'bg-gray-800'} `}>
        <Formik
          initialValues={initialValues}
          validationSchema={studentSchema}
          onSubmit={handleSubmit}
        >
          {({  }) => (
            <Form>
              {step === 1 ? < FirstStep /> : < SecondStep />}
              {step === 1 && (
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-gray-600 text-white py-2 px-4 rounded-[2rem] shadow-lg hover:bg-blue-700"
                    onClick={() => {  setLoading(true),setStep(2),setLoading(false)}}
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
                    onClick={() =>{  setLoading(true),setStep(1),setLoading(false)}}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`bg-blue-600 text-white py-2 px-4 rounded-[2rem] shadow-lg hover:bg-blue-700 `}
                    
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


