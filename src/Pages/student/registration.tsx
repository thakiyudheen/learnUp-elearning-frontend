import React, { FC } from 'react';
import Navbar from '../../Components/common/user/navbar/Navbar';
import FormComponent from '../../Components/auth/student-registration/student-form';


  


const StudentRegister: FC = () => {
  return (
    <>
    <Navbar/>
    <FormComponent/>
    
    </>
  );
};

export default StudentRegister;