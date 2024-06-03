import React, { FC } from 'react';
import Navbar from '../../Components/common/user/navbar/Navbar';
import FormComponent from '../../Components/auth/instructor-registration/instructor-form';


  


const instructorRegister: FC = () => {
  return (
    <>
    <Navbar/>
    <FormComponent/>
    
    </>
  );
};

export default instructorRegister;