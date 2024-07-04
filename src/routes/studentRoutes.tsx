import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../Pages/student/studentDashbord';
import Dashboard from '../Components/user/Dashboard/Dashboard';
import UserDetails from '@/Components/user/profile/UserDetails';
import EnrolledCourses from '@/Components/user/course/enrolledCourses';
import VideoLayout from '@/Components/user/enrollment/videoLayout';
import InstructorChat from '@/Components/instructor/chat/instructorChat';
import QuizComponent from '@/Components/user/enrollment/exam';



const studentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard/>}>
        <Route index  element={<Dashboard/>} />
        <Route path='/dashboard'  element={<Dashboard/>} />
        <Route  path='/user-profile' element={<UserDetails/>} />
        <Route  path='/enrolled-courses' element={<EnrolledCourses/>} />
        <Route  path='/view-video' element={<VideoLayout/>} />
        <Route  path='/chat' element={<InstructorChat/>} />
        <Route  path='/examination' element={<QuizComponent/>} />


        
      </Route>
    </Routes>
  );
};

export default studentRoutes;
