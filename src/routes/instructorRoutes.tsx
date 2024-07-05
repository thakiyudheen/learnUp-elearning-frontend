import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/instructor/Dashboard/Dashboard';
import InstructorDashboard from '../Pages/instructor/instructorDashbord';
import CourseForm from '@/Components/instructor/course/addCourseForm';
import AddLessonForm from '@/Components/instructor/course/addLessonForm';
import AddAttachmentForm from '@/Components/instructor/course/addAttachments';
import CourseListing from '@/Components/instructor/course/courseListing';
import UpdateCourse from '@/Components/instructor/course/updateCourse';
import UpdateLesson from '@/Components/instructor/course/updateLesson';
import UpdateAttachment from '@/Components/instructor/course/updateAttachment';
import InstructorChat from '@/Components/instructor/chat/instructorChat';
import Assessment from '@/Components/instructor/assessment/assessment';
import AddAssessment from '@/Components/instructor/assessment/AddAssessment';
import MyStudents from '@/Components/instructor/students/myStudent';

const instructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorDashboard/>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<CourseListing/>} />
        <Route path="add-courses" element={<CourseForm/>} />
        <Route path="Add-lesson" element={<AddLessonForm/>} />
        <Route path="Add-attachment" element={<AddAttachmentForm/>} />
        <Route path="update-course" element={<UpdateCourse/>} />
        <Route path="update-lesson" element={<UpdateLesson/>} />
        <Route path="update-attachment" element={<UpdateAttachment/>} />
        <Route path="chat" element={<InstructorChat/>} />
        <Route path="assessment" element={<Assessment/>} />
        <Route path="add-assessment" element={<AddAssessment/>} />
        <Route path="my-students" element={<MyStudents/>} />
          
        
      </Route>
    </Routes>
  );
};

export default instructorRoutes;
