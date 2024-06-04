
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';
import Home from './Pages/home/home'
import Enrollment from './Pages/selection/enrollment';
import UserRegister from './Pages/student/registration';
import InstructorRegister from './Pages/instructor/registration';
import Otp from './Pages/auth/otp';
import Dashboard from './Components/admin/dashboard';
import Requests from './Components/admin/instructorRequests';
import UserTable from './Components/admin/userManagement';
import InstructorTable from './Components/admin/instructorManagement';
import AdminNavbar from './Pages/admin/admin-nav';
import ConfirmEmail from './Pages/auth/forgotPassword';
import ResetPassword from './Pages/auth/resetPassword';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooke';
import { RootState } from './redux/store';
import { getUserDataAction } from './redux/store/actions/auth/getUserDataAction';



function App() {
  const dispatch = useAppDispatch()

  const { data } = useAppSelector((state: RootState) => state.user)
  useEffect( () => {

    if(!data){

         dispatch( getUserDataAction() )

    }
    
  } , [ dispatch , data ] )

  console.log('this is the exact user data', data)
  
  return (

    

    <>
    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/enrollment" element={<Enrollment/>} />
      <Route path="/otp" element={<Otp/>} />
      <Route path="/userRegister" element={<UserRegister/>} />
      <Route path="/instructorRegister" element={<InstructorRegister/>} />
      <Route path="/confirmMail" element={<ConfirmEmail/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/admin/*" element={<AdminNavbar/>}>
      
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="students" element={<UserTable/>} />
        <Route path="instructors" element={<InstructorTable/>} />
        <Route path="requests" element={<Requests/>} />
        
      </Route>
      

    </Routes>
    </>
  
  )
}

export default App
