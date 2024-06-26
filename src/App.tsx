
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';
import Home from './Pages/home/home'
import Enrollment from './Pages/selection/enrollment';
import UserRegister from './Pages/student/registration';
import InstructorRegister from './Pages/instructor/registration';
import Otp from './Pages/auth/otp';
import ConfirmEmail from './Pages/auth/forgotPassword';
import ResetPassword from './Pages/auth/resetPassword';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooke';
import { RootState } from './redux/store';
import { getUserDataAction } from './redux/store/actions/auth/getUserDataAction';
import  Protected  from './routes/ProtectedRoute';
import { RoleBasedRedirect } from './routes/roleBaseRoute';
import AdminRoutes from './routes/adminRouter';
import PublicRoute from './routes/PublicRoutes';
import InstructorRoutes from './routes/instructorRoutes';
import HomeRoutes from './routes/HomeRoutes';
import StudentRoutes from './routes/studentRoutes';
import ProcessingPage from './Components/common/errPages/processPage';
import RejectPage from './Components/common/errPages/rejectPages';
import Addcat from './Components/admin/category/addCategoryModal';
import NotFontError from './Components/common/errPages/notFontError';
import { getAllCourseAction } from './redux/store/actions/course/getAllCourseAction';
import PromoSection from './Components/user/course/courseListing';
import CoursePage from './Pages/student/coursePage';
import UserProfile from './Components/user/profile/userProfile';
import UserDetails from './Components/user/profile/UserDetails';
import Profile from './Pages/student/profile';
import PaymentSuccess from './Pages/payment/paymentSuccess';
import { toast } from 'react-toastify';





function App() {
  const dispatch = useAppDispatch()

  const { data , error} = useAppSelector((state: RootState) => state.user)

  const renderInstructorRoutes = () => {
    if (data?.data.isReject) {
      return <RejectPage/>;
    } else if (!data?.data.isReject && !data?.data.isVerified) {
      return <ProcessingPage />;
    } else {
      return <InstructorRoutes />;
    }
  };

  useEffect( () => {

    if(!data){
    
         dispatch( getUserDataAction() )

    }
    
  } , [ dispatch , data ] )


  return (

    

    <>
  
    <Routes>
    
    <Route
					path="/"
					element={
						<RoleBasedRedirect
							roles={{
								admin: "/admin",
								student: "/home",
								instructor: "/instructor",
							}}
						/>
					}
				/>
        <Route
					path="/admin/*"
          element={
					<Protected
							allowedRoles={["admin"]}
							element={<AdminRoutes/>}
						/>}
          
        />
        <Route
					path="/student/*"
          element={
					<Protected
							allowedRoles={["student"]}
							element={<StudentRoutes/>}
						/>}
          
        />
        <Route
					path="/instructor/*"
          element={
					<Protected
							allowedRoles={["instructor"]}
							element={renderInstructorRoutes()}
              
						/>}
          
        />
         <Route
					path="/course-listing"
          element={
					<Protected
							allowedRoles={["student"]}
							element={<PromoSection/>}
						/>}
          
        />

        {/* pubic routes  */}
        <Route path="/login" element={<PublicRoute element={<Login/>}/> } />
        <Route path="/home" element={<HomeRoutes element={<Home/>}/>} />
        <Route path="/signup" element={<PublicRoute element={<Signup/>}/> } />
        <Route path="/instructorRegister" element={<PublicRoute element={<InstructorRegister/>}/> } />
        <Route path="/userRegister" element={<PublicRoute element={<UserRegister/>}/> } />
        <Route path="/processing" element={<ProcessingPage/>} />
        <Route path="/otp" element={<PublicRoute element={<Otp/>}/> } />
        <Route path="/enrollment" element={<PublicRoute element={<Enrollment/>}/> } />
        <Route path="/resetPassword" element={<PublicRoute element={<ResetPassword/>}/> } />
        <Route path="/confirmMail" element={<PublicRoute element={<ConfirmEmail/>}/> } />
        {/* <Route path="/course-listing" element={<PromoSection/> } /> */}


        <Route path="/course" element={<CoursePage/> } />
  
        

        {/* <Route path="/admin/*" element={<AdminRoutes/>} /> */}
        {/* <Route path="/instructor/*" element={<InstructorRoutes />} /> */}
        {/* <InstructorRoutes /> */}
        <Route path="*" element={<NotFontError/>} />
        <Route path="/user-profile" element={<Profile/>} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />

        
         
         
      
      

    </Routes>
    </>
  
  )
}

export default App
