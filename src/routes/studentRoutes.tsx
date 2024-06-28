import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../Pages/student/studentDashbord';
import Dashboard from '../Components/user/Dashboard/Dashboard';
import UserDetails from '@/Components/user/profile/UserDetails';
import EnrolledCourses from '@/Components/user/course/enrolledCourses';
import VideoLayout from '@/Components/user/enrollment/videoLayout';
import InstructorChat from '@/Components/instructor/chat/instructorChat';



const studentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard/>}>
        <Route index  element={<Dashboard/>} />
        <Route index path='/user-profile' element={<UserDetails/>} />
        <Route index path='/enrolled-courses' element={<EnrolledCourses/>} />
        <Route index path='/view-video' element={<VideoLayout/>} />
        <Route index path='/chat' element={<InstructorChat/>} />


        
      </Route>
    </Routes>
  );
};

export default studentRoutes;
