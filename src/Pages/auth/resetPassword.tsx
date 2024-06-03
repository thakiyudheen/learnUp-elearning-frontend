import Navbar from '../../Components/common/user/navbar/Navbar';
import ResetPassword from '../../Components/auth/forgot-password/resetPassword';
import React from 'react';



const resetPassword: React.FC = () => {
  return (
    <>
    <Navbar/>
    <ResetPassword/>
    
    </> 
  );
};

export default resetPassword;
