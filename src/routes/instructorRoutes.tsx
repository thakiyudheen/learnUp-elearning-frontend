import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/instructor/Dashboard/Dashboard';
import InstructorDashboard from '../Pages/instructor/instructorDashbord';
import CourseForm from '@/Components/instructor/course/addCourseForm';
import AddLessonForm from '@/Components/instructor/course/addLessonForm';
import AddAttachmentForm from '@/Components/instructor/course/addAttachments';

const instructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorDashboard/>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<CourseForm/>} />
        <Route path="Add-lesson" element={<AddLessonForm/>} />
        <Route path="Add-attachment" element={<AddAttachmentForm/>} />
          
        
      </Route>
    </Routes>
  );
};

export default instructorRoutes;
